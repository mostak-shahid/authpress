<?php
class Authpress_Login_Functionalities
{
	protected $options;

	public function __construct()
	{
		$this->options = authpress_get_option();
		if (isset($this->options['more']['enable_scripts']) && $this->options['more']['enable_scripts'] == 1) {

			add_filter('site_url', array(self::class, 'ultimate_security_login_control_site_url'), 10, 4);
			add_filter('network_site_url', array(self::class, 'ultimate_security_login_control_network_site_url'), 10, 3);
			add_filter('wp_redirect', array(self::class, 'ultimate_security_login_control_wp_redirect'), 10, 2);
			add_filter('site_option_ultimate_security_welcome_email_content', array(self::class, 'ultimate_security_welcome_email_content'));
			add_filter('user_request_action_email_content', array(self::class, 'ultimate_security_user_request_action_email_content'), 999, 2);
			remove_action('template_redirect', 'wp_redirect_admin_locations', 1000);
			add_filter('login_url', array(self::class, 'ultimate_security_login_control_login_url'), 10, 3);
			add_action('init', array(self::class, 'ultimate_security_is_login_check'), 9999);
			add_action('wp_loaded', array(self::class, 'ultimate_security_redirect_user'));
		
		}
	}

	//add_action('woocommerce_init', $plugin_public, 'ultimate_product_badge_for_woocommerce_add_badge', 9);
	public function add_header_script()
	{
		echo wp_kses_post($this->options['more']['header_content']) ?? '';
	}
	public function add_footer_script()
	{
		echo wp_kses_post($this->options['more']['footer_content']) ?? '';
		if (isset($this->options['more']['css']) && !empty($this->options['more']['css'])) {
			echo '<style id="authpress_style">' . wp_kses_post($this->options['more']['css']) . '</style>';
		}
		if (isset($this->options['more']['js']) && !empty($this->options['more']['js'])) {
			echo '<script id="authpress_script">' . wp_kses_post($this->options['more']['js']) . '</script>';
		}
	}
}

new Authpress_Login_Functionalities;
