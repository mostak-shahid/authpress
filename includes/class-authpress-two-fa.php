<?php
// class Authpress_Two_FA
// {
// 	protected $options;

// 	public function __construct()
// 	{
// 		$this->options = authpress_get_option();
// 		add_action('wp_head', [$this, 'get_footer_enqueue_styles'], 9999);
// 		// Hooks
// 		// add_action('show_user_profile', [$this, 'display_2fa_settings']);
// 		// add_action('edit_user_profile', [$this, 'display_2fa_settings']);
// 		// add_action('personal_options_update', [$this, 'save_2fa_settings']);
// 		// add_action('edit_user_profile_update', [$this, 'save_2fa_settings']);

// 		// Intercept the login process
// 		add_filter('authenticate', [$this, 'authpress_2fa_email_login'], 30, 3);
// 		// Display the 2FA verification form
// 		add_action('template_redirect', [$this, 'authpress_2fa_verification_page']);

// 		// //authpress_update_otp_code
// 		// add_action('wp_ajax_authpress_update_totp_otp_code', [$this, 'authpress_update_totp_otp_code']);
// 		// // add_action('wp_ajax_nopriv_authpress_update_totp_otp_code', [$this, 'authpress_update_totp_otp_code']);

// 		// add_action('wp_ajax_authpress_update_totp_secret_code', [$this, 'authpress_update_totp_secret_code']);
// 		// // add_action('wp_ajax_nopriv_authpress_update_totp_secret_code', [$this, 'authpress_update_totp_secret_code']);

// 		// add_action('wp_ajax_authpress_update_hotp_otp_code', [$this, 'authpress_update_hotp_otp_code']);
// 		// // add_action('wp_ajax_nopriv_authpress_update_hotp_otp_code', [$this, 'authpress_update_hotp_otp_code']);

// 		// add_action('wp_ajax_authpress_update_hotp_secret_code', [$this, 'authpress_update_hotp_secret_code']);
// 		// // add_action('wp_ajax_nopriv_authpress_update_hotp_secret_code', [$this, 'authpress_update_hotp_secret_code']);



// 		// add_action('wp_ajax_authpress_enable_encryption_database_keys', [$this, 'authpress_enable_encryption_database_keys']);
// 		// // add_action('wp_ajax_nopriv_authpress_enable_encryption_database_keys', [$this, 'authpress_enable_encryption_database_keys']);



// 		// add_action('wp_ajax_authpress_sent_otp_email', [$this, 'authpress_sent_otp_email']);
// 		// // add_action('wp_ajax_nopriv_authpress_sent_otp_email', [$this, 'authpress_sent_otp_email']);

// 		// add_action('wp_ajax_authpress_enable_otp_email', [$this, 'authpress_enable_otp_email']);
// 		// // add_action('wp_ajax_nopriv_authpress_enable_otp_email', [$this, 'authpress_enable_otp_email']);
// 		// add_action('wp_ajax_authpress_user_2fa_reset', [$this, 'authpress_user_2fa_reset']);


// 		// add_action('init', [$this, 'authpress_register_2fa_code_route']);
// 		// add_filter('query_vars', [$this, 'authpress_add_query_vars']);
// 		// add_filter('login_redirect', [$this, 'authpress_redirect_after_login_2fa'], 10, 3);
// 		// register_activation_hook(__FILE__, [$this, 'authpress_flush_rewrite_rules']);
// 	}
//     public function get_footer_enqueue_styles()
//     {
//         $request_uri = isset($_SERVER['REQUEST_URI']) ? sanitize_text_field(wp_unslash($_SERVER['REQUEST_URI'])) : '';
//         if (strpos($request_uri, '/authpress-2fa-verification') !== false) {
//             // Core WP styles - use URL helpers instead of ABSPATH.
//             wp_enqueue_style(
//                 'dashicons',
//                 includes_url('css/dashicons.css'),
//                 array(),
//                 AUTHPRESS_VERSION,
//                 'all'
//             );

//             wp_enqueue_style(
//                 'buttons',
//                 includes_url('css/buttons.css'),
//                 array(),
//                 AUTHPRESS_VERSION,
//                 'all'
//             );

//             wp_enqueue_style(
//                 'forms',
//                 admin_url('css/forms.css'),
//                 array(),
//                 AUTHPRESS_VERSION,
//                 'all'
//             );

//             wp_enqueue_style(
//                 'l10n',
//                 admin_url('css/l10n.css'),
//                 array(),
//                 AUTHPRESS_VERSION,
//                 'all'
//             );

//             wp_enqueue_style(
//                 'login',
//                 admin_url('css/login.css'),
//                 array(),
//                 AUTHPRESS_VERSION,
//                 'all'
//             );

//         }
//     }
// 	// // Display 2FA settings in the user profile
// 	// public function display_2fa_settings($user)
// 	// {
// 	// 	$get_totp_otp_code = $this->authpress_get_totp_otp_code($user->ID);
// 	// 	$totp_secret = isset($get_totp_otp_code['totp_secret']) ? $get_totp_otp_code['totp_secret'] : 0;
// 	// 	$totp_current_code = isset($get_totp_otp_code['totp_code']) ? $get_totp_otp_code['totp_code'] : 0;
// 	// 	$totp_qr_code_uri = isset($get_totp_otp_code['totp_qr_code']) ? $get_totp_otp_code['totp_qr_code'] : '#';

// 	// 	$time_now = time();
// 	// 	$refresh_after = 30 - ($time_now % 30);

// 	// 	// Retrieve or initialize the secret	
// 	// 	$get_hotp_otp_code = $this->authpress_get_hotp_otp_code($user->ID);
// 	// 	$hotp_secret = isset($get_hotp_otp_code['hotp_secret']) ? $get_hotp_otp_code['hotp_secret'] : 0;
// 	// 	$hotp_current_code = isset($get_hotp_otp_code['hotp_code']) ? $get_hotp_otp_code['hotp_code'] : 0;
// 	// 	$hotp_qr_code_uri = isset($get_hotp_otp_code['hotp_qr_code']) ? $get_hotp_otp_code['hotp_qr_code'] : '#';

// 	// 	require_once ULTIMATE_SECURITY_PATH . 'templates/admin/authpress-admin-display-2fa.php';
// 	// }
// 	// // Save 2FA settings when the user profile is updated
// 	// public function save_2fa_settings($user_id)
// 	// {
// 	// 	if (
// 	// 		isset($_POST['_wpnonce'])
// 	// 		&& wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['_wpnonce'])), 'update-user_' . $user_id)
// 	// 	) {
// 	// 		$authpress_2fa_provider = isset($_POST['authpress-2fa-provider'])
// 	// 			? sanitize_text_field(wp_unslash($_POST['authpress-2fa-provider']))
// 	// 			: '';

