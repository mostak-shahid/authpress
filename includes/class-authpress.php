<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       http://wp-test.test/
 * @since      1.0.0
 *
 * @package    Authpress
 * @subpackage Authpress/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Authpress
 * @subpackage Authpress/includes
 * @author     Programmelab <mostak.shahid@gmail.com>
 */
class Authpress
{

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Authpress_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct()
	{

		if (defined('AUTHPRESS_VERSION')) {
			$this->version = AUTHPRESS_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'authpress';

		$this->load_dependencies();
		$this->define_admin_hooks();
		$this->define_public_hooks();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Authpress_Loader. Orchestrates the hooks of the plugin.
	 * - Authpress_i18n. Defines internationalization functionality.
	 * - Authpress_Admin. Defines all hooks for the admin area.
	 * - Authpress_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies()
	{

		require_once(ABSPATH . 'wp-admin/includes/plugin.php');

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-authpress-loader.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'admin/class-authpress-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'public/class-authpress-public.php';
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-authpress-customizer-redesign.php';
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-authpress-hide-login.php';
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-authpress-import-export.php';
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-authpress-more.php';

		$this->loader = new Authpress_Loader();
	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks()
	{
		$plugin_admin = new Authpress_Admin($this->get_plugin_name(), $this->get_version());
		$this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_styles');
		$this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts');

		$this->loader->add_action('admin_menu', $plugin_admin, 'authpress_admin_menu');

		// Add Settings link to the plugin
		$plugin_basename = plugin_basename(plugin_dir_path(__DIR__) . $this->plugin_name . '.php');
		$this->loader->add_filter('plugin_action_links_' . $plugin_basename, $plugin_admin, 'authpress_add_action_links');

		$this->loader->add_filter('admin_body_class', $plugin_admin, 'authpress_admin_body_class');

		$this->loader->add_action('admin_init', $plugin_admin, 'authpress_do_activation_redirect');

		$this->loader->add_action('current_screen', $plugin_admin, 'authpress_hide_admin_notices');

		//add_action('admin_head', 'authpress_option_form_submit');
		$this->loader->add_action('admin_head', $plugin_admin, 'authpress_option_form_submit');

		// Reset settings by ajax
		$this->loader->add_action('wp_ajax_authpress_reset_settings', $plugin_admin, 'authpress_reset_settings');
		$this->loader->add_action('wp_ajax_authpress_reset_all_settings', $plugin_admin, 'authpress_reset_all_settings');



		$this->loader->add_action('wp_ajax_authpress_ajax_install_plugins', $plugin_admin, 'authpress_ajax_install_plugins');
		$this->loader->add_action('wp_ajax_nopriv_authpress_ajax_install_plugins', $plugin_admin, 'authpress_ajax_install_plugins');

		$this->loader->add_action('wp_ajax_authpress_ajax_plugins_status', $plugin_admin, 'authpress_ajax_plugins_status');
		$this->loader->add_action('wp_ajax_nopriv_authpress_ajax_plugins_status', $plugin_admin, 'authpress_ajax_plugins_status');

		// add_action( 'upgrader_process_complete', 'authpress_update_completed', 10, 2 );
		$this->loader->add_action('upgrader_process_complete', $plugin_admin, 'authpress_update_completed', 10, 2);

		$this->loader->add_action('rest_api_init', $plugin_admin, 'authpress_rest_api_init');
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks()
	{

		$plugin_public = new Authpress_Public($this->get_plugin_name(), $this->get_version());
		$this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_styles');
		$this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_scripts');
		// Save settings by ajax
		$this->loader->add_action('wp_ajax_authpress_ajax_callback', $plugin_public, 'authpress_ajax_callback');
		$this->loader->add_action('wp_ajax_nopriv_authpress_ajax_callback', $plugin_public, 'authpress_ajax_callback');
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run()
	{
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name()
	{
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Authpress_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader()
	{
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version()
	{
		return $this->version;
	}
}
