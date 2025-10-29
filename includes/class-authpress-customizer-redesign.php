<?php
class Authpress_Customizer_Redesign {
	protected $options;

	public function __construct() {
		$this->options = authpress_get_option();
		$disable_remember_me       = isset($this->options['customizer']['redesign']['fields']['disable_remember_me']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['fields']['disable_remember_me'])) : false;

		add_action('login_enqueue_scripts', [$this, 'enqueue_login_assets'], 20);
		add_filter('login_headerurl', [$this, 'authpress_login_headerurl']);
		add_filter('login_headertitle', [$this, 'authpress_login_headertitle']);
		if ($disable_remember_me) {
			add_filter('login_form_defaults', [$this, 'authpress_login_remember_me_checked'], 10, 3);
		}
		add_filter('login_footer', function () {
			echo '<pre>';
			var_dump($this->options['customizer']['redesign']['fields']);
			echo '</pre>';
		});
	}

	public function enqueue_login_assets() {
		// Enqueue a base style handle to attach inline CSS
		wp_register_style('authpress-login-style', false); // no external CSS file
		wp_enqueue_style('authpress-login-style');
		$css = '';

		// Handle Jarallax scripts if video background
		if (
			isset($this->options['customizer']['redesign']['background']['type']) &&
			sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['type'])) === 'video' &&
			isset($this->options['customizer']['redesign']['background']['video'])
		) {
			wp_enqueue_style('jarallax.min', AUTHPRESS_URL . 'assets/plugins/jarallax/jarallax.min.css');
			wp_enqueue_script('jarallax.min', AUTHPRESS_URL . 'assets/plugins/jarallax/jarallax.min.js', ['jquery'], null, true);
			wp_enqueue_script('jarallax-video.min', AUTHPRESS_URL . 'assets/plugins/jarallax/jarallax-video.min.js', ['jquery'], null, true);

			$video = esc_url($this->options['customizer']['redesign']['background']['video'] ?? '');
			// Output the video container markup
			add_action('login_footer', function() use ($video) {
				echo '<div class="jarallax" data-jarallax data-video-src="' . esc_url($video) . '"></div>';
			});
			// Add inline CSS
			$css .= "
			.jarallax {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: -2;
			}";

		}

		
		$overlay_color = isset($this->options['customizer']['redesign']['background']['overlay']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['overlay'])) : '';
		
		if ($overlay_color) {
			add_action('login_footer', function () {
				echo '<div class="login-overlay"></div>';
			});
			$css .= "
			.login .login-overlay {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: {$overlay_color};
				z-index: -1;
			}";
		}

		
		$logo_disabled = isset($this->options['customizer']['redesign']['logo']['disabled']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['logo']['disabled'])) : false;
		$logo = isset($this->options['customizer']['redesign']['logo']['image']['url']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['logo']['image']['url'])) : '';
		$width = isset($this->options['customizer']['redesign']['logo']['width']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['logo']['width'])) : '';
		$height = isset($this->options['customizer']['redesign']['logo']['height']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['logo']['height'])) : '';
		$space = isset($this->options['customizer']['redesign']['logo']['space']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['logo']['space'])) : '';

		

		$css .= ".login h1 a {";
			$css .= "display: " . ($logo_disabled ? 'none' : 'block') . ";";
			if ($space) $css .= "margin: 0 auto {$space};";
			$css .= "background-repeat: no-repeat;";
			$css .= "background-position: center;";
			$css .= "background-size: contain;";
			if ($width) $css .= "width: {$width};";
			if ($height) $css .= "height: {$height};";
			if ($logo) $css .= "background-image: url('{$logo}');";			
			$css .= "z-index: 2; ";
			$css .= "position: relative;;";
		$css .= "}";
		
		
		$wrapper_width = isset($this->options['customizer']['redesign']['form']['wrapper']['width']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['form']['wrapper']['width'])) : '320px';
		$wrapper_height = isset($this->options['customizer']['redesign']['form']['wrapper']['height']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['form']['wrapper']['height'])) : '';
		$wrapper_margin = isset($this->options['customizer']['redesign']['form']['wrapper']['margin']) ? map_deep(wp_unslash($this->options['customizer']['redesign']['form']['wrapper']['margin']), 'sanitize_text_field') : [];
		$wrapper_padding = isset($this->options['customizer']['redesign']['form']['wrapper']['padding']) ? map_deep(wp_unslash($this->options['customizer']['redesign']['form']['wrapper']['padding']), 'sanitize_text_field') : ['top' => '5%','right' => '0px','bottom' => '0px','left' => '0px',];
		$wrapper_position = isset($this->options['customizer']['redesign']['form']['wrapper']['position']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['form']['wrapper']['position'])) : 'center';
		$wrapper_background = isset($this->options['customizer']['redesign']['form']['wrapper']['background']) ? map_deep(wp_unslash($this->options['customizer']['redesign']['form']['wrapper']['background']), 'sanitize_text_field') : [];
		$wrapper_border = isset($this->options['customizer']['redesign']['form']['wrapper']['border']) ? map_deep(wp_unslash($this->options['customizer']['redesign']['form']['wrapper']['border']), 'sanitize_text_field') : [];
		$wrapper_border_radius = isset($this->options['customizer']['redesign']['form']['wrapper']['border_radius']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['form']['wrapper']['border_radius'])) : '';
		$wrapper_glass_effect = isset($this->options['customizer']['redesign']['form']['wrapper']['glass_effect']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['form']['wrapper']['glass_effect'])) : false;

		$css .= "#login {";
		if ($wrapper_width) {
			$css .= "width: 100%;";
			$css .= "max-width: {$wrapper_width};";
		}
		if ($wrapper_height) {
			$css .= "height: {$wrapper_height};";
		}
		$css .= $this->authpress_generate_padding_css($wrapper_padding);
		$css .= $this->authpress_generate_margin_css($wrapper_margin);

		if ($wrapper_position == 'left') {$css .= "margin-left: 0;";}
		else if ($wrapper_position == 'right') {$css .= "margin-right: 0;";}
		else {$css .= "margin: auto;";}
		if ($wrapper_background && is_array($wrapper_background)) {
			$wrapper_background_color      = isset($wrapper_background['color']) ? sanitize_text_field(wp_unslash($wrapper_background['color'])) : '';
			$wrapper_background_image      = isset($wrapper_background['image']['url']) ? sanitize_text_field(wp_unslash($wrapper_background['image']['url'])) : '';
			$wrapper_background_position   = isset($wrapper_background['position']) ? sanitize_text_field(wp_unslash($wrapper_background['position'])) : '';
			$wrapper_background_size       = isset($wrapper_background['size']) ? sanitize_text_field(wp_unslash($wrapper_background['size'])) : '';
			$wrapper_background_repeat     = isset($wrapper_background['repeat']) ? sanitize_text_field(wp_unslash($wrapper_background['repeat'])) : '';
			$wrapper_background_origin     = isset($wrapper_background['origin']) ? sanitize_text_field(wp_unslash($wrapper_background['origin'])) : '';
			$wrapper_background_clip       = isset($wrapper_background['clip']) ? sanitize_text_field(wp_unslash($wrapper_background['clip'])) : '';
			$wrapper_background_attachment = isset($wrapper_background['attachment']) ? sanitize_text_field(wp_unslash($wrapper_background['attachment'])) : '';

			if ($wrapper_background_color) {
				$css .= "background-color: {$wrapper_background_color};";
			}
			if ($wrapper_background_image) {
				$css .= "background-image: url('{$wrapper_background_image}');";
			}
			if ($wrapper_background_position) {
				$css .= "background-position: {$wrapper_background_position};";
			}
			if ($wrapper_background_size) {
				$css .= "background-size: {$wrapper_background_size};";
			}
			if ($wrapper_background_repeat) {
				$css .= "background-repeat: {$wrapper_background_repeat};";
			}
			if ($wrapper_background_origin) {
				$css .= "background-origin: {$wrapper_background_origin};";
			}
			if ($wrapper_background_clip) {
				$css .= "background-clip: {$wrapper_background_clip};";
			}
			if ($wrapper_background_attachment) {
				$css .= "background-attachment: {$wrapper_background_attachment};";
			}

		}
		$css .= $this->authpress_generate_border_css($wrapper_border);
		if ($wrapper_border_radius) {
			$css .= "border-radius: {$wrapper_border_radius};";
		}
		if ($wrapper_glass_effect) {
			$css .= "backdrop-filter: blur(10px) saturate(180%); -webkit-backdrop-filter: blur(10px) saturate(180%);";
			$wrapper_background_color      = isset($wrapper_background['color']) ? sanitize_text_field(wp_unslash($wrapper_background['color'])) : '';
			if ($wrapper_background_color) {
				$css .= "background-color: {$wrapper_background_color}80;";
			} else {
				$css .= "background-color: #ffffff80;";
			}
		}
		$css .= "box-sizing: border-box;";
		$css .= "}";

		$unit_margin = isset($this->options['customizer']['redesign']['form']['unit']['margin']) ? map_deep(wp_unslash($this->options['customizer']['redesign']['form']['unit']['margin']), 'sanitize_text_field') : ['top' => '5%','right' => '0px','bottom' => '0px','left' => '0px',];
		$unit_padding = isset($this->options['customizer']['redesign']['form']['unit']['padding']) ? map_deep(wp_unslash($this->options['customizer']['redesign']['form']['unit']['padding']), 'sanitize_text_field') : ['top' => '5%','right' => '0px','bottom' => '0px','left' => '0px',];
		$unit_background = isset($this->options['customizer']['redesign']['form']['unit']['background']) ? map_deep(wp_unslash($this->options['customizer']['redesign']['form']['unit']['background']), 'sanitize_text_field') : [];
		$unit_border = isset($this->options['customizer']['redesign']['form']['unit']['border']) ? map_deep(wp_unslash($this->options['customizer']['redesign']['form']['unit']['border']), 'sanitize_text_field') : [];
		$unit_border_radius = isset($this->options['customizer']['redesign']['form']['unit']['border_radius']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['form']['unit']['border_radius'])) : '';
		$unit_glass_effect = isset($this->options['customizer']['redesign']['form']['unit']['glass_effect']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['form']['unit']['glass_effect'])) : false;
		
		$css .= ".login form {";
		
		$css .= $this->authpress_generate_padding_css($unit_padding);
		$css .= $this->authpress_generate_margin_css($unit_margin);
		$css .= $this->authpress_generate_background_css($unit_background);
		$css .= $this->authpress_generate_border_css($unit_border);

		if ($unit_border_radius) {
			$css .= "border-radius: {$unit_border_radius};";
		}
		if ($unit_glass_effect) {
			$css .= "backdrop-filter: blur(10px) saturate(180%); -webkit-backdrop-filter: blur(10px) saturate(180%);";
			$unit_background_color      = isset($unit_background['color']) ? sanitize_text_field(wp_unslash($unit_background['color'])) : '';
			if ($unit_background_color) {
				$css .= "background-color: {$unit_background_color}80;";
			} else {
				$css .= "background-color: #ffffff80;";
			}
		}
		$css .= "}";
		

		
		$disable_remember_me       = isset($this->options['customizer']['redesign']['fields']['disable_remember_me']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['fields']['disable_remember_me'])) : false;
		if ($disable_remember_me) {
			$css .= ".login #loginform .forgetmenot { display: none; }";
		}
		$fields_width       = isset($this->options['customizer']['redesign']['fields']['width']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['fields']['width'])) : '100%';
		$fields_height       = isset($this->options['customizer']['redesign']['fields']['height']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['fields']['height'])) : '40px';
		$fields_font       = isset($this->options['customizer']['redesign']['fields']['font']) ? map_deep(wp_unslash($this->options['customizer']['redesign']['fields']['font']), 'sanitize_text_field') : [];		
		$fields_border = isset($this->options['customizer']['redesign']['fields']['border']) ? map_deep(wp_unslash($this->options['customizer']['redesign']['fields']['border']), 'sanitize_text_field') : [];
		$fields_border_radius = isset($this->options['customizer']['redesign']['fields']['border_radius']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['fields']['border_radius'])) : '4px';
		$fields_boxshadow = isset($this->options['customizer']['redesign']['fields']['boxshadow']) ? map_deep(wp_unslash($this->options['customizer']['redesign']['fields']['boxshadow']), 'sanitize_text_field') : [];	
		$fields_padding = isset($this->options['customizer']['redesign']['fields']['padding']) ? map_deep(wp_unslash($this->options['customizer']['redesign']['fields']['padding']), 'sanitize_text_field') : ['top' => '10px','right' => '10px','bottom' => '10px','left' => '10px',];
		$fields_margin = isset($this->options['customizer']['redesign']['fields']['margin']) ? map_deep(wp_unslash($this->options['customizer']['redesign']['fields']['margin']), 'sanitize_text_field') : ['top' => '0px','right' => '0px','bottom' => '10px','left' => '0px',];
		$fields_background_color = isset($this->options['customizer']['redesign']['fields']['background_color']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['fields']['background_color'])) : '#ffffff';
		$fields_label_font = isset($this->options['customizer']['redesign']['fields']['label_font']) ? map_deep(wp_unslash($this->options['customizer']['redesign']['fields']['label_font']), 'sanitize_text_field') : [];
		$css .= '.login form input[type="text"], .login form input[type="password"], .login form input[type="color"], .login form input[type="date"], .login form input[type="datetime"], .login form input[type="datetime-local"], .login form input[type="email"], .login form input[type="month"], .login form input[type="number"], .login form input[type="search"], .login form input[type="tel"], .login form input[type="time"], .login form input[type="url"], .login form input[type="week"], .login form select, .login form textarea {';
		if ($fields_width) {
			$css .= "width: {$fields_width}; max-width: 100%;";
		}
		
		$css .= $this->authpress_generate_font_css($fields_font);
		$css .= $this->authpress_generate_border_css($fields_border);
		if ($fields_border_radius) {
			$css .= "border-radius: {$fields_border_radius};";
		}
		if ($fields_boxshadow && is_array($fields_boxshadow)) {
			$h_offset = isset($fields_boxshadow['h_offset']) ? sanitize_text_field(wp_unslash($fields_boxshadow['h_offset'])) : '0px';
			$v_offset = isset($fields_boxshadow['v_offset']) ? sanitize_text_field(wp_unslash($fields_boxshadow['v_offset'])) : '0px';
			$blur = isset($fields_boxshadow['blur']) ? sanitize_text_field(wp_unslash($fields_boxshadow['blur'])) : '0px';
			$spread = isset($fields_boxshadow['spread']) ? sanitize_text_field(wp_unslash($fields_boxshadow['spread'])) : '0px';
			$color = isset($fields_boxshadow['color']) ? sanitize_text_field(wp_unslash($fields_boxshadow['color'])) : '#000000';
			$css .= "box-shadow: {$h_offset} {$v_offset} {$blur} {$spread} {$color};";
		}
		$css .= $this->authpress_generate_padding_css($fields_padding);
		$css .= $this->authpress_generate_margin_css($fields_margin);
		if ($fields_background_color) {
			$css .= "background-color: {$fields_background_color};";
		}
		$css .= "}";
		$css .= '.login form input[type="text"], .login form input[type="password"], .login form input[type="color"], .login form input[type="date"], .login form input[type="datetime"], .login form input[type="datetime-local"], .login form input[type="email"], .login form input[type="month"], .login form input[type="number"], .login form input[type="search"], .login form input[type="tel"], .login form input[type="time"], .login form input[type="url"], .login form input[type="week"], .login form select {';
		if ($fields_height) {
			$css .= "height: {$fields_height};";
		}
		$css .= "}";
		$css .= '.login form label {';
		$css .= $this->authpress_generate_font_css($fields_label_font);
		$css .= "}";


		$type       = isset($this->options['customizer']['redesign']['background']['type']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['type'])) : 'color';
		$color      = isset($this->options['customizer']['redesign']['background']['background']['color']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['color'])) : '';
		$image      = isset($this->options['customizer']['redesign']['background']['background']['image']['url']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['image']['url'])) : '';
		$position   = isset($this->options['customizer']['redesign']['background']['background']['position']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['position'])) : '';
		$size       = isset($this->options['customizer']['redesign']['background']['background']['size']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['size'])) : '';
		$repeat     = isset($this->options['customizer']['redesign']['background']['background']['repeat']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['repeat'])) : '';
		$origin     = isset($this->options['customizer']['redesign']['background']['background']['origin']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['origin'])) : '';
		$clip       = isset($this->options['customizer']['redesign']['background']['background']['clip']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['clip'])) : '';
		$attachment = isset($this->options['customizer']['redesign']['background']['background']['attachment']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['attachment'])) : '';


		$css .= ".login {";
		if ($type == 'gradient' && $color) {
			$css .= "background: {$color};";
		}
		if ($type === 'image') {
			$css .= "background-color: {$color};";
		}
		if ($image && $type === 'image') {
			$css .= "background-image: url('{$image}');";
		}
		if ($position) {
			$css .= "background-position: {$position};";
		}
		if ($size) {
			$css .= "background-size: {$size};";
		}
		if ($repeat) {
			$css .= "background-repeat: {$repeat};";
		}
		if ($origin) {
			$css .= "background-origin: {$origin};";
		}
		if ($clip) {
			$css .= "background-clip: {$clip};";
		}
		if ($attachment) {
			$css .= "background-attachment: {$attachment};";
		}
		$css .= "}";

		wp_add_inline_style('authpress-login-style', $css);
	}

	// Always remember users when they log in
	public function authpress_login_remember_me_checked( $defaults ) {
		$defaults['remember'] = true;
    	return $defaults;
	}
	public function authpress_login_headerurl() {
		$url = isset($this->options['customizer']['redesign']['logo']['url']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['logo']['url'])) : '';
		return $url ? esc_url($url) : home_url();
	}	
	public function authpress_login_headertitle() {
		$title = get_bloginfo( 'name' );
		return $title;
	}
	public function authpress_generate_font_css($option){
		$css = '';
		if ($option && is_array($option) && $option['enabled']) {			
			isset($option['color'])? $css .= "color: ".sanitize_text_field(wp_unslash($option['color'])).";":'';
			isset($option['font-size'])? $css .= "font-size: ".sanitize_text_field(wp_unslash($option['font-size'])).";":'';
			isset($option['font-weight'])? $css .= "font-weight: ".sanitize_text_field(wp_unslash($option['font-weight'])).";":'';
			isset($option['font-style'])? $css .= "font-style: ".sanitize_text_field(wp_unslash($option['font-style'])).";":'';
			isset($option['text-transform'])? $css .= "text-transform: ".sanitize_text_field(wp_unslash($option['text-transform'])).";":'';
		}
		return $css;
	}
	public function authpress_generate_border_css($option){
		$css = '';
		if ($option && is_array($option)) {
			if (sizeof($option) == 3) {
				$border_width = isset($option['width']) ? sanitize_text_field(wp_unslash($option['width'])) : '0px';
				$border_style = isset($option['style']) ? sanitize_text_field(wp_unslash($option['style'])) : 'none';
				$border_color = isset($option['color']) ? sanitize_text_field(wp_unslash($option['color'])) : '#000000';
				$css .= "border: {$border_width} {$border_style} {$border_color};";
			} else if (sizeof($option) == 4) {
				$border_top_width = isset($option['top']['width']) ? sanitize_text_field(wp_unslash($option['top']['width'])) : '0px';
				$border_top_style = isset($option['top']['style']) ? sanitize_text_field(wp_unslash($option['top']['style'])) : 'none';
				$border_top_color = isset($option['top']['color']) ? sanitize_text_field(wp_unslash($option['top']['color'])) : '#000000';
				$css .= "border-top: {$border_top_width} {$border_top_style} {$border_top_color};";
				$border_right_width = isset($option['right']['width']) ? sanitize_text_field(wp_unslash($option['right']['width'])) : '0px';
				$border_right_style = isset($option['right']['style']) ? sanitize_text_field(wp_unslash($option['right']['style'])) : 'none';
				$border_right_color = isset($option['right']['color']) ? sanitize_text_field(wp_unslash($option['right']['color'])) : '#000000';
				$css .= "border-right: {$border_right_width} {$border_right_style} {$border_right_color};";
				$border_bottom_width = isset($option['bottom']['width']) ? sanitize_text_field(wp_unslash($option['bottom']['width'])) : '0px';
				$border_bottom_style = isset($option['bottom']['style']) ? sanitize_text_field(wp_unslash($option['bottom']['style'])) : 'none';
				$border_bottom_color = isset($option['bottom']['color']) ? sanitize_text_field(wp_unslash($option['bottom']['color'])) : '#000000';
				$css .= "border-bottom: {$border_bottom_width} {$border_bottom_style} {$border_bottom_color};";
				$border_left_width = isset($option['left']['width']) ? sanitize_text_field(wp_unslash($option['left']['width'])) : '0px';
				$border_left_style = isset($option['left']['style']) ? sanitize_text_field(wp_unslash($option['left']['style'])) : 'none';
				$border_left_color = isset($option['left']['color']) ? sanitize_text_field(wp_unslash($option['left']['color'])) : '#000000';
				$css .= "border-left: {$border_left_width} {$border_left_style} {$border_left_color};";
			}
		}
		return $css;
	}
	public function authpress_generate_boxshadow_css($option){
		$css = '';
		if ($option && is_array($option)) {
			$h_offset = isset($option['h_offset']) ? sanitize_text_field(wp_unslash($option['h_offset'])) : '0px';
			$v_offset = isset($option['v_offset']) ? sanitize_text_field(wp_unslash($option['v_offset'])) : '0px';
			$blur = isset($option['blur']) ? sanitize_text_field(wp_unslash($option['blur'])) : '0px';
			$spread = isset($option['spread']) ? sanitize_text_field(wp_unslash($option['spread'])) : '0px';
			$color = isset($option['color']) ? sanitize_text_field(wp_unslash($option['color'])) : '#000000';
			$css .= "box-shadow: {$h_offset} {$v_offset} {$blur} {$spread} {$color};";
		}
		return $css;
	}
	public function authpress_generate_padding_css($option){
		$css = '';
		if ($option && is_array($option)) {
			isset($option['top'])? $css .= "padding-top: ".sanitize_text_field(wp_unslash($option['top'])).";":'';
			isset($option['right'])? $css .= "padding-right: ".sanitize_text_field(wp_unslash($option['right'])).";":'';
			isset($option['bottom'])? $css .= "padding-bottom: ".sanitize_text_field(wp_unslash($option['bottom'])).";":'';
			isset($option['left'])? $css .= "padding-left: ".sanitize_text_field(wp_unslash($option['left'])).";":'';
		}
		return $css;
	}
	public function authpress_generate_margin_css($option){
		$css = '';
		if ($option && is_array($option)) {
			isset($option['top'])? $css .= "margin-top: ".sanitize_text_field(wp_unslash($option['top'])).";":'';
			isset($option['right'])? $css .= "margin-right: ".sanitize_text_field(wp_unslash($option['right'])).";":'';
			isset($option['bottom'])? $css .= "margin-bottom: ".sanitize_text_field(wp_unslash($option['bottom'])).";":'';
			isset($option['left'])? $css .= "margin-left: ".sanitize_text_field(wp_unslash($option['left'])).";":'';
		}
		return $css;
	}
	public function authpress_generate_background_css($option){
		$css = '';
		if ($option && is_array($option)) {
			$background_color      = isset($option['color']) ? sanitize_text_field(wp_unslash($option['color'])) : '';
			$background_image      = isset($option['image']['url']) ? sanitize_text_field(wp_unslash($option['image']['url'])) : '';
			$background_position   = isset($option['position']) ? sanitize_text_field(wp_unslash($option['position'])) : '';
			$background_size       = isset($option['size']) ? sanitize_text_field(wp_unslash($option['size'])) : '';
			$background_repeat     = isset($option['repeat']) ? sanitize_text_field(wp_unslash($option['repeat'])) : '';
			$background_origin     = isset($option['origin']) ? sanitize_text_field(wp_unslash($option['origin'])) : '';
			$background_clip       = isset($option['clip']) ? sanitize_text_field(wp_unslash($option['clip'])) : '';
			$background_attachment = isset($option['attachment']) ? sanitize_text_field(wp_unslash($option['attachment'])) : '';

			if ($background_color) {
				$css .= "background-color: {$background_color};";
			}
			if ($background_image) {
				$css .= "background-image: url('{$background_image}');";
			}
			if ($background_position) {
				$css .= "background-position: {$background_position};";
			}
			if ($background_size) {
				$css .= "background-size: {$background_size};";
			}
			if ($background_repeat) {
				$css .= "background-repeat: {$background_repeat};";
			}
			if ($background_origin) {
				$css .= "background-origin: {$background_origin};";
			}
			if ($background_clip) {
				$css .= "background-clip: {$background_clip};";
			}
			if ($background_attachment) {
				$css .= "background-attachment: {$background_attachment};";
			}	
		}
		return $css;
	}
}

new Authpress_Customizer_Redesign();