// 	// 		if ($authpress_2fa_provider) {
// 	// 			update_user_meta($user_id, 'authpress-2fa-provider', $authpress_2fa_provider);

// 	// 			// Save the current date/time in UTC (ISO 8601 format)
// 	// 			$timestamp = gmdate('c');
// 	// 			update_user_meta($user_id, 'authpress-2fa-updated-at', $timestamp);
// 	// 		}
// 	// 	}
// 	// }

// 	public function authpress_2fa_email_login($user, $username, $password)
// 	{
// 		if (is_wp_error($user)) {
// 			return $user;
// 		}

// 		$authpress_user_2fa_status = $this->authpress_user_2fa_status($user->ID);

// 		// ✅ Only proceed if 2FA is required and this is not a trusted device
// 		if ($authpress_user_2fa_status && !isset($_COOKIE['authpress_trusted_device_for_' . $user->ID])) {

// 			// Set both transients with the same expiration time (15 minutes should be enough)
// 			set_transient('authpress_2fa_user_id', $user->ID, 15 * MINUTE_IN_SECONDS);
// 			set_transient('authpress_2fa_user_id_' . $user->ID, true, 15 * MINUTE_IN_SECONDS);

// 			if ($authpress_user_2fa_status === 'email') {
// 				$verification_code = wp_rand(100000, 999999);
// 				update_user_meta($user->ID, 'authpress_2fa_code', $verification_code);
// 				update_user_meta($user->ID, 'authpress_2fa_pending', true);

// 				wp_mail(
// 					$user->user_email,
// 					__('Your 2FA Verification Code', 'authpress'),
// 					sprintf(
// 						__('Your verification code is: %s', 'authpress'),
// 						$verification_code
// 					)
// 				);

// 			} elseif ($authpress_user_2fa_status === 'totp' || $authpress_user_2fa_status === 'hotp') {
// 				update_user_meta($user->ID, 'authpress_2fa_pending', true);
// 			}
// 		}

// 		return $user;
// 	}

// 	public function authpress_2fa_verification_page()
// 	{
// 		$request_uri = isset($_SERVER['REQUEST_URI']) ? sanitize_text_field(wp_unslash($_SERVER['REQUEST_URI'])) : '';

// 		if (strpos($request_uri, '/authpress-2fa-verification') !== false) {
// 			$user_id = get_transient('authpress_2fa_user_id');
// 			$user = get_userdata($user_id);

// 			if (!$user_id || !get_user_meta($user_id, 'authpress_2fa_pending', true)) {
// 				wp_safe_redirect(home_url('/wp-login.php'));
// 				exit;
// 			}

// 			// Initialize error variable
// 			$GLOBALS['otp_error'] = '';

// 			// Handle form submission
// 			if (
// 				// $_SERVER['REQUEST_METHOD'] === 'POST' &&
// 				isset($_POST['authpress_login_form_field']) &&
// 				wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['authpress_login_form_field'])), 'authpress_login_form_action')
// 			) {

// 				if (isset($_POST['authpress_2fa_code']) && !empty($_POST['authpress_2fa_code'])) {
// 					$entered_code = intval(sanitize_text_field(wp_unslash($_POST['authpress_2fa_code'])));
// 					$authpress_user_2fa_status = $this->authpress_user_2fa_status($user_id);
// 					$authpress_user_2fa_verify = false;

// 					if ($authpress_user_2fa_status === 'email') {
// 						$stored_code = get_user_meta($user_id, 'authpress_2fa_code', true);
// 						if (intval($stored_code) === $entered_code) {
// 							// Set trusted device cookie
// 							$options = Utils::authpress_get_option();
// 							$allow_days = isset($options['security']['2fa_authentication']['email_authentication']['2fa_email_verification_allow_grace_period'])
// 								? (int) $options['security']['2fa_authentication']['email_authentication']['2fa_email_verification_allow_grace_period']
// 								: 1;
// 							setcookie("authpress_trusted_device_for_{$user_id}", 1, time() + (86400 * $allow_days), "/");
// 							$authpress_user_2fa_verify = true;
// 						}
// 					} elseif ($authpress_user_2fa_status === 'totp') {
// 						$otp_data = $this->authpress_get_totp_otp_code($user_id);
// 						if ($otp_data && intval($otp_data['totp_code']) === $entered_code) {
// 							$authpress_user_2fa_verify = true;
// 						}
// 					} elseif ($authpress_user_2fa_status === 'hotp') {
// 						$otp_data = $this->authpress_get_hotp_otp_code($user_id);
// 						if ($otp_data && intval($otp_data['hotp_code']) === $entered_code) {
// 							$authpress_user_2fa_verify = true;
// 							$counter = get_user_meta($user_id, 'authpress_2fa_hotp_counter', true);
// 							update_user_meta($user_id, 'authpress_2fa_hotp_counter', intval($counter) + 1);
// 						}
// 					}

// 					if ($authpress_user_2fa_verify) {
// 						// Finalize login
// 						delete_user_meta($user_id, 'authpress_2fa_code');
// 						delete_user_meta($user_id, 'authpress_2fa_pending');
// 						delete_transient('authpress_2fa_user_id');
// 						delete_transient('authpress_2fa_user_id_' . $user_id);

// 						wp_set_auth_cookie($user_id);
// 						wp_set_current_user($user_id);
// 						do_action('wp_login', $user->user_login, $user);
// 						wp_safe_redirect(admin_url());
// 						exit;
// 					} else {
// 						$GLOBALS['otp_error'] = __('Invalid verification code. Please try again.', 'authpress');
// 					}
// 				} else {
// 					$GLOBALS['otp_error'] = __('Please enter a verification code.', 'authpress');
// 				}
// 			}

// 			// Display the verification form
// 			require_once ULTIMATE_SECURITY_PATH . 'templates/public/authpress-public-display-otp.php';
// 			exit;
// 		}
// 	}
	
// 	// public function authpress_redirect_after_login_2fa($redirect_to, $requested_redirect_to, $user)
// 	// {

// 	// 	// Check if user is pending 2FA via user-specific transient
// 	// 	if (!is_wp_error($user) && get_transient('authpress_2fa_user_id_' . $user->ID)) {
// 	// 		return home_url('/authpress-2fa-verification');
// 	// 	}

// 	// 	return $redirect_to;
// 	// }


// 	// public function authpress_get_totp_otp_code($user_id)
// 	// {
// 	// 	$user = get_userdata($user_id);
// 	// 	if ($user !== false) {
// 	// 		$authpress_enable_encryption_database_keys = get_option('authpress-enable-encryption-database-keys', 0);

