<?php
class Authpress_Customizer_Redesign_Background
{
	protected $options;

	public function __construct()
	{
		$this->options = authpress_get_option();
		add_action('login_enqueue_scripts', [$this, 'add_login_enqueue_scripts'], 20);
		add_action('login_footer', [$this, 'add_background_style'], 5);
		add_action('login_footer', [$this, 'add_video_background'], 10);
		add_action('login_footer', [$this, 'add_background_overlay'], 15);
		
	}
	public function add_login_enqueue_scripts()
	{
		if (
			isset($this->options['customizer']['redesign']['background']['type']) && 
			sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['type'])) === 'video' &&
			isset($this->options['customizer']['redesign']['background']['video'])
		) {
			wp_enqueue_style('jarallax.min', 'https://cdn.jsdelivr.net/npm/jarallax@2/dist/jarallax.min.css');
			wp_enqueue_script('jarallax.min', 'https://cdn.jsdelivr.net/npm/jarallax@2/dist/jarallax.min.js', array('jquery'), null, true);
			wp_enqueue_script('jarallax-video.min', 'https://cdn.jsdelivr.net/npm/jarallax@2/dist/jarallax-video.min.js', array('jquery'), null, true);
		}
	}
	public function add_video_background() {
		if (
			isset($this->options['customizer']['redesign']['background']['type']) && 
			sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['type'])) === 'video' &&
			isset($this->options['customizer']['redesign']['background']['video'])
		) {
			?>
			<div class="jarallax" data-jarallax data-video-src="https://youtu.be/mru3Q5m4lkY"></div>
			<style>
				.login .jarallax {
					height: 80vh;
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					z-index: -2;
				}
			</style>
			<?php
		}
	}
	public function add_background_overlay() {
		$overlay_color = isset($this->options['customizer']['redesign']['background']['overlay'])?sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['overlay'])):'';
		?>
		<div class="login-overlay"></div>
		<style>
			.login .login-overlay {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: <?php echo esc_html($overlay_color); ?>;
				z-index: -1;
			}
		</style>
		<?php
		
	}
	public function add_background_style() {
		$type = isset($this->options['customizer']['redesign']['background']['type'])?sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['type'])):'color';
		$color = isset($this->options['customizer']['redesign']['background']['background']['color'])?sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['color'])):'';
		$image = isset($this->options['customizer']['redesign']['background']['background']['image']['url'])?sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['image']['url'])):'';
		$position = isset($this->options['customizer']['redesign']['background']['background']['position'])?sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['position'])):'';
		$size = isset($this->options['customizer']['redesign']['background']['background']['size'])?sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['size'])):'';
		$repeat = isset($this->options['customizer']['redesign']['background']['background']['repeat'])?sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['repeat'])):'';
		$origin = isset($this->options['customizer']['redesign']['background']['background']['origin'])?sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['origin'])):'';
		$clip = isset($this->options['customizer']['redesign']['background']['background']['clip'])?sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['clip'])):'';
		$attachment = isset($this->options['customizer']['redesign']['background']['background']['attachment'])?sanitize_text_field(wp_unslash($this->options['customizer']['redesign']['background']['background']['attachment'])):'';
		?>
		<style>
			.login {
				<?php if($color): ?>
				background: <?php echo esc_html($color); ?>;
				<?php endif; ?>
				<?php if($image && $type == 'image'): ?>
				background-image: url('<?php echo esc_url($image); ?>');
				<?php endif; ?>
				<?php if($position): ?>
				background-position: <?php echo esc_html($position); ?>;
				<?php endif; ?>
				<?php if($size): ?>
				background-size: <?php echo esc_html($size); ?>;
				<?php endif; ?>
				<?php if($repeat): ?>
				background-repeat: <?php echo esc_html($repeat); ?>;
				<?php endif; ?>
				<?php if($origin): ?>
				background-origin: <?php echo esc_html($origin); ?>;
				<?php endif; ?>
				<?php if($clip): ?>
				background-clip: <?php echo esc_html($clip); ?>;
				<?php endif; ?>
				<?php if($attachment): ?>
				background-attachment: <?php echo esc_html($attachment); ?>;
				<?php endif; ?>
			}
		</style>
		<?php
	}
}

new Authpress_Customizer_Redesign_Background();
