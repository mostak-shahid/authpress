import React from 'react'
import { __ } from "@wordpress/i18n";
import { Button } from '@douyinfe/semi-ui';
export default function ActionButtons({hasChanges, section, handleReset, handleSubmit, onSave}) {

    const onReset = () => {
        handleReset(section);
    };

    const onDiscard = () => {
        window.location.reload();
    };

    const onSaveClick = () => {
        if (onSave) {
            onSave();
        }
    };

    return (
        <div className='mt-6'>
            <Button 
                type="primary" 
                theme='solid'
                disabled={!hasChanges}
                onClick={onSaveClick}
            >
                {__('Save Settings', 'authpress')}
            </Button>
            <Button
                type="danger" 
                theme='solid'
                style={{ marginLeft: '12px' }}
                onClick={onReset}
            >
                {__('Reset', 'authpress')}
            </Button>
            {
                hasChanges && (
                    <>
                        <span style={{ marginLeft: '12px', color: '#faad14' }}>
                            {__('You have unsaved changes', 'authpress')}
                        </span>
                        <Button
                            type="tertiary" 
                            theme='solid'
                            style={{ marginLeft: '12px' }}
                            onClick={onDiscard}
                        >
                            {__('Discard Changes', 'authpress')}
                        </Button>
                    </>
                )
            }
        </div>
    )
}