// 	// 		$totp_secret = get_user_meta($user_id, 'authpress_2fa_totp_secret', true);

// 	// 		if (!$totp_secret) {
// 	// 			$totp = TOTP::create();
// 	// 			$raw_totp_secret = $totp->getSecret();

// 	// 			if ($authpress_enable_encryption_database_keys) {
// 	// 				$totp_secret = $this->authpress_openssl_encrypt($raw_totp_secret);
// 	// 			} else {
// 	// 				$totp_secret = $raw_totp_secret;
// 	// 			}

// 	// 			update_user_meta($user_id, 'authpress_2fa_totp_secret', $totp_secret);
// 	// 		}

// 	// 		$original_totp_secret = $authpress_enable_encryption_database_keys
// 	// 			? $this->authpress_openssl_decrypt($totp_secret)
// 	// 			: $totp_secret;

// 	// 		if ($original_totp_secret === false) {
// 	// 			// handle decrypt failure — force re-enroll or return an error
// 	// 			return false;
// 	// 		}

// 	// 		$totp = TOTP::create($original_totp_secret);
// 	// 		$totp->setLabel($user->user_login);
// 	// 		$totp->setIssuer(get_bloginfo('name'));

// 	// 		$totp_qr_code_uri = sprintf(
// 	// 			'https://api.qrserver.com/v1/create-qr-code/?data=%s&size=200x200',
// 	// 			urlencode($totp->getProvisioningUri())
// 	// 		);

// 	// 		$totp_current_code = $totp->now(); // Get current code
// 	// 		return [
// 	// 			'totp_secret' => esc_html($original_totp_secret),
// 	// 			'totp_code' => esc_html($totp_current_code),
// 	// 			'totp_qr_code' => esc_url($totp_qr_code_uri),
// 	// 		];
// 	// 	}
// 	// 	return false;
// 	// }

// 	// public function authpress_update_totp_otp_code()
// 	// {
// 	// 	if (isset($_POST['security']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['security'])), 'authpress_nonce')) {
// 	// 		$user_id = isset($_POST['user_id']) ? sanitize_text_field(wp_unslash($_POST['user_id'])) : 0;

// 	// 		$get_totp_otp_code = $this->authpress_get_totp_otp_code($user_id);

// 	// 		if (isset($get_totp_otp_code['totp_code'])) {
// 	// 			wp_send_json_success(array('current_code' => esc_html($get_totp_otp_code['totp_code'])));
// 	// 		} else {
// 	// 			wp_send_json_error(array('error_message' => esc_html__('User not found', 'authpress')));
// 	// 		}
// 	// 	} else {
// 	// 		wp_send_json_error(array('error_message' => esc_html__('Nonce verification failed. Please try again.', 'authpress')));
// 	// 	}
// 	// 	wp_die();
// 	// }
// 	// public function authpress_update_totp_secret_code()
// 	// {
// 	// 	if (isset($_POST['security']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['security'])), 'authpress_nonce')) {
// 	// 		$user_id = isset($_POST['user_id']) ? sanitize_text_field(wp_unslash($_POST['user_id'])) : 0;
// 	// 		if ($user_id) {
// 	// 			$user = get_userdata($user_id);
// 	// 			if ($user !== false) {
// 	// 				delete_user_meta($user_id, 'authpress_2fa_totp_secret');
// 	// 				$get_totp_otp_code = $this->authpress_get_totp_otp_code($user_id);
// 	// 				wp_send_json_success($get_totp_otp_code);
// 	// 			} else {
// 	// 				wp_send_json_error(array('error_message' => esc_html__('User not found', 'authpress')));
// 	// 			}
// 	// 		} else {
// 	// 			wp_send_json_error(array('error_message' => esc_html__('User ID missing', 'authpress')));
// 	// 		}
// 	// 	} else {
// 	// 		wp_send_json_error(array('error_message' => esc_html__('Nonce verification failed. Please try again.', 'authpress')));
// 	// 	}

// 	// 	wp_die();
// 	// }

// 	// public function authpress_get_hotp_otp_code($user_id)
// 	// {
// 	// 	$user = get_userdata($user_id);
// 	// 	if ($user !== false) {
// 	// 		// Encryption key (use a secure, random key in production)
// 	// 		$key = "authpress-secret_key"; // Should be 256-bit for AES-256 encryption
// 	// 		$ivLength = openssl_cipher_iv_length('AES-256-CBC');
// 	// 		$iv = openssl_random_pseudo_bytes($ivLength);
// 	// 		$authpress_enable_encryption_database_keys = get_option('authpress-enable-encryption-database-keys', 0);
// 	// 		$hotp_secret = get_user_meta($user->ID, 'authpress_2fa_hotp_secret', true);
// 	// 		if (!$hotp_secret) {
// 	// 			$hotp = HOTP::create();

// 	// 			$raw_hotp_secret = $hotp->getSecret();
// 	// 			$hotp_secret = $authpress_enable_encryption_database_keys ? $this->authpress_openssl_encrypt($raw_hotp_secret, $key, $iv) : $raw_hotp_secret;
// 	// 			update_user_meta($user->ID, 'authpress_2fa_hotp_secret', $hotp_secret);
// 	// 		}
// 	// 		// Retrieve or initialize the counter	
// 	// 		$hotp_counter = get_user_meta($user->ID, 'authpress_2fa_hotp_counter', true);
// 	// 		if (!$hotp_counter) {
// 	// 			$hotp_counter = 1;
// 	// 			update_user_meta($user->ID, 'authpress_2fa_hotp_counter', $hotp_counter);
// 	// 		}
// 	// 		// Create the HOTP object	
// 	// 		$original_hotp_secret = $authpress_enable_encryption_database_keys ? $this->authpress_openssl_decrypt($hotp_secret, $key, $iv) : $hotp_secret;
// 	// 		$hotp = HOTP::create($original_hotp_secret);
// 	// 		$hotp->setLabel($user->user_login); // Set a unique label	
// 	// 		$hotp->setIssuer(get_bloginfo('name')); // Optional: Set the issuer for better organization in apps
// 	// 		$hotp->setCounter($hotp_counter);
// 	// 		// Generate the current OTP code
// 	// 		$hotp_current_code = $hotp->at($hotp_counter);
// 	// 		// Generate the QR code URL
// 	// 		$hotp_qr_code_uri = sprintf(
// 	// 			'https://api.qrserver.com/v1/create-qr-code/?data=%s&size=200x200',
// 	// 			urlencode($hotp->getProvisioningUri())
// 	// 		);
// 	// 		return [
// 	// 			'hotp_secret' => esc_html($hotp_secret),
// 	// 			'hotp_code' => esc_html($hotp_current_code),
// 	// 			'hotp_qr_code' => esc_url($hotp_qr_code_uri),
// 	// 		];
// 	// 	}
// 	// }
// 	// public function authpress_update_hotp_otp_code()
// 	// {
// 	// 	if (isset($_POST['security']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['security'])), 'authpress_nonce')) {
// 	// 		$user_id = isset($_POST['user_id']) ? sanitize_text_field(wp_unslash($_POST['user_id'])) : 0;

