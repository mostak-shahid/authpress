<?php
class Authpress_Customizer_Redesign {
	protected $options;

	public function __construct() {
		$this->options = authpress_get_option();

		add_action('login_enqueue_scripts', [$this, 'enqueue_login_assets'], 20);
		add_action('login_enqueue_scripts', [$this, 'enqueue_login_assets'], 20);
		add_filter('login_footer', function () {
			// echo '<pre>';
			// var_dump($this->options['customizer']['redesign']['form']['wrapper']['border']);
			// echo '</pre>';
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
		if ($wrapper_margin && is_array($wrapper_margin)) {
			isset($wrapper_margin['top'])? $css .= "margin-top: ".sanitize_text_field(wp_unslash($wrapper_margin['top'])).";":'';
			isset($wrapper_margin['right'])? $css .= "margin-right: ".sanitize_text_field(wp_unslash($wrapper_margin['right'])).";":'';
			isset($wrapper_margin['bottom'])? $css .= "margin-bottom: ".sanitize_text_field(wp_unslash($wrapper_margin['bottom'])).";":'';
			isset($wrapper_margin['left'])? $css .= "margin-left: ".sanitize_text_field(wp_unslash($wrapper_margin['left'])).";":'';
		}
		if ($wrapper_padding && is_array($wrapper_padding)) {
			isset($wrapper_padding['top'])? $css .= "padding-top: ".sanitize_text_field(wp_unslash($wrapper_padding['top'])).";":'';
			isset($wrapper_padding['right'])? $css .= "padding-right: ".sanitize_text_field(wp_unslash($wrapper_padding['right'])).";":'';
			isset($wrapper_padding['bottom'])? $css .= "padding-bottom: ".sanitize_text_field(wp_unslash($wrapper_padding['bottom'])).";":'';
			isset($wrapper_padding['left'])? $css .= "padding-left: ".sanitize_text_field(wp_unslash($wrapper_padding['left'])).";":'';
		}
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

		if (sizeof($wrapper_border) == 3) {
			$border_width = isset($wrapper_border['width']) ? sanitize_text_field(wp_unslash($wrapper_border['width'])) : '0px';
			$border_style = isset($wrapper_border['style']) ? sanitize_text_field(wp_unslash($wrapper_border['style'])) : 'solid';
			$border_color = isset($wrapper_border['color']) ? sanitize_text_field(wp_unslash($wrapper_border['color'])) : '#000000';
			$css .= "border: {$border_width} {$border_style} {$border_color};";
		} else if (sizeof($wrapper_border) == 4) {
			$border_top_width = isset($wrapper_border['top']['width']) ? sanitize_text_field(wp_unslash($wrapper_border['top']['width'])) : '0px';
			$border_top_style = isset($wrapper_border['top']['style']) ? sanitize_text_field(wp_unslash($wrapper_border['top']['style'])) : 'solid';
			$border_top_color = isset($wrapper_border['top']['color']) ? sanitize_text_field(wp_unslash($wrapper_border['top']['color'])) : '#000000';
			$css .= "border-top: {$border_top_width} {$border_top_style} {$border_top_color};";
			$border_right_width = isset($wrapper_border['right']['width']) ? sanitize_text_field(wp_unslash($wrapper_border['right']['width'])) : '0px';
			$border_right_style = isset($wrapper_border['right']['style']) ? sanitize_text_field(wp_unslash($wrapper_border['right']['style'])) : 'solid';
			$border_right_color = isset($wrapper_border['right']['color']) ? sanitize_text_field(wp_unslash($wrapper_border['right']['color'])) : '#000000';
			$css .= "border-right: {$border_right_width} {$border_right_style} {$border_right_color};";
			$border_bottom_width = isset($wrapper_border['bottom']['width']) ? sanitize_text_field(wp_unslash($wrapper_border['bottom']['width'])) : '0px';
			$border_bottom_style = isset($wrapper_border['bottom']['style']) ? sanitize_text_field(wp_unslash($wrapper_border['bottom']['style'])) : 'solid';
			$border_bottom_color = isset($wrapper_border['bottom']['color']) ? sanitize_text_field(wp_unslash($wrapper_border['bottom']['color'])) : '#000000';
			$css .= "border-bottom: {$border_bottom_width} {$border_bottom_style} {$border_bottom_color};";
			$border_left_width = isset($wrapper_border['left']['width']) ? sanitize_text_field(wp_unslash($wrapper_border['left']['width'])) : '0px';
			$border_left_style = isset($wrapper_border['left']['style']) ? sanitize_text_field(wp_unslash($wrapper_border['left']['style'])) : 'solid';
			$border_left_color = isset($wrapper_border['left']['color']) ? sanitize_text_field(wp_unslash($wrapper_border['left']['color'])) : '#000000';
			$css .= "border-left: {$border_left_width} {$border_left_style} {$border_left_color};";
		}
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
		if ($unit_margin && is_array($unit_margin)) {
			isset($unit_margin['top'])? $css .= "padding-top: ".sanitize_text_field(wp_unslash($unit_margin['top'])).";":'';
			isset($unit_margin['right'])? $css .= "padding-right: ".sanitize_text_field(wp_unslash($unit_margin['right'])).";":'';
			isset($unit_margin['bottom'])? $css .= "padding-bottom: ".sanitize_text_field(wp_unslash($unit_margin['bottom'])).";":'';
			isset($unit_margin['left'])? $css .= "padding-left: ".sanitize_text_field(wp_unslash($unit_margin['left'])).";":'';
		}
		if ($unit_padding && is_array($unit_padding)) {
			isset($unit_padding['top'])? $css .= "padding-top: ".sanitize_text_field(wp_unslash($unit_padding['top'])).";":'';
			isset($unit_padding['right'])? $css .= "padding-right: ".sanitize_text_field(wp_unslash($unit_padding['right'])).";":'';
			isset($unit_padding['bottom'])? $css .= "padding-bottom: ".sanitize_text_field(wp_unslash($unit_padding['bottom'])).";":'';
			isset($unit_padding['left'])? $css .= "padding-left: ".sanitize_text_field(wp_unslash($unit_padding['left'])).";":'';
		}
		if ($unit_background && is_array($unit_background)) {
			$unit_background_color      = isset($unit_background['color']) ? sanitize_text_field(wp_unslash($unit_background['color'])) : '';
			$unit_background_image      = isset($unit_background['image']['url']) ? sanitize_text_field(wp_unslash($unit_background['image']['url'])) : '';
			$unit_background_position   = isset($unit_background['position']) ? sanitize_text_field(wp_unslash($unit_background['position'])) : '';
			$unit_background_size       = isset($unit_background['size']) ? sanitize_text_field(wp_unslash($unit_background['size'])) : '';
			$unit_background_repeat     = isset($unit_background['repeat']) ? sanitize_text_field(wp_unslash($unit_background['repeat'])) : '';
			$unit_background_origin     = isset($unit_background['origin']) ? sanitize_text_field(wp_unslash($unit_background['origin'])) : '';
			$unit_background_clip       = isset($unit_background['clip']) ? sanitize_text_field(wp_unslash($unit_background['clip'])) : '';
			$unit_background_attachment = isset($unit_background['attachment']) ? sanitize_text_field(wp_unslash($unit_background['attachment'])) : '';

			if ($unit_background_color) {
				$css .= "background-color: {$unit_background_color};";
			}
			if ($unit_background_image) {
				$css .= "background-image: url('{$unit_background_image}');";
			}
			if ($unit_background_position) {
				$css .= "background-position: {$unit_background_position};";
			}
			if ($unit_background_size) {
				$css .= "background-size: {$unit_background_size};";
			}
			if ($unit_background_repeat) {
				$css .= "background-repeat: {$unit_background_repeat};";
			}
			if ($unit_background_origin) {
				$css .= "background-origin: {$unit_background_origin};";
			}
			if ($unit_background_clip) {
				$css .= "background-clip: {$unit_background_clip};";
			}
			if ($unit_glass_effect) {
				$css .= "background-attachment: {$unit_glass_effect};";
			}

		}
		if (sizeof($unit_border) == 3) {
			$border_width = isset($unit_border['width']) ? sanitize_text_field(wp_unslash($unit_border['width'])) : '0px';
			$border_style = isset($unit_border['style']) ? sanitize_text_field(wp_unslash($unit_border['style'])) : 'solid';
			$border_color = isset($unit_border['color']) ? sanitize_text_field(wp_unslash($unit_border['color'])) : '#000000';
			$css .= "border: {$border_width} {$border_style} {$border_color};";
		} else if (sizeof($unit_border) == 4) {
			$border_top_width = isset($unit_border['top']['width']) ? sanitize_text_field(wp_unslash($unit_border['top']['width'])) : '0px';
			$border_top_style = isset($unit_border['top']['style']) ? sanitize_text_field(wp_unslash($unit_border['top']['style'])) : 'solid';
			$border_top_color = isset($unit_border['top']['color']) ? sanitize_text_field(wp_unslash($unit_border['top']['color'])) : '#000000';
			$css .= "border-top: {$border_top_width} {$border_top_style} {$border_top_color};";
			$border_right_width = isset($unit_border['right']['width']) ? sanitize_text_field(wp_unslash($unit_border['right']['width'])) : '0px';
			$border_right_style = isset($unit_border['right']['style']) ? sanitize_text_field(wp_unslash($unit_border['right']['style'])) : 'solid';
			$border_right_color = isset($unit_border['right']['color']) ? sanitize_text_field(wp_unslash($unit_border['right']['color'])) : '#000000';
			$css .= "border-right: {$border_right_width} {$border_right_style} {$border_right_color};";
			$border_bottom_width = isset($unit_border['bottom']['width']) ? sanitize_text_field(wp_unslash($unit_border['bottom']['width'])) : '0px';
			$border_bottom_style = isset($unit_border['bottom']['style']) ? sanitize_text_field(wp_unslash($unit_border['bottom']['style'])) : 'solid';
			$border_bottom_color = isset($unit_border['bottom']['color']) ? sanitize_text_field(wp_unslash($unit_border['bottom']['color'])) : '#000000';
			$css .= "border-bottom: {$border_bottom_width} {$border_bottom_style} {$border_bottom_color};";
			$border_left_width = isset($unit_border['left']['width']) ? sanitize_text_field(wp_unslash($unit_border['left']['width'])) : '0px';
			$border_left_style = isset($unit_border['left']['style']) ? sanitize_text_field(wp_unslash($unit_border['left']['style'])) : 'solid';
			$border_left_color = isset($unit_border['left']['color']) ? sanitize_text_field(wp_unslash($unit_border['left']['color'])) : '#000000';
			$css .= "border-left: {$border_left_width} {$border_left_style} {$border_left_color};";
		}
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
	public function authpress_login_headerurl() {
		$url = isset($this->options['customizer']['redesign']['logo']['url']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['logo']['url'])) : '';
		return $url ? esc_url($url) : home_url();
	}	

}

new Authpress_Customizer_Redesign();