<?php


if (!defined('ABSPATH')) exit; // Exit if accessed directly

class Login_Page
{

    public function __construct()
    {
        add_action('admin_menu', [$this, 'add_admin_menu']);
        add_action('admin_init', [$this, 'register_settings']);
        add_action('login_footer', [$this, 'custom_login_styles'], 999);
        add_filter('login_headerurl', [$this, 'custom_logo_url']);

        // add_action('init', [$this, 'redirect_default_login']);
        // add_action( 'wp', [$this, 'redirect_default_login'] );
        // add_action( 'template_redirect', [$this, 'redirect_default_login'] );

        add_shortcode('custom_login_form', [$this, 'custom_login_form_shortcode']);
    }

    public function add_admin_menu()
    {
        add_menu_page(
            'Custom Login Page',
            'Login Page Options',
            'manage_options',
            'custom-login-page',
            [$this, 'settings_page'],
            'dashicons-admin-customizer'
        );
    }

    public function register_settings()
    {
        register_setting('custom_login_settings', 'clp_logo');
        register_setting('custom_login_settings', 'clp_logo_url');
        register_setting('custom_login_settings', 'clp_bg_color');
        register_setting('custom_login_settings', 'clp_bg_image');
        register_setting('custom_login_settings', 'clp_form_alignment');
        register_setting('custom_login_settings', 'clp_custom_login_slug');
        register_setting('custom_login_settings', 'clp_custom_glass_effect');
    }

    public function settings_page()
    {
?>
        <div class="wrap">
            <h1>Custom Login Page Settings</h1>
            <form method="post" action="options.php" enctype="multipart/form-data">
                <?php settings_fields('custom_login_settings'); ?>
                <?php do_settings_sections('custom_login_settings'); ?>

                <table class="form-table">
                    <tr valign="top">
                        <th scope="row">Logo URL</th>
                        <td><input type="text" name="clp_logo" value="<?php echo esc_attr(get_option('clp_logo')); ?>" placeholder="Upload or paste image URL" /></td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">Logo Link URL</th>
                        <td><input type="text" name="clp_logo_url" value="<?php echo esc_attr(get_option('clp_logo_url', home_url())); ?>" /></td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">Background Color</th>
                        <td><input type="color" name="clp_bg_color" value="<?php echo esc_attr(get_option('clp_bg_color', '#ffffff')); ?>" /></td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">Background Image</th>
                        <td><input type="text" name="clp_bg_image" value="<?php echo esc_attr(get_option('clp_bg_image')); ?>" placeholder="Upload or paste image URL" /></td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">Form Alignment</th>
                        <td>
                            <select name="clp_form_alignment">
                                <option value="center" <?php selected(get_option('clp_form_alignment'), 'center'); ?>>Center</option>
                                <option value="left" <?php selected(get_option('clp_form_alignment'), 'left'); ?>>Left</option>
                                <option value="right" <?php selected(get_option('clp_form_alignment'), 'right'); ?>>Right</option>
                            </select>
                        </td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">Glass Effect</th>
                        <td><input type="checkbox" name="clp_custom_glass_effect" value="1" <?php checked(get_option('clp_custom_glass_effect'), 1); ?> /></td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">Custom Login Page Slug</th>
                        <td><input type="text" name="clp_custom_login_slug" value="<?php echo esc_attr(get_option('clp_custom_login_slug', 'my-login')); ?>" /></td>
                    </tr>
                </table>

                <?php submit_button(); ?>
            </form>
        </div>
    <?php
    }

    public function custom_login_styles()
    {
        $logo = esc_url(get_option('clp_logo'));
        $bg_color = esc_attr(get_option('clp_bg_color', '#ffffff'));
        $bg_image = esc_url(get_option('clp_bg_image'));
        $alignment = esc_attr(get_option('clp_form_alignment', 'center'));
        $glass_effect = esc_attr(get_option('clp_custom_glass_effect', 0));

        $align_css = '';
        if ($alignment === 'left') {
            $align_css = 'margin-left: 0; margin-right: auto;';
        } elseif ($alignment === 'right') {
            $align_css = 'margin-left: auto; margin-right: 0;';
        } else {
            $align_css = 'margin: 0 auto;';
        }

    ?>
        <style type="text/css" id="login-page-css">
            body.login {
                padding: 40px;
                background-color: <?php echo $bg_color; ?>;
                <?php if ($bg_image) : ?>
                background-image: url('<?php echo $bg_image; ?>');
                background-size: cover;
                <?php endif; ?>
            }

            .login h1 a {
                <?php if ($logo) : ?>background-image: url('<?php echo $logo; ?>');
                background-size: contain;
                width: 100%;
                height: 80px;
                <?php endif; ?>
            }

            #login {
                <?php echo $align_css; ?>
            }

            <?php if ($glass_effect) : ?>
            .login form {
                background: rgba(255, 255, 255, .3);
                -webkit-backdrop-filter: blur(10px);
                backdrop-filter: blur(10px);
            }

            <?php endif ?>
        </style>
<?php
    }

    public function custom_logo_url()
    {
        return esc_url(get_option('clp_logo_url', home_url()));
    }

    public function redirect_default_login()
    {
        $custom_slug = get_option('clp_custom_login_slug', 'my-login');
        echo $custom_slug;
        if (isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], 'wp-login.php') !== false && !is_user_logged_in()) {
            // wp_redirect(home_url('/' . $custom_slug . '/'));
            // exit;
            global $wp_query;
            $wp_query->set_404();
            status_header(404);
            get_template_part(404);
            exit();
        }
    }

    public function custom_login_form_shortcode()
    {
        if (is_user_logged_in()) {
            return '<p>You are already logged in.</p>';
        }

        ob_start();
        wp_login_form([
            'redirect' => home_url()
        ]);
        return ob_get_clean();
    }
}

new Login_Page();

// // Register a custom rewrite rule for the custom login page
// add_action('init', function () {
//     $custom_slug = get_option('clp_custom_login_slug', 'my-login');
//     add_rewrite_rule("^{$custom_slug}/?", 'index.php?custom_login=1', 'top');
// });

// // Handle custom login page display
// add_action('template_redirect', function () {
//     if (get_query_var('custom_login')) {
//         status_header(200);
//         echo do_shortcode('[custom_login_form]');
//         exit;
//     }
// });

// // Add custom query var
// add_filter('query_vars', function ($vars) {
//     $vars[] = 'custom_login';
//     return $vars;
// });

// Change login URL to /signin
function change_login_url()
{
    return site_url('/signin');
}
add_filter('login_url', 'change_login_url', 10, 3);

// Redirect /signin to wp-login.php
function custom_login_page()
{
    if (strpos($_SERVER['REQUEST_URI'], '/signin') !== false) {
        require_once ABSPATH . '/wp-login.php';
        exit();
    }
}
add_action('init', 'custom_login_page');

// Block direct access to wp-login.php
function block_wp_login()
{
    if (strpos($_SERVER['REQUEST_URI'], 'wp-login.php') !== false && !defined('DOING_AJAX')) {
        global $wp_query;
        $wp_query->set_404();
        status_header(404);
        nocache_headers();
        include(get_404_template());
        exit();
    }
}
add_action('init', 'block_wp_login');