// 	// 		$get_hotp_otp_code = $this->authpress_get_hotp_otp_code($user_id);

// 	// 		if (isset($get_hotp_otp_code['hotp_code'])) {
// 	// 			wp_send_json_success(array('current_code' => esc_html($get_hotp_otp_code['hotp_code'])));
// 	// 		} else {
// 	// 			wp_send_json_error(array('error_message' => esc_html__('User not found', 'authpress')));
// 	// 		}
// 	// 	} else {
// 	// 		wp_send_json_error(array('error_message' => esc_html__('Nonce verification failed. Please try again.', 'authpress')));
// 	// 	}
// 	// 	wp_die();
// 	// }
// 	// public function authpress_update_hotp_secret_code()
// 	// {
// 	// 	if (isset($_POST['security']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['security'])), 'authpress_nonce')) {
// 	// 		$user_id = isset($_POST['user_id']) ? sanitize_text_field(wp_unslash($_POST['user_id'])) : 0;
// 	// 		if ($user_id) {
// 	// 			$user = get_userdata($user_id);
// 	// 			if ($user !== false) {
// 	// 				delete_user_meta($user_id, 'authpress_2fa_hotp_secret');
// 	// 				delete_user_meta($user->ID, 'authpress_2fa_hotp_counter');
// 	// 				$get_hotp_otp_code = $this->authpress_get_hotp_otp_code($user_id);
// 	// 				wp_send_json_success($get_hotp_otp_code);
// 	// 			} else {
// 	// 				wp_send_json_error(array('error_message' => esc_html__('User not found', 'authpress')));
// 	// 			}
// 	// 		} else {
// 	// 			wp_send_json_error(array('error_message' => esc_html__('User ID missing', 'authpress')));
// 	// 		}
// 	// 	} else {
// 	// 		wp_send_json_error(array('error_message' => esc_html__('Nonce verification failed. Please try again.', 'authpress')));
// 	// 	}

// 	// 	wp_die();
// 	// }
// 	// public function authpress_user_2fa_status($user_id)
// 	// {
// 	// 	$user = get_userdata($user_id);
// 	// 	$authpress_options = Utils::authpress_get_option();
// 	// 	$selected_2fa_provider = get_user_meta($user->ID, 'authpress-2fa-provider', true) ? get_user_meta($user->ID, 'authpress-2fa-provider', true) : '';
// 	// 	$enable_email_verification = isset($authpress_options['security']['2fa_authentication']['email_authentication']['2fa_email_verification_enable']) ? sanitize_text_field(wp_unslash($authpress_options['security']['2fa_authentication']['email_authentication']['2fa_email_verification_enable'])) : 0;
// 	// 	$enable_application_authentication = isset($authpress_options['security']['2fa_authentication']['application_authentication']['2fa_application_authentication_enable']) ? sanitize_text_field(wp_unslash($authpress_options['security']['2fa_authentication']['application_authentication']['2fa_application_authentication_enable'])) : 0;
// 	// 	// if ($enable_2fa) {
// 	// 	if ($selected_2fa_provider) {
// 	// 		if ($selected_2fa_provider == 'Email' && $enable_email_verification) {
// 	// 			$email_verification_enable_for = isset($authpress_options['security']['2fa_authentication']['email_authentication']['2fa_email_verification_enable_for'])
// 	// 				? wp_unslash($authpress_options['security']['2fa_authentication']['email_authentication']['2fa_email_verification_enable_for'])
// 	// 				: [];

// 	// 			$email_verification_enable_for_arr = $allowed_user_roles = [];

// 	// 			if ($email_verification_enable_for) {
// 	// 				$email_verification_enable_for_arr = $authpress_options['security']['2fa_authentication']['email_authentication']['2fa_email_verification_enable_for'];
// 	// 				foreach ($email_verification_enable_for_arr as $k => $v) {
// 	// 					$allowed_user_roles[] = $v['code'];
// 	// 				}
// 	// 			}
// 	// 			$email_allowed_user_roles = array_intersect($allowed_user_roles, $user->roles);
// 	// 			$authpress_enable_email_authentication = get_user_meta($user->ID, 'authpress_enable_email_authentication', true);
// 	// 			if (sizeof($email_allowed_user_roles) && $authpress_enable_email_authentication)
// 	// 				return 'email';
// 	// 			return false;
// 	// 		} else if ($selected_2fa_provider == 'Authenticator Application' && $enable_application_authentication) {
// 	// 			// security[2fa_authentication][2fa_application_authentication_enable_for]
// 	// 			$application_authentication_enable_for = isset($authpress_options['security']['2fa_authentication']['application_authentication']['2fa_application_authentication_enable_for'])
// 	// 				? wp_unslash($authpress_options['security']['2fa_authentication']['application_authentication']['2fa_application_authentication_enable_for'])
// 	// 				: [];

// 	// 			$application_authentication_type = isset($authpress_options['security']['2fa_authentication']['application_authentication']['2fa_application_authentication_type']) ? sanitize_text_field(wp_unslash($authpress_options['security']['2fa_authentication']['application_authentication']['2fa_application_authentication_type'])) : 'TOTP';

// 	// 			$application_authentication_enable_for_arr = $application_allowed_user_roles = [];

// 	// 			if ($application_authentication_enable_for) {
// 	// 				$application_authentication_enable_for_arr = $authpress_options['security']['2fa_authentication']['application_authentication']['2fa_application_authentication_enable_for'];
// 	// 				foreach ($application_authentication_enable_for_arr as $k => $v) {
// 	// 					$application_allowed_user_roles[] = $v['code'];
// 	// 				}
// 	// 			}
// 	// 			$application_allowed_user_roles = array_intersect($application_allowed_user_roles, $user->roles);
// 	// 			if (sizeof($application_allowed_user_roles)) {
// 	// 				$totp_secret = get_user_meta($user->ID, 'authpress_2fa_totp_secret', true);
// 	// 				$hotp_secret = get_user_meta($user_id, 'authpress_2fa_hotp_secret', true);
// 	// 				$hotp_counter = get_user_meta($user_id, 'authpress_2fa_hotp_counter', true);
// 	// 				if ($application_authentication_type == 'TOTP' && $totp_secret) {
// 	// 					return 'totp';
// 	// 				} else if ($application_authentication_type == 'HOTP' && $hotp_secret && $hotp_counter) {
// 	// 					return 'hotp';
// 	// 				}
// 	// 				return false;
// 	// 			}
// 	// 			return false;
// 	// 		}
// 	// 		return false;
// 	// 	}
// 	// 	return false;

