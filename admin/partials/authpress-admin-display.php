<?php
// If this file is called directly, abort.
if (!defined('ABSPATH')) die;
$authpress_options = authpress_get_option();
// var_dump($authpress_options);
$actual_link = (empty($_SERVER['HTTPS']) ? 'http' : 'https') . "://" . (isset($_SERVER['HTTP_HOST']) && isset($_SERVER['REQUEST_URI'])) ? sanitize_text_field(wp_unslash($_SERVER['HTTP_HOST'])) . sanitize_text_field(wp_unslash($_SERVER['REQUEST_URI'])) : '';

$dataOptions = [
    'option-1' => esc_html__('Option 1', 'authpress'),
    'option-2' => esc_html__('Option 2', 'authpress'),
    'option-3' => esc_html__('Option 3', 'authpress'),
    'option-4' => esc_html__('Option 4', 'authpress'),
]

?>
<div class="authpress-settings-wrapper">
    <?php
    $active_tab_input = 0;
    if (isset($_POST['authpress_options_form_field']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['authpress_options_form_field'])), 'authpress_options_form_action')) {
        $active_tab_input = isset($_POST['active_tab_input']) ? sanitize_text_field(wp_unslash(_POST['active_tab_input'])) : 0;
        if (isset($_POST['settings-updated'])) {
            add_settings_error('authpress-messages', 'authpress-message', esc_html__('All changes have been applied correctly, ensuring your preferences are now in effect.', 'authpress'), 'updated');
        }
        settings_errors('authpress-messages');
    }
    ?>
    <input type="hidden" class="active_tab_input" id="active_tab_input" value="<?php echo esc_html($active_tab_input); ?>" />
    <div id="authpress-settings-tabs">
        <ul>
            <li><a href="#base-input"><?php echo esc_html('Base Input', 'authpress'); ?></a></li>
            <li><a href="#array-input"><?php echo esc_html('Array Input', 'authpress'); ?></a></li>
        </ul>
        <div id="base-input">
            <form method='post'>
                <?php wp_nonce_field('authpress_options_form_action', 'authpress_options_form_field'); ?>
                <div class="authpress-settings-container">
                    <div class="authpress-settings">
                        <div class="part-title">
                            <h2><?php echo esc_html('Base Input', 'authpress'); ?></h2>
                        </div>
                        <div class="part-options">
                            <table class="form-table" role="presentation">
                                <tbody>
                                    <tr class="authpress_row">
                                        <th scope="row"><label for="text_input"><?php echo esc_html__('Text Input', 'authpress') ?></label></th>
                                        <td>
                                            <div class="position-relative input_text">
                                                <label for="text_input">
                                                    <input type="text" name="authpress_options[base_input][text_input]" id="text_input" value="<?php echo isset($authpress_options['base_input']['text_input']) ? esc_html($authpress_options['base_input']['text_input']) : '' ?>">
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="authpress_row">
                                        <th scope="row"><label for="email_input"><?php echo esc_html__('Email Input', 'authpress') ?></label></th>
                                        <td>
                                            <div class="position-relative input_email">
                                                <label for="email_input">
                                                    <input type="email" name="authpress_options[base_input][email_input]" id="email_input" value="<?php echo isset($authpress_options['base_input']['email_input']) ? esc_html($authpress_options['base_input']['email_input']) : '' ?>">
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="authpress_row">
                                        <th scope="row"><label for="color_input"><?php echo esc_html__('Color Input', 'authpress') ?></label></th>
                                        <td>
                                            <div class="position-relative input_color">
                                                <label for="color_input">
                                                    <input type="color" name="authpress_options[base_input][color_input]" id="color_input" value="<?php echo isset($authpress_options['base_input']['color_input']) ? esc_html($authpress_options['base_input']['color_input']) : '' ?>">
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="authpress_row">
                                        <th scope="row"><label for="date_input"><?php echo esc_html__('Date Input', 'authpress') ?></label></th>
                                        <td>
                                            <div class="position-relative input_date">
                                                <label for="date_input">
                                                    <input type="date" name="authpress_options[base_input][date_input]" id="date_input" value="<?php echo isset($authpress_options['base_input']['date_input']) ? esc_html($authpress_options['base_input']['date_input']) : '' ?>">
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="authpress_row">
                                        <th scope="row"><label for="datetime_local_input"><?php echo esc_html__('Datetime local Input', 'authpress') ?></label></th>
                                        <td>
                                            <div class="position-relative input_datetime_local">
                                                <label for="datetime_local_input">
                                                    <input type="datetime-local" name="authpress_options[base_input][datetime_local_input]" id="datetime_local_input" value="<?php echo isset($authpress_options['base_input']['datetime_local_input']) ? esc_html($authpress_options['base_input']['datetime_local_input']) : '' ?>">
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="authpress_row">
                                        <th scope="row"><label for="textarea_input"><?php echo esc_html__('Textarea', 'authpress') ?></label></th>
                                        <td>
                                            <div class="position-relative textarea">
                                                <label for="textarea_input">
                                                    <textarea type="text" name="authpress_options[base_input][textarea_input]" id="textarea_input"><?php echo isset($authpress_options['base_input']['textarea_input']) ? esc_html($authpress_options['base_input']['textarea_input']) : '' ?></textarea>
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="authpress_row">
                                        <th scope="row"><label for="switch_input"><?php echo esc_html__('Enable Product Tabs', 'authpress') ?></label></th>
                                        <td>
                                            <div class="position-relative authpress-switcher">
                                                <label for="authpress_options_switch_input">
                                                    <input type="checkbox" name="authpress_options[base_input][switch_input]" id="authpress_options_switch_input" value="1" <?php checked($authpress_options['base_input']['switch_input'] ?? null, 1); ?>>
                                                    <em data-on="on" data-off="off"></em>
                                                    <span></span>
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="authpress_row">
                                        <th scope="row"><label for="radio_input"><?php echo esc_html__('Radio Input', 'authpress') ?></label></th>
                                        <td>
                                            <div class="position-relative radio">
                                                <div class="radio-wrapper">
                                                    <?php if (isset($dataOptions) && sizeof($dataOptions)) : ?>
                                                        <?php foreach ($dataOptions as $key => $value) : ?>
                                                            <div class="radio-unit">
                                                                <input class="radio_input radio_input-1" name="authpress_options[base_input][radio_input]" id="radio_input-<?php echo esc_html(sanitize_title($key)) ?>" type="radio" value="<?php echo esc_html($key) ?>" <?php checked($authpress_options['base_input']['radio_input'] ?? null, $key) ?>>
                                                                <label for="radio_input-<?php echo esc_html(sanitize_title($key)) ?>"><span></span> <?php echo esc_html($value) ?></label>
                                                            </div>
                                                        <?php endforeach ?>
                                                    <?php endif ?>

                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="authpress_row">
                                        <th scope="row"><label for="datalist_input"><?php echo esc_html__('Datalist Input', 'authpress') ?></label></th>
                                        <td>
                                            <div class="position-relative datalist">
                                                <label for="datalist_input">
                                                    <input list="authpress_options_datalist_input" name="authpress_options[base_input][datalist_input]" id="datalist_input" value="<?php echo isset($authpress_options['base_input']['datalist_input']) ? esc_html($authpress_options['base_input']['datalist_input']) : '' ?>">
                                                </label>
                                                <datalist id="authpress_options_datalist_input">
                                                    <?php if (isset($dataOptions) && sizeof($dataOptions)) : ?>
                                                        <?php foreach ($dataOptions as $key => $value) : ?>
                                                            <option><?php echo esc_html($value) ?></option>
                                                        <?php endforeach ?>
                                                    <?php endif ?>
                                                </datalist>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="authpress_row">
                                        <th scope="row"><label for="select_input"><?php echo esc_html__('Select Input', 'authpress') ?></label></th>
                                        <td>
                                            <div class="position-relative select">

                                                <label for="select_input">
                                                    <select name="authpress_options[base_input][select_input]" id="select_input">
                                                        <option value=""><?php echo esc_html__('Select One', 'authpress') ?></option>
                                                        <?php if (isset($dataOptions) && sizeof($dataOptions)) : ?>
                                                            <?php foreach ($dataOptions as $key => $value) : ?>
                                                                <option value="<?php echo esc_html($key) ?>" <?php selected($authpress_options['base_input']['select_input'] ?? null, $key) ?>><?php echo esc_html($value) ?></option>
                                                            <?php endforeach ?>
                                                        <?php endif ?>
                                                    </select>
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <p class="submit">
                    <input type="submit" name="submit" id="submit" class="button button-primary" value="<?php echo esc_html__('Save Changes', 'authpress') ?>">
                    <button class="button authpress-button-reset button-secondary" data-name="base_input" data-url="<?php echo esc_url($actual_link) ?>"><?php echo esc_html__('Reset', 'authpress') ?></button>
                    <input type="hidden" class="active_tab_input" name="active_tab_input" value="<?php echo esc_html($active_tab_input); ?>" />
                    <input type="hidden" name="authpress_options[base_input][submit]" value="1">
                </p>
            </form>
        </div>
        <div id="array-input">
            <form method='post'>
                <?php wp_nonce_field('authpress_options_form_action', 'authpress_options_form_field'); ?>
                <div class="authpress-settings-container">
                    <div class="authpress-settings">
                        <div class="part-title">
                            <h2><?php echo esc_html('Array Input', 'authpress'); ?></h2>
                        </div>
                        <div class="part-options">
                            <table class="form-table" role="presentation">
                                <tbody>
                                    <tr class="authpress_row">
                                        <th scope="row"><label for="checkbox_input"><?php echo esc_html__('Checkbox Input', 'authpress') ?></label></th>
                                        <td>
                                            <div class="position-relative select">
                                                <div class="checkbox-group" id="checkbox_input">
                                                    <?php if (isset($dataOptions) && sizeof($dataOptions)) : ?>
                                                        <?php foreach ($dataOptions as $key => $value) : ?>
                                                            <div class="checkbox-unit">
                                                                <label>
                                                                    <input type="checkbox" value="<?php echo esc_html($key) ?>" name="authpress_options[array_input][checkbox_input][]" <?php checked(in_array($key, $authpress_options['array_input']['checkbox_input'] ?? [])); ?>>
                                                                    <span><?php echo esc_html($value) ?></span>
                                                                </label>
                                                            </div>
                                                        <?php endforeach ?>
                                                    <?php endif ?>

                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="authpress_row">
                                        <th scope="row"><label for="multi-select_input"><?php echo esc_html__('Multi Select Input', 'authpress') ?></label></th>
                                        <td>
                                            <div class="position-relative select">
                                                <label for="multi-select_input">
                                                    <select name="authpress_options[array_input][multi-select_input][]" id="multi-select_input" multiple>
                                                        <?php if (isset($dataOptions) && sizeof($dataOptions)) : ?>
                                                            <?php foreach ($dataOptions as $key => $value) : ?>
                                                                <option value="<?php echo esc_html($key) ?>" <?php selected(in_array($key, $authpress_options['array_input']['multi-select_input'] ?? [])) ?>><?php echo esc_html($value) ?></option>
                                                            <?php endforeach ?>
                                                        <?php endif ?>
                                                    </select>
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <p class="submit">
                    <input type="submit" name="submit" id="submit" class="button button-primary" value="<?php echo esc_html__('Save Changes', 'authpress') ?>">
                    <button class="button authpress-button-reset button-secondary" data-name="array_input" data-url="<?php echo esc_url($actual_link) ?>"><?php echo esc_html__('Reset', 'authpress') ?></button>
                    <input type="hidden" class="active_tab_input" name="active_tab_input" value="<?php echo esc_html($active_tab_input); ?>" />
                    <input type="hidden" name="authpress_options[array_input][submit]" value="1">
                </p>
            </form>
        </div>
    </div>
</div>