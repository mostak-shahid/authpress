<?php

/**
 * Fired during plugin activation
 *
 * @link       https://mostak-shahid.github.io/
 * @since      1.0.0
 *
 * @package    Authpress
 * @subpackage Authpress/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Authpress
 * @subpackage Authpress/includes
 * @author     Programmelab <mostak.shahid@gmail.com>
 */
class Authpress_Activator
{

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate()
	{
		$authpress_options = authpress_get_option();
		update_option('authpress_options', $authpress_options);
		add_option('authpress_do_activation_redirect', true);
	}
}