// 	// }
// 	// public function authpress_enable_encryption_database_keys()
// 	// {
// 	// 	if (isset($_POST['security']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['security'])), 'authpress_nonce')) {

// 	// 		// Encryption key (use a secure, random key in production)
// 	// 		$key = "authpress-secret_key"; // Should be 256-bit for AES-256 encryption
// 	// 		$ivLength = openssl_cipher_iv_length('AES-256-CBC');
// 	// 		$iv = openssl_random_pseudo_bytes($ivLength);


// 	// 		global $wpdb;
// 	// 		$meta_key_totp = 'authpress_2fa_totp_secret';
// 	// 		$meta_key_hotp = 'authpress_2fa_hotp_secret';
// 	// 		// Query the wp_usermeta table to find all users with the specific meta key.
// 	// 		$users_with_meta = $wpdb->get_results(
// 	// 			$wpdb->prepare(
// 	// 				"SELECT user_id, meta_key, meta_value FROM {$wpdb->usermeta} WHERE meta_key = %s OR meta_key = %s",
// 	// 				$meta_key_totp,
// 	// 				$meta_key_hotp
// 	// 			)
// 	// 		);

// 	// 		// Loop through the results and update the meta values.
// 	// 		if (!empty($users_with_meta)) {
// 	// 			foreach ($users_with_meta as $user_meta) {
// 	// 				$user_id = $user_meta->user_id;
// 	// 				$meta_key = $user_meta->meta_key;
// 	// 				$old_meta_value = $user_meta->meta_value;

// 	// 				// Modify the old meta value (example: append some text).
// 	// 				$new_meta_value = $this->authpress_openssl_encrypt($old_meta_value, $key, $iv);
// 	// 				// Update the meta value in the database.
// 	// 				update_user_meta($user_id, $meta_key, $new_meta_value);
// 	// 			}
// 	// 		}

// 	// 		update_option('authpress-enable-encryption-database-keys', 1);

// 	// 		wp_send_json_success();
// 	// 	} else {
// 	// 		wp_send_json_error(array('error_message' => esc_html__('Nonce verification failed. Please try again.', 'authpress')));
// 	// 	}

// 	// 	wp_die();
// 	// }
// 	// public function authpress_register_2fa_code_route()
// 	// {
// 	// 	add_rewrite_rule(
// 	// 		'^authpress-2fa-verification/?$', // URL structure
// 	// 		'index.php?authpress_2fa_code=1', // Query var for internal handling
// 	// 		'top' // Priority
// 	// 	);
// 	// }

// 	// public function authpress_add_query_vars($query_vars)
// 	// {
// 	// 	$query_vars[] = 'authpress_2fa_code';
// 	// 	return $query_vars;
// 	// }

// 	// public function authpress_flush_rewrite_rules()
// 	// {
// 	// 	$this->authpress_register_2fa_code_route(); // Register the rewrite rule
// 	// 	flush_rewrite_rules(); // Flush the rules
// 	// }


// 	// public function authpress_sent_otp_email()
// 	// {
// 	// 	$authpress_options = Utils::authpress_get_option();

// 	// 	if (
// 	// 		isset($_POST['security']) &&
// 	// 		wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['security'])), 'authpress_nonce')
// 	// 	) {
// 	// 		$id = isset($_POST['id']) ? intval($_POST['id']) : 0;

// 	// 		if (
// 	// 			!empty($authpress_options['security']['2fa_authentication']['email_authentication']['2fa_email_verification_enable'])
// 	// 		) {
// 	// 			if ($id) {
// 	// 				$user = get_user_by('id', $id);
// 	// 				if (!$user) {
// 	// 					wp_send_json_error(['error_message' => esc_html__('User not found', 'authpress')]);
// 	// 				}

// 	// 				$authpress_enable_email_authentication = get_user_meta($user->ID, 'authpress_enable_email_authentication', true);

// 	// 				if ($authpress_enable_email_authentication) {
// 	// 					wp_send_json_error(['error_message' => esc_html__('Email authentication already activated', 'authpress')]);
// 	// 				}

// 	// 				// Fetch and decode allowed roles
// 	// 				$allowed_user_roles = [];
// 	// 				$roles_setting = $authpress_options['security']['2fa_authentication']['email_authentication']['2fa_email_verification_enable_for'] ?? [];

// 	// 				if (is_array($roles_setting)) {
// 	// 					foreach ($roles_setting as $role_item) {
// 	// 						if (!empty($role_item['code'])) {
// 	// 							$allowed_user_roles[] = $role_item['code'];
// 	// 						}
// 	// 					}
// 	// 				}


// 	// 				// Check if user role is allowed
// 	// 				$is_allowed = empty($allowed_user_roles) || array_intersect($allowed_user_roles, $user->roles);

// 	// 				if ($is_allowed) {
// 	// 					$verification_code = wp_rand(100000, 999999);

// 	// 					// Save and send the code
// 	// 					update_user_meta($user->ID, 'authpress_2fa_code', $verification_code);
// 	// 					wp_mail(
// 	// 						$user->user_email,
// 	// 						esc_html__('Your 2FA Verification Code', 'authpress'),
// 	// 						// esc_html__("Your verification code is: $verification_code", 'authpress'),
// 	// 						sprintf(
// 	// 							esc_html__('Your verification code is: %1$s', 'authpress'),
// 	// 							$verification_code
// 	// 						)
// 	// 					);

// 	// 					wp_send_json_success([
// 	// 						'success_message' => esc_html__('Email Sent', 'authpress'),
// 	// 						'verification_code' => esc_html($verification_code), // ← This comma causes the syntax error
// 	// 					]);
// 	// 				} else {
// 	// 					wp_send_json_error(['error_message' => esc_html__('You are not allowed for this action', 'authpress')]);
// 	// 				}
// 	// 			} else {
// 	// 				wp_send_json_error(['error_message' => esc_html__('User not found', 'authpress')]);
// 	// 			}
// 	// 		} else {
// 	// 			wp_send_json_error(['error_message' => esc_html__('Email verification is not activated', 'authpress')]);
// 	// 		}
// 	// 	} else {
// 	// 		wp_send_json_error(['error_message' => esc_html__('Nonce verification failed. Please try again.', 'authpress')]);
// 	// 	}
// 	// }


