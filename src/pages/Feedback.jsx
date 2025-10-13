import { __ } from "@wordpress/i18n";
import withForm from '../pages/withForm';
import axios from "axios";
import { useEffect, useState } from 'react';
import { TextControl, TextareaControl } from '@wordpress/components';
const Feedback = () => {
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [processing, setProcessing] = useState(false)
    const handleForm = async () => {
        if (subject && message) {
            setProcessing(true);
            try {
                const result = await axios.post(
                    "/wp-json/authpress/v1/feedback",
                    {
                        subject: subject,
                        message: message
                    },
                    {
                        headers: {
                            'X-WP-Nonce': authpress_ajax_obj.api_nonce,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                // You might want to handle success here
                // console.log("Mail sent successfully:", result.data);
            } catch (error) {
                console.error("Mail Sending Error:", error);
            } finally {
                setProcessing(false);
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
                        <button 
                            type="button" 
                            className="button button-primary" 
                            onClick={handleForm}
                            disabled={processing}
                        >
                            {
                                processing ? __( "Sending...", "authpress" ) : __( "Send", "authpress" )
                            }
                        </button>
                        
                    </div>  
                </div>
            </div>
        </>
    )
}
export default withForm(Feedback);