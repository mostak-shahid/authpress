<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://www.mdmostakshahid.com/
 * @since             1.0.0
 * @package           Authpress
 *
 * @wordpress-plugin
 * Plugin Name:       AuthPress
 * Plugin URI:        https://www.mdmostakshahid.com/authpress/
 * Description:       Authpress boilerplate for WordPress
 * Version:           1.0.0
 * Author:            Md. Mostak Shahid
 * Author URI:        https://www.mdmostakshahid.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       authpress
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('AUTHPRESS_VERSION', '1.0.0');
define('AUTHPRESS_NAME', 'AuthPress');

define('AUTHPRESS_PATH', plugin_dir_path(__FILE__));
define('AUTHPRESS_URL', plugin_dir_url(__FILE__));



/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-authpress-activator.php
 */
function authpress_activate()
{
	require_once AUTHPRESS_PATH . 'includes/class-authpress-activator.php';
	Authpress_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-authpress-deactivator.php
 */
function authpress_deactivate()
{
	require_once AUTHPRESS_PATH . 'includes/class-authpress-deactivator.php';
	Authpress_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'authpress_activate');
register_deactivation_hook(__FILE__, 'authpress_deactivate');

if (file_exists(AUTHPRESS_PATH . '/vendor/autoload.php')) {
	require_once AUTHPRESS_PATH . '/vendor/autoload.php';
}
/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require AUTHPRESS_PATH . 'includes/class-authpress.php';
require AUTHPRESS_PATH . 'API/Rest_API.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function authpress_run()
{

	$plugin = new Authpress();
	$plugin->run();
}
authpress_run();

function authpress_get_tabs()
{
	$authpress_tabs = [];
	/*$authpress_tabs = [
		'integration' => [
			'slug' => 'integration',
			'name' => 'Restrictions',
			'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
			'url' => 'authpress',
			'sub' => [
				'security-for-woocommerce' => [
					'slug' => 'security-for-woocommerce',
					'name' => 'Settings',
					'description' => 'Below you will find all the settings you need to restrict specific countires and IP addressses that you wish to restrict for your WooCommerce site. The restrictons will be applied to your WooCommerce pages.',
					'url' => 'authpress'
				],
				'customize' => [
					'slug' => 'customize',
					'name' => 'Customize',
					'description' => 'Below you will find all the settings you need to customize restriction pages including the images that the visitor will see if they are restricted from accessing the website. The customization will be applied to your WooCommerce pages.',
					'url' => 'authpress-integration-customize'
				],
			],
		],
	];*/
	// Apply filter to allow modification of $variable by other plugins
	$authpress_tabs = apply_filters('authpress_tabs_modify', $authpress_tabs);

	return $authpress_tabs;
}

function authpress_get_default_options()
{
	$authpress_default_options = [
		'customizer' => [
			'redesign' => [
				'templates' => 'default-login'
			]
		],
		'base_input' => [
			'text_input' => '',
			'email_input' => '',
			'color_input' => '',
			'date_input' => '',
			'datetime_local_input' => '',
			'textarea_input' => '',
			'switch_input' => '1',
			'radio_input' => 'radio-2',
			'datalist_input' => '',
			'select_input' => '',
		],
		'array_input' => [
			'checkbox_input' => [],
			'multi_select_input' => [],
			'background' => [
				'image' => [
					'url' => '',
					'id' => 0
				],
				'color' => '#ff00ff',
				'position' => 'center',
				'size' => 'cover',
				'repeat' => 'repeat',
				'origin' => 'padding-box',
				'clip' => 'border-box',
				'attachment' => 'scroll'
			],
		],		
		'components' => [
			'basic' => [
				'ip' => '',
				'text_field' => 'this is a text field',
				'textarea_field' => 'this is a textarea field',
				'select_field' => 'select-1',
				'radio_field' => 'radio-1',
				'radio_field_2' => 'radio-2',
				'checkbox_field' => ['checkbox-1', 'checkbox-3'],
				'checkbox_field_2' => ['checkbox-2', 'checkbox-3'],
				'checkbox_field_3' => ['checkbox-1', 'checkbox-3'],
				'multiselect_field' => ['select-2', 'select-3'],
				'multiselect_field_2' => ['select-3', 'select-4'],
				'switch' => 0,
			],
			'advanced' => [
				'media_uploader' => [
					'url' => '',
					'id' => 0
				],
				'countries_list' => [
					['value' => "Albania", 'code' => "AL"],
					['value' => "Algeria", 'code' => "DZ"],
				],
				'ips' => ["111.111.111.111", "222.222.222.222"],
				'emails' => ["asd@asd.asd", "abc@abc.abc"],
				'repeatablesorter_group' => [
					[
						"enabler" => true,
						"title" => "123 Main St",
						"note" => "Leave at door",
						"enable" => true,
						"gender" => "male",
						"country" => "us",
						"languages" => ["en", "fr"],
						"hobbies" => ["reading", "sports"],
					]
				],
				'repeatablesorter' => [
					'https://www.facebook.com/',
					'https://web.whatsapp.com/',
					'https://www.youtube.com/',
					'https://web.skype.com/'
				]
			]
		],
		// 'editor-input' => '<p>Lorem</p>',

		'more' => [
			'enable_scripts' => 0,
			'css' => '/* CSS Code Here */',
			'js' => '// JavaScript Code Here',
			'header_content' => '<!-- Content inside HEAD tag -->',
			'footer_content' => '<!-- Content inside BODY tag -->',
		],

	];
	$authpress_default_options = apply_filters('authpress_default_options_modify', $authpress_default_options);

	return $authpress_default_options;
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
		$tabs = authpress_get_tabs();
		$pages = [];
		if (isset($tabs) && sizeof($tabs)) {
			foreach ($tabs as $tab) {
				$pages[] = 'admin_page_' . $tab['url'];
				if (isset($tab['sub']) && sizeof($tab['sub'])) {
					foreach ($tab['sub'] as $subtab) {
						$pages[] = 'admin_page_' . $subtab['url'];
					}
				}
			}
		}

		if (
			$current_screen->id == 'toplevel_page_authpress'
			|| $current_screen->id == 'authpress_page_authpress-react'
			|| in_array($current_screen->id, $pages)
		) {
			return true;
		}
	}
	return false;
}
