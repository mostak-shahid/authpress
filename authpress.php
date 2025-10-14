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
				'templates' => 'default-login',
				'background'=> [
					'type' => 'image', // gradient, image, video
					'background' => [
						"image" => [
							'id' => '',
							'url' => '',
						],
						"color" => "#f0f0f1",
						"position" => "center",
						"size" => "auto",
						"repeat" => "repeat",
						"origin" => "padding-box",
						"clip" => "border-box",
						"attachment" => "scroll",
					],
					'video' => '',
					'overlay' => '#ffffff00',
				],
				'logo' => [
					'image' => [
						'id' => '',
						'url' => '',
					],
					'width' => '64px',
					'height' => '64px',
					'space' => '24px',
					'url' => 'https://wordpress.org/'
				],
				'form' => [
					'wrapper' => [
						'width' => '320px',
						'padding' => [
							'top' => '5px',
							'right' => '0px',
							'bottom' => '0px',
							'left' => '0px',
						],
						'position' => 'center',
						'background' => [
							"image" => [
								'id' => '',
								'url' => '',
							],
							"color" => "",
							"position" => "center",
							"size" => "auto",
							"repeat" => "repeat",
							"attachment" => "scroll",
						],
						'border' => [
							'top' => ['color'=> '','style'=> 'none','width'=> '0px'],
							'right' => ['color'=> '','style'=> 'none','width'=> '0px'],
							'bottom' => ['color'=> '','style'=> 'none','width'=> '0px'],
							'left' => ['color'=> '','style'=> 'none','width'=> '0px'],
						],
						'border_radius' => '0px',
						//box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
						"glass_effect" => false,
					],
					'unit' => [
						'margin' => [
							'top' => '24px',
							'right' => '0px',
							'bottom' => '24px',
							'left' => '0px',
						],
						'padding' => [
							'top' => '26px',
							'right' => '24px',
							'bottom' => '26px',
							'left' => '24px',
						],
						'background' => [
							"image" => "",
							"color" => "#fff",
							"position" => "center",
							"size" => "auto",
							"repeat" => "repeat",
							"attachment" => "scroll",
						],
						'border' => [
							'top' => ['color'=> '','style'=> 'none','width'=> '0px'],
							'right' => ['color'=> '','style'=> 'none','width'=> '0px'],
							'bottom' => ['color'=> '','style'=> 'none','width'=> '0px'],
							'left' => ['color'=> '','style'=> 'none','width'=> '0px'],
						],
						'border_radius' => '0px',
						//box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
						"glass_effect" => false,

					],
				],
				'fields' => [
					'disable_remember_me' => false,
					'width' => '100%',
					'height' => '40px',
					'font' => [
						'color' => '#2c3338', 
						'font-size' => '14', 
						'font-weight'=> '', 
						'font-style' => '', 
						'text-transform' => '',
					],
					'border' => [
						'top' => ['color'=> '#8c8f94','style'=> 'solid','width'=> '1px'],
						'right' => ['color'=> '#8c8f94','style'=> 'solid','width'=> '1px'],
						'bottom' => ['color'=> '#8c8f94','style'=> 'solid','width'=> '1px'],
						'left' => ['color'=> '#8c8f94','style'=> 'solid','width'=> '1px'],
					],
					'border_radius' => '4px',
					'disable_box_shadow' => 0,

					'padding' => [
						'top' => '0.1875rem',
						'right' => '0.3125rem',
						'bottom' => '0.1875rem',
						'left' => '0.3125rem',
					],
					'margin' => [
						'top' => '0px',
						'right' => '6px',
						'bottom' => '16px',
						'left' => '0px',
					],
					'background_color' => '#ffffff',
					'label_font' => [
						'color' => '#3c434a', 
						'font-size' => '14', 
						'font-weight'=> '', 
						'font-style' => '', 
						'text-transform' => '',
					],
				],
				'button' => [
					'font' => [
						'font-size' => '14', 
						'font-weight'=> '', 
						'font-style' => '', 
						'text-transform' => '',
					],
					'background' => [
						'normal' => '', 
						'hover' => '', 
						'active' => '',
					],
					'color' => [
						'normal' => '', 
						'hover' => '', 
						'active' => '',
					],
					'padding' => [
						'top' => '0px',
						'right' => '0px',
						'bottom' => '0px',
						'left' => '0px',
					],
					'margin' => [
						'top' => '0px',
						'right' => '0px',
						'bottom' => '0px',
						'left' => '0px',
					],
					'border' => [],
					'border_radius' => '0px',
					'boxshadow' => [],
					'textshadow' => [],
					'size' => 'auto'

				],
				'other' => [
					'disable_register_link' => false,
					'disable_lost_password' => false,
					'disable_privacy_policy' => false,
					'disable_back_to_website' => false,
					'font' => [
						'color' => '#2c3338', 
						'font-size' => '14', 
						'font-weight'=> '', 
						'font-style' => '', 
						'text-transform' => '',
					],
				],
			],
			'additional_fields' => [
				'login' => [], // label, required, type, default, options
				'registration' => []
			],
			'settings' => [
				'login_url' => '',
				'registration_url' => '',
				'forgot_password_url' => '',
				'login_by' => 'both', //username, email, both
				'remember_me_always_on' => false,
				'enable_registration_password' => false,
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
			],
			'advanced' => [
				'wordpress' => [

				],
				'custom' => [
					'color_picker' => '#ff00ff',
					'gradient_picker' => 'linear-gradient(135deg,#f00,#ff0)',
					'color_gradient_picker' => '',
				],
			]
		],
		// 'editor-input' => '<p>Lorem</p>',

		'more' => [
			'enable_scripts' => false,
			'css' => '/* CSS Code Here */',
			'js' => '// JavaScript Code Here',
			'header_content' => '<!-- Content inside HEAD tag -->',
			'footer_content' => '<!-- Content inside BODY tag -->',
			
		],
		'tools' => [
			'delete_data_on' => 'none', // delete, unstall, none
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

// <iframe width="560" height="315" src="https://www.youtube.com/embed/fjCrLPL1YJk?si=Auv0jR210UGihyRM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

/**
 * Step 1: Register Rewrite Rules
 */

// Register custom login/register/lost password slugs
// add_action('init', function () {
//     add_rewrite_rule('^my-login/?$', 'index.php?custom_auth_page=login', 'top');
//     add_rewrite_rule('^my-register/?$', 'index.php?custom_auth_page=register', 'top');
//     add_rewrite_rule('^my-lost-password/?$', 'index.php?custom_auth_page=lostpassword', 'top');
// });

// // Register custom query var
// add_filter('query_vars', function ($vars) {
//     $vars[] = 'custom_auth_page';
//     return $vars;
// });

/**
 * Step 2: Catch and Render the Page
 */

// Now intercept when someone visits /my-login/, /my-register/, or /my-lost-password/:
// add_action('template_redirect', function () {
//     $auth_page = get_query_var('custom_auth_page');

//     if ($auth_page) {
//         status_header(200);
//         nocache_headers();

//         get_header();

//         echo '<div class="custom-auth-page">';
//         if ($auth_page === 'login') {
//             wp_login_form(); // native login form
//         } elseif ($auth_page === 'register') {
//             // basic WP register form
//             echo '<h2>Register</h2>';
//             wp_register('', '');
//         } elseif ($auth_page === 'lostpassword') {
//             echo '<h2>Lost Password</h2>';
//             echo '<p><a href="' . esc_url(wp_lostpassword_url()) . '">Click here to reset your password</a></p>';
//         }
//         echo '</div>';

//         get_footer();
//         exit;
//     }
// });

/**
 * Step 3: Override Default WordPress URLs
 */

// So functions like wp_login_url(), wp_registration_url(), and wp_lostpassword_url() return your custom slugs:
// add_filter('login_url', function ($url, $redirect, $force_reauth) {
//     return home_url('/' . get_option('myplugin_login_slug', 'my-login') . '/');
// }, 10, 3);

// add_filter('register_url', function ($url) {
//     return home_url('/' . get_option('myplugin_register_slug', 'my-register') . '/');
// });

// add_filter('lostpassword_url', function ($url, $redirect) {
//     return home_url('/' . get_option('myplugin_lost_slug', 'my-lost-password') . '/');
// }, 10, 2);

/**
 * Step 1: Hook Into Authentication
 */

// Override WordPress’s login behavior using authenticate filter:
add_filter('authenticate', function ($user, $username, $password) {
	if ($username == 'admin') {
		return new WP_Error('restricted_email', esc_html__('Login is not allowed for this email address.', 'authpress'));
	}
	return $user;
    // // Skip if user already authenticated or empty
    // // if ($user instanceof WP_User || empty($username) || empty($password)) {
    // //     return $user;
    // // }

    // // $method = get_option('myplugin_login_method', 'both'); // default to both
    // // $method = get_option('myplugin_login_method', 'username'); // default to both
    // $method = get_option('myplugin_login_method', 'email'); // default to both
	// return new WP_Error('invalid_email', $method);

    // if ($method === 'email') {
    //     // Require email only
    //     if (!is_email($username)) {
    //         return new WP_Error('invalid_email', __('You must use your email address to log in.'));
    //     }
    //     $user_obj = get_user_by('email', $username);
    //     if ($user_obj) {
    //         return wp_authenticate_username_password(null, $user_obj->user_login, $password);
    //     }

    // } elseif ($method === 'username') {
    //     // Require username only
    //     if (is_email($username)) {
    //         return new WP_Error('invalid_username', __('You must use your username to log in.'));
    //     }
    //     $user_obj = get_user_by('login', $username);
    //     if ($user_obj) {
    //         return wp_authenticate_username_password(null, $username, $password);
    //     }

    // } else {
    //     // both (default WP behavior, fallback to core)
    //     return wp_authenticate_username_password(null, $username, $password);
    // }

    // return new WP_Error('invalid_login', __('Invalid credentials.'));
}, 30, 3);


/**
 * Step 2: Adjust Login Form Label
 */

// If you want the login form label (Username or Email Address) to match the setting, filter gettext:
add_filter('gettext', function ($translated_text, $text, $domain) {
    // $method = get_option('myplugin_login_method', 'both');
    // $method = get_option('myplugin_login_method', 'username');
    $method = get_option('myplugin_login_method', 'email');

    if ($text === 'Username or Email Address') {
        if ($method === 'username') {
            return __('Username');
        } elseif ($method === 'email') {
            return __('Email');
        }
    }

    return $translated_text;
}, 20, 3);



