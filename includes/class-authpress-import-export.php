<?php
class Authpress_Import_Export
{
	protected $options;

	public function __construct()
	{
		$this->options = authpress_get_option();
		add_action('rest_api_init', [$this, 'register_rest_routes']);
	}
	public function register_rest_routes()
	{
		register_rest_route('authpress/v1', '/settings', [
			'methods' => 'POST',
			'callback' => function ($request) {
				$data = $request->get_json_params();
				update_option('authpress_options', $data);
				return rest_ensure_response(['success' => true]);
			},
			'permission_callback' => '__return_true',
			// 'permission_callback' => function () {
			// 	return current_user_can('manage_options');
			// },
		]);
	}
}

new Authpress_Import_Export();