// 	// public function authpress_enable_otp_email()
// 	// {
// 	// 	$authpress_options = Utils::authpress_get_option();

// 	// 	if (isset($_POST['security']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['security'])), 'authpress_nonce')) {
// 	// 		$id = isset($_POST['id']) ? sanitize_text_field(wp_unslash($_POST['id'])) : 0;
// 	// 		$value = isset($_POST['value']) ? sanitize_text_field(wp_unslash($_POST['value'])) : 0;
// 	// 		if (

// 	// 			isset($authpress_options['security']['2fa_authentication']['email_authentication']['2fa_email_verification_enable']) &&
// 	// 			sanitize_text_field(wp_unslash($authpress_options['security']['2fa_authentication']['email_authentication']['2fa_email_verification_enable']))
// 	// 		) {
// 	// 			if ($id) {
// 	// 				$user = get_user_by('id', $id);
// 	// 				$authpress_2fa_code = get_user_meta($user->ID, 'authpress_2fa_code', true);
// 	// 				$authpress_enable_email_authentication = get_user_meta($user->ID, 'authpress_enable_email_authentication', true);
// 	// 				if ($authpress_2fa_code == $value && !$authpress_enable_email_authentication) {
// 	// 					delete_user_meta($user->ID, 'authpress_2fa_code');
// 	// 					update_user_meta($user->ID, 'authpress_enable_email_authentication', 1);
// 	// 					wp_send_json_success(array(
// 	// 						'success_message' => esc_html__('Email authentication is enabled', 'authpress'),
// 	// 					));
// 	// 				} else {
// 	// 					wp_send_json_error(array('error_message' => esc_html__('Wrong varification code', 'authpress')));
// 	// 				}
// 	// 			} else {
// 	// 				wp_send_json_error(array('error_message' => esc_html__('User not found', 'authpress')));
// 	// 			}
// 	// 		} else {
// 	// 			wp_send_json_error(array('error_message' => esc_html__('Email varification is not activated', 'authpress')));
// 	// 		}
// 	// 	} else {
// 	// 		wp_send_json_error(array('error_message' => esc_html__('Nonce verification failed. Please try again.', 'authpress')));
// 	// 	}
// 	// }

// 	// public function authpress_user_2fa_reset()
// 	// {
// 	// 	if (isset($_POST['security']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['security'])), 'authpress_nonce')) {
// 	// 		$user_id = isset($_POST['user_id']) ? sanitize_text_field(wp_unslash($_POST['user_id'])) : 0;
// 	// 		if ($user_id) {
// 	// 			$user = get_user_by('id', $user_id);
// 	// 			if ($user) {
// 	// 				delete_user_meta($user->ID, 'authpress_enable_email_authentication');
// 	// 				delete_user_meta($user->ID, 'authpress-2fa-provider');
// 	// 				delete_user_meta($user->ID, 'authpress-2fa-updated-at');
// 	// 				delete_user_meta($user->ID, 'authpress_2fa_code');
// 	// 				delete_user_meta($user->ID, 'authpress_2fa_pending');

// 	// 				wp_send_json_success(array(
// 	// 					'success_message' => esc_html__('Reset 2FA Method successfully', 'authpress'),
// 	// 				));
// 	// 			} else {
// 	// 				wp_send_json_error(array(
// 	// 					'error_message' => esc_html__('Invalid user. Please try again.', 'authpress'),
// 	// 				));
// 	// 			}

// 	// 		} else {
// 	// 			wp_send_json_error(array('error_message' => esc_html__('User ID can\'t be zero. Please try again.', 'authpress')));
// 	// 		}
// 	// 	} else {
// 	// 		wp_send_json_error(array('error_message' => esc_html__('Nonce verification failed. Please try again.', 'authpress')));
// 	// 	}
// 	// }

// 	// public function authpress_get_encryption_key()
// 	// {
// 	// 	// Try option first (stored base64)
// 	// 	$stored = get_option('authpress_encryption_key', '');
// 	// 	if (!empty($stored)) {
// 	// 		$key = base64_decode($stored, true);
// 	// 		if ($key !== false && strlen($key) === 32) {
// 	// 			return $key;
// 	// 		}
// 	// 		// Bad stored value: fall through to regenerate
// 	// 	}

// 	// 	// Prefer deriving from salts if available (not hardcoded)
// 	// 	if (defined('AUTH_KEY') && defined('SECURE_AUTH_KEY')) {
// 	// 		// produce raw 32 bytes
// 	// 		$key = hash('sha256', AUTH_KEY . SECURE_AUTH_KEY, true);
// 	// 	} else {
// 	// 		// fallback: create a random 256-bit key
// 	// 		$key = random_bytes(32);
// 	// 	}

// 	// 	// Store base64 encoded key in DB (autoload = false to reduce exposure)
// 	// 	update_option('authpress_encryption_key', base64_encode($key), false);

// 	// 	return $key;
// 	// }
// 	// public function authpress_openssl_encrypt($data)
// 	// {
// 	// 	$cipher = 'AES-256-CBC';
// 	// 	$key = $this->authpress_get_encryption_key(); // raw binary
// 	// 	$ivLen = openssl_cipher_iv_length($cipher);
// 	// 	$iv = random_bytes($ivLen);
// 	// 	// Use OPENSSL_RAW_DATA to get raw binary ciphertext
// 	// 	$ciphertext = openssl_encrypt($data, $cipher, $key, OPENSSL_RAW_DATA, $iv);
// 	// 	if ($ciphertext === false) {
// 	// 		return false;
// 	// 	}
// 	// 	// Prepend IV, then base64 encode everything
// 	// 	return base64_encode($iv . $ciphertext);
// 	// }
// 	// public function authpress_openssl_decrypt($encryptedBase64)
// 	// {
// 	// 	$cipher = 'AES-256-CBC';
// 	// 	$key = $this->authpress_get_encryption_key(); // raw binary
// 	// 	$raw = base64_decode($encryptedBase64, true);
// 	// 	if ($raw === false) {
// 	// 		return false;
// 	// 	}
// 	// 	$ivLen = openssl_cipher_iv_length($cipher);
// 	// 	if (strlen($raw) <= $ivLen) {
// 	// 		return false;
// 	// 	}
// 	// 	$iv = substr($raw, 0, $ivLen);
// 	// 	$ciphertext = substr($raw, $ivLen);
// 	// 	$plaintext = openssl_decrypt($ciphertext, $cipher, $key, OPENSSL_RAW_DATA, $iv);
// 	// 	return $plaintext === false ? false : $plaintext;
// 	// }
// }

// new Authpress_Two_FA();


