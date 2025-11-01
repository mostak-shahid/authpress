import { __ } from "@wordpress/i18n";
import React, {useState, useMemo} from 'react';
import { useMain } from '../contexts/MainContext';
import withForm from './withForm';
import { 
    Flex, 
    FlexBlock, 
    FlexItem,
    Button,
    __experimentalInputControl as InputControl,
} from '@wordpress/components';
import { 
    envelope, 
    rotateRight, 
    check, 
} from '@wordpress/icons'; // Example icon
import MultiSelectControl from "../components/MultiSelectControl/MultiSelectControl";
const HideLogin = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    const [emails, setEmails] = useState('');
    const [selected, setSelected] = useState([]);
    const [ processing, setProcessing ] = useState('normal');
    const handleButtonClick = () => {
        setProcessing('processing');
        // Simulate an async operation (e.g., form submission)
        setTimeout(() => {
            setProcessing('done');
            // Reset to normal state after a short delay
            setTimeout(() => {
                setProcessing('normal');
            }, 2000);
        }, 3000);
    }
    return (
        <>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Login URL", "authpress")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&  
                        <div className="col-lg-5">                             
                            <Flex className="input-group-authpress" style={{marginBottom: '8px'}}>
                                <FlexItem className="input-group-text">
                                    <span>{authpress_ajax_obj.home_url}/</span>
                                </FlexItem>
                                <FlexBlock>                                    
                                    <InputControl
                                        __next40pxDefaultSize
                                        type="text"                                        
                                        value={ settingData?.hide_login?.login_url }
                                        onChange={ ( value ) => handleChange('hide_login.login_url', value) }
                                    />
                                </FlexBlock>
                            </Flex>
                            <Button
                                isDestructive={ processing=='processing'?true:false } // Red button
                                isBusy={ processing!='normal'?true:false  } // Show loading indicator
                                disabled={ processing!='normal'?true:false } // Disable the button
                                isPressed={ false } // Appear pressed, Become black  
                                icon={ processing=='processing'?rotateRight:processing=='done'?check:envelope} // Button icon
                                iconPosition="left" // Icon position (left, right)
                                iconSize={ 20 } // Icon size
                                size="medium" // Button size (small, medium, large)
                                // style={{height: '100%'}} // Custom styles
                                className={processing=='processing'?'button-processing':'' } // Custom class name (button-processing)                  
                                variant="primary"
                                onClick={ handleButtonClick }
                            >
                                {
                                    processing == 'processing' ? __( "Saving...", "authpress" ) : __( "Save", "authpress" )
                                }
                            </Button> 
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit pt-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Send Email", "authpress")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-5">
                            <InputControl
                                __next40pxDefaultSize
                                type="text"
                                placeholder={ __( "Enter email addresses separated by commas", "authpress" ) }
                                value={ emails }
                                onChange={ ( value ) => setEmails(value) }
                                style={{marginBottom: '8px'}}
                            />
                            <Button
                                isDestructive={ processing=='processing'?true:false } // Red button
                                isBusy={ processing!='normal'?true:false  } // Show loading indicator
                                disabled={ processing!='normal'?true:false } // Disable the button
                                isPressed={ false } // Appear pressed, Become black  
                                icon={ processing=='processing'?rotateRight:processing=='done'?check:envelope} // Button icon
                                iconPosition="left" // Icon position (left, right)
                                iconSize={ 20 } // Icon size
                                size="medium" // Button size (small, medium, large)
                                // style={{height: '100%'}} // Custom styles
                                className={processing=='processing'?'button-processing':'' } // Custom class name (button-processing)                  
                                variant="primary"
                                onClick={ handleButtonClick }
                            >
                                {
                                    processing == 'processing' ? __( "Sending...", "authpress" ) : __( "Send", "authpress" )
                                }
                            </Button> 
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(HideLogin);