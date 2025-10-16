import { __ } from "@wordpress/i18n";
import withForm from '../pages/withForm';
import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from 'react';
import { TextControl, TextareaControl, Button } from '@wordpress/components';

import { envelope, rotateRight, check } from '@wordpress/icons'; // Example icon
const Feedback = () => {
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [processing, setProcessing] = useState('normal'); // normal, processing, done
    const handleForm = async () => {
        if (subject && message) {
            setProcessing('processing');
            try {
                const result = await apiFetch({
                    path: "/authpress/v1/feedback",
                    method: "POST",
                    data: {
                        subject,
                        message
                    },
                    headers: {
                        'X-WP-Nonce': authpress_ajax_obj.api_nonce
                    }
                });
                // You might want to handle success here
                console.log(result);

                setProcessing('done');
                if (result.success) {
                    setSubject('');
                    setMessage('');
                }

            } catch (error) {
                console.error("Mail Sending Error:", error);
            } finally {
                setProcessing('normal');
            }
        } else {
            alert('Subject or Message can\'t be Empty')
        }
    };
    return (
        <>
            <div className="setting-unit">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <img className="img-fluid" src={`${authpress_ajax_obj.image_url}feedback.jpg`} alt="" />
                    </div> 
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <TextControl
                                __nextHasNoMarginBottom
                                __next40pxDefaultSize
                                label={__("Subject", "authpress")}
                                value={ subject }
                                onChange={ ( value ) => setSubject( value ) }
                            />
                        </div>
                        <div className="mb-3">
                            <TextareaControl
                                __nextHasNoMarginBottom
                                label={__("Message", "authpress")}
                                // help="Enter some text"
                                value={ message }
                                onChange={ ( value ) => setMessage( value ) }
                            />
                        </div>
                        <Button
                            isDestructive={ processing=='processing'?true:false } // Red button
                            isBusy={ processing!='normal'?true:false  } // Show loading indicator
                            disabled={ processing!='normal'?true:false } // Disable the button
                            isPressed={ false } // Appear pressed, Become black  
                            icon={ processing=='processing'?rotateRight:processing=='done'?check:envelope} // Button icon
                            iconPosition="left" // Icon position (left, right)
                            iconSize={ 20 } // Icon size
                            size="medium" // Button size (small, medium, large)
                            style={ { marginRight: '8px' } } // Custom styles
                            className={processing=='processing'?'button-processing':'' } // Custom class name (button-processing)                  
                            variant="primary"
                            onClick={ handleForm }
                        >
                            {
                                processing == 'processing' ? __( "Sending...", "authpress" ) : __( "Send", "authpress" )
                            }
                        </Button>
                        
                    </div>  
                </div>
            </div>
        </>
    )
}
export default withForm(Feedback);