if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Authpress_Two_FA {
	private $options;
	// config
	private $transient_prefix = 'authpress_2fa_';
	private $attempt_meta_key = 'authpress_2fa_attempts';
	private $cookie_name = 'authpress_2fa_pending';
	private $code_ttl = 300; // seconds (5 minutes)
	private $max_attempts = 5;
	private $bypass_admins = false; // set false to require 2FA for admins

	public function __construct() {
		$this->options = authpress_get_option();
		$two_fa_authentication_settings_enabled = (
				isset($this->options['two_fa_authentication']['settings']['enabled']) &&
				!empty($this->options['two_fa_authentication']['settings']['enabled'])
			) ? sanitize_text_field(wp_unslash($this->options['two_fa_authentication']['settings']['enabled'])) : false;
		
		if ($two_fa_authentication_settings_enabled) {		
			add_action( 'wp_login', [ $this, 'on_wp_login' ], 10, 2 );
			add_action( 'template_redirect', [ $this, 'maybe_show_2fa_form' ] );
			add_action( 'admin_post_nopriv_verify_email_2fa', [ $this, 'handle_verify' ] );
			add_action( 'admin_post_nopriv_resend_email_2fa', [ $this, 'handle_resend' ] );
			add_action( 'admin_post_verify_email_2fa', [ $this, 'handle_verify' ] );
			add_action( 'admin_post_resend_email_2fa', [ $this, 'handle_resend' ] );
			// Clean up cookie on logout
			add_action( 'wp_logout', [ $this, 'clear_pending_cookie' ] );
		}
	}

	/**
	 * After WP authenticates a user, generate and email a code, log the user out and redirect to the OTP form.
	 *
	 * @param string  $user_login
	 * @param WP_User $user
	 */
	public function on_wp_login( $user_login, $user ) {
		$user_id = $user->ID;

		// Optionally bypass admins
		if ( $this->bypass_admins && user_can( $user, 'manage_options' ) ) {
			return;
		}

		// generate code
		$code = $this->generate_code();
		// hash code for storage
		$hashed = wp_hash_password( $code );

		// store hashed code in transient
		$transient_key = $this->transient_prefix . $user_id;
		set_transient( $transient_key, $hashed, $this->code_ttl );

		// reset attempts meta
		delete_user_meta( $user_id, $this->attempt_meta_key );

		// send email
		$this->send_code_email( $user, $code );

		// set cookie to indicate pending 2FA; cookie value is user id XORed with site salt to be slightly obfuscated
		$cookie_val = $this->cookie_value_for_user( $user_id );
		setcookie( $this->cookie_name, $cookie_val, time() + $this->code_ttl, COOKIEPATH ?: '/', COOKIE_DOMAIN, is_ssl(), true );

		// log out the current session
		wp_logout();

		// redirect to form page (query param)
		$redirect = add_query_arg( 'email_2fa', '1', site_url() );
		wp_safe_redirect( $redirect );
		exit;
	}

	/**
	 * Show the OTP entry form when ?email_2fa=1 is present and a pending cookie exists.
	 */
	public function maybe_show_2fa_form() {
		if ( empty( $_GET['email_2fa'] ) ) {
			return;
		}

		// check cookie
		if ( empty( $_COOKIE[ $this->cookie_name ] ) ) {
			$this->render_message_page( 'No pending 2FA session found. Please log in again.' );
			exit;
		}

		$user_id = $this->user_id_from_cookie( $_COOKIE[ $this->cookie_name ] );
		if ( ! $user_id || ! get_user_by( 'ID', $user_id ) ) {
			$this->render_message_page( 'Invalid 2FA session. Please log in again.' );
			exit;
		}

		// show form
		$this->render_2fa_form();
		exit;
	}

	/**
	 * Handle verification POST (admin_post endpoint).
	 */
	public function handle_verify() {
		if ( ! isset( $_POST['email_2fa_code'] ) || ! isset( $_COOKIE[ $this->cookie_name ] ) ) {
			wp_safe_redirect( add_query_arg( 'email_2fa', '1', site_url() ) );
			exit;
		}

		// nonce check
		if ( ! isset( $_POST['_wpnonce'] ) || ! wp_verify_nonce( $_POST['_wpnonce'], 'verify_email_2fa' ) ) {
			$this->render_message_page( 'Security check failed. Please try again.' );
			exit;
		}

		$cookie_val = $_COOKIE[ $this->cookie_name ];
		$user_id    = $this->user_id_from_cookie( $cookie_val );
		if ( ! $user_id ) {
			$this->render_message_page( 'Invalid 2FA session. Please log in again.' );
			exit;
		}

		$input_code = preg_replace( '/\D/', '', $_POST['email_2fa_code'] );
		if ( empty( $input_code ) ) {
			$this->render_message_page( 'Please enter the code you received by email.' );
			exit;
		}

		$transient_key = $this->transient_prefix . $user_id;
		$stored_hash   = get_transient( $transient_key );

		if ( ! $stored_hash ) {
			$this->render_message_page( 'Your code has expired. Please request a new code.' );
			exit;
		}

		// Protect against brute force: count attempts
		$attempts = (int) get_user_meta( $user_id, $this->attempt_meta_key, true );
		if ( $attempts >= $this->max_attempts ) {
			// remove transient to force resend
			delete_transient( $transient_key );
			$this->render_message_page( 'Too many failed attempts. A new code is required. Please click "Resend".' );
			exit;
		}

		// verify - wp_check_password works: first arg plaintext, second stored hash
		$ok = wp_check_password( $input_code, $stored_hash );

		if ( $ok ) {
			// success: delete transient and attempts, clear cookie, log in user programmatically
			delete_transient( $transient_key );
			delete_user_meta( $user_id, $this->attempt_meta_key );
			// clear cookie
			$this->clear_pending_cookie();

			wp_set_current_user( $user_id );
			// honor "remember me"? we can't detect original remember easily; set session cookie (false for remember)
			wp_set_auth_cookie( $user_id, true ); // choose true to keep user logged in; change as wanted

			// redirect to originally requested page or dashboard
			$redirect_to = admin_url();
			wp_safe_redirect( $redirect_to );
			exit;
		} else {
			$attempts++;
			update_user_meta( $user_id, $this->attempt_meta_key, $attempts );
			if ( $attempts >= $this->max_attempts ) {
				delete_transient( $transient_key );
				$this->render_message_page( 'Too many failed attempts. A new code is required. Please click "Resend".' );
				exit;
			}
			$this->render_message_page( 'Incorrect code. Attempts: '. $attempts . ' / ' . $this->max_attempts .'.', true );
			exit;
		}
	}

	/**
	 * Handle resend request.
	 */
	public function handle_resend() {
		// nonce check
		if ( ! isset( $_POST['_wpnonce'] ) || ! wp_verify_nonce( $_POST['_wpnonce'], 'resend_email_2fa' ) ) {
			$this->render_message_page( 'Security check failed. Please try again.' );
			exit;
		}

		if ( empty( $_COOKIE[ $this->cookie_name ] ) ) {
			$this->render_message_page( 'No pending 2FA session found. Please log in again.' );
			exit;
		}

		$user_id = $this->user_id_from_cookie( $_COOKIE[ $this->cookie_name ] );
		if ( ! $user_id ) {
			$this->render_message_page( 'Invalid 2FA session. Please log in again.' );
			exit;
		}

		$user = get_user_by( 'ID', $user_id );
		if ( ! $user ) {
			$this->render_message_page( 'Invalid user. Please log in again.' );
			exit;
		}

		// generate a fresh code
		$code = $this->generate_code();
		$hashed = wp_hash_password( $code );
		set_transient( $this->transient_prefix . $user_id, $hashed, $this->code_ttl );

		// reset attempts
		delete_user_meta( $user_id, $this->attempt_meta_key );

		// send email
		$this->send_code_email( $user, $code );

		$this->render_message_page( 'A new code was sent to your email address.' );
		exit;
	}

	/**
	 * Generate a 6-digit code.
	 *
	 * @return string
	 */
	private function generate_code() {
		$min = 100000;
		$max = 999999;
		// random_int is cryptographically secure
		return (string) random_int( $min, $max );
	}

	/**
	 * Send OTP email.
	 *
	 * @param WP_User $user
	 * @param string  $code
	 */
	private function send_code_email( $user, $code ) {
		$to      = $user->user_email;
		$subject = sprintf( '[%s] Your login verification code', wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ) );
		$body    = sprintf( "Hello %s,\n\nA login to your account requires a verification code.\n\nYour code: %s\n\nThis code will expire in %d minutes.\n\nIf you did not request this code, please contact the site administrator.", $user->display_name ?: $user->user_login, $code, intval( $this->code_ttl / 60 ) );

		$headers = [ 'Content-Type: text/plain; charset=UTF-8' ];

		// Use wp_mail; for reliability you should configure SMTP on the site.
		wp_mail( $to, $subject, $body, $headers );
	}

	/**
	 * Render the OTP form.
	 */
	private function render_2fa_form() {
		$home_url = esc_url( add_query_arg( 'email_2fa', '1', site_url() ) );
		$nonce_verify = wp_create_nonce( 'verify_email_2fa' );
		$nonce_resend = wp_create_nonce( 'resend_email_2fa' );
		?>
		<!doctype html>
		<html>
		<head>
			<meta charset="utf-8">
			<title>Enter verification code</title>
			<style>
				body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;display:flex;align-items:center;justify-content:center;height:100vh;background:#f6f8fb}
				.card{background:#fff;padding:28px;border-radius:10px;max-width:420px;width:90%;box-shadow:0 6px 20px rgba(25,30,50,.08)}
				h1{font-size:18px;margin:0 0 10px}
				p{color:#555;margin:0 0 18px}
				input[type="text"]{width:100%;padding:12px;border-radius:6px;border:1px solid #ddd;margin-bottom:12px;font-size:16px}
				.btn{display:inline-block;padding:10px 16px;border-radius:6px;background:#0073aa;color:#fff;text-decoration:none;border:none;cursor:pointer}
				.btn.secondary{background:#eaeef6;color:#222;margin-left:8px}
				.small{font-size:13px;color:#666;margin-top:10px}
			</style>
		</head>
		<body>
		<div class="card" role="main">
			<h1>Verification code</h1>
			<p>We've sent a 6-digit code to your account email. Enter it below to complete login.</p>

			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
				<input type="hidden" name="action" value="verify_email_2fa">
				<?php wp_nonce_field( 'verify_email_2fa' ); ?>
				<label for="code" class="screen-reader-text">Code</label>
				<input id="code" name="email_2fa_code" type="text" inputmode="numeric" pattern="\d{6}" maxlength="6" placeholder="e.g. 123456" required autocomplete="one-time-code">
				<button class="btn" type="submit">Verify</button>
			</form>

			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" style="margin-top:12px;">
				<input type="hidden" name="action" value="resend_email_2fa">
				<?php wp_nonce_field( 'resend_email_2fa' ); ?>
				<button class="btn secondary" type="submit">Resend code</button>
			</form>

			<div class="small">If you can't access your email, contact the site administrator.</div>
		</div>
		</body>
		</html>
		<?php
	}

	/**
	 * Helper to render a small message page.
	 *
	 * @param string $message
	 * @param bool   $is_error
	 */
	private function render_message_page( $message, $is_error = false ) {
		$color = $is_error ? '#b00020' : '#111';
		?>
		<!doctype html>
		<html>
		<head>
			<meta charset="utf-8">
			<title>Email 2FA</title>
			<style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;background:#f6f8fb;color:<?php echo esc_attr( $color ); ?>;display:flex;align-items:center;justify-content:center;height:100vh} .box{background:#fff;padding:22px;border-radius:8px;box-shadow:0 8px 30px rgba(10,20,40,.06);max-width:700px;width:90%}</style>
		</head>
		<body>
			<div class="box">
				<p><?php echo esc_html( $message ); ?></p>
				<p><a href="<?php echo esc_url( wp_login_url() ); ?>">Return to login</a></p>
			</div>
		</body>
		</html>
		<?php
	}

	/**
	 * Create cookie value for a user id (obfuscation).
	 */
	private function cookie_value_for_user( $user_id ) {
		$salt = wp_salt( 'auth' );
		$val  = $user_id ^ crc32( $salt );
		return base64_encode( $val );
	}

	/**
	 * Extract user id from cookie value.
	 */
	private function user_id_from_cookie( $cookie_val ) {
		$decoded = base64_decode( $cookie_val, true );
		if ( $decoded === false ) {
			return false;
		}
		$salt = wp_salt( 'auth' );
		$val  = intval( $decoded );
		$user_id = $val ^ crc32( $salt );
		if ( $user_id <= 0 ) {
			return false;
		}
		return $user_id;
	}

	/**
	 * Clear the pending cookie.
	 */
	public function clear_pending_cookie() {
		if ( isset( $_COOKIE[ $this->cookie_name ] ) ) {
			unset( $_COOKIE[ $this->cookie_name ] );
			// clear cookie on client
			setcookie( $this->cookie_name, '', time() - 3600, COOKIEPATH ?: '/', COOKIE_DOMAIN, is_ssl(), true );
		}
	}
}

new Authpress_Two_FA();

