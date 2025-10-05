<?php
class Authpress_Customizer_Redesign_Background {
	protected $options;

	public function __construct() {
		$this->options = authpress_get_option();

		add_action('login_enqueue_scripts', [$this, 'enqueue_login_assets'], 20);
	}

	public function enqueue_login_assets() {
		// Always enqueue WordPress login stylesheet as a handle target for inline CSS
		wp_enqueue_style('login');

		// Handle Jarallax scripts if video background
		if (
			isset($this->options['customizer']['redesign']['background']['type']) &&
			sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['type'])) === 'video' &&
			isset($this->options['customizer']['redesign']['background']['video'])
		) {
			wp_enqueue_style('jarallax.min', 'https://cdn.jsdelivr.net/npm/jarallax@2/dist/jarallax.min.css');
			wp_enqueue_script('jarallax.min', 'https://cdn.jsdelivr.net/npm/jarallax@2/dist/jarallax.min.js', ['jquery'], null, true);
			wp_enqueue_script('jarallax-video.min', 'https://cdn.jsdelivr.net/npm/jarallax@2/dist/jarallax-video.min.js', ['jquery'], null, true);
		}

		// Add background styles
		$this->add_background_style();

		// Add overlay style
		$this->add_background_overlay();

		// Add video background markup
		$this->add_video_background();
		// add_action('login_footer', [$this, 'add_video_background'], 10);
	}

	public function add_background_style() {
		$type       = isset($this->options['customizer']['redesign']['background']['type']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['type'])) : 'color';
		$color      = isset($this->options['customizer']['redesign']['background']['background']['color']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['color'])) : '';
		$image      = isset($this->options['customizer']['redesign']['background']['background']['image']['url']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['image']['url'])) : '';
		$position   = isset($this->options['customizer']['redesign']['background']['background']['position']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['position'])) : '';
		$size       = isset($this->options['customizer']['redesign']['background']['background']['size']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['size'])) : '';
		$repeat     = isset($this->options['customizer']['redesign']['background']['background']['repeat']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['repeat'])) : '';
		$origin     = isset($this->options['customizer']['redesign']['background']['background']['origin']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['origin'])) : '';
		$clip       = isset($this->options['customizer']['redesign']['background']['background']['clip']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['clip'])) : '';
		$attachment = isset($this->options['customizer']['redesign']['background']['background']['attachment']) ? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['attachment'])) : '';

		$css = ".login {";

		if ($color) {
			$css .= "background: {$color};";
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

		wp_add_inline_style('login', $css);
	}

	public function add_background_overlay() {
		$overlay_color = isset($this->options['customizer']['redesign']['background']['overlay'])
			? sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['overlay']))
			: '';

		if (!$overlay_color) {
			return;
		}

		$css = "
		.login .login-overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: {$overlay_color};
			z-index: -1;
		}";
		wp_add_inline_style('login', $css);

		add_action('login_footer', function () {
			echo '<div class="login-overlay"></div>';
		});
	}

	public function add_video_background() {
		if (
			isset($this->options['customizer']['redesign']['background']['type']) &&
			sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['type'])) === 'video' &&
			isset($this->options['customizer']['redesign']['background']['video'])
		) {
			$video = esc_url($this->options['customizer']['redesign']['background']['video'] ?? '');

			// Enqueue a base style handle to attach inline CSS
			wp_register_style('authpress-login-style', false); // no external CSS file
			wp_enqueue_style('authpress-login-style');

			// Add inline CSS
			$css = "
			.jarallax {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: -2;
			}";
			wp_add_inline_style('authpress-login-style', $css);

			// Output the video container markup
			add_action('login_footer', function() use ($video) {
				echo '<div class="jarallax" data-jarallax data-video-src="' . esc_url($video) . '"></div>';
			});
		}
	}

}

new Authpress_Customizer_Redesign_Background();
