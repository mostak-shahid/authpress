import React, { useEffect, useState } from 'react'
import { __ } from "@wordpress/i18n";
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import apiFetch from "@wordpress/api-fetch";
import { formDataPost, setNestedValue, urlToArr } from "../lib/Helpers"; // Import utility function
import { 
    SelectControl,
    Button,
    Tooltip
} from '@wordpress/components';
import { backup, rotateRight, check } from '@wordpress/icons'; // Example icon
const Tools = ({handleChange}) => {
    const {
        settingData,
        settingLoading,
    } = useMain();
    const [processing, setProcessing] = useState('normal'); // normal, processing, done
    const handleClick = async () => {
        const confirmation = window.confirm(__( "Are you sure you want to proceed?", "authpress" ));
        let result;
        if (confirmation) { 
            setProcessing('processing');
            try {
                result = await formDataPost('authpress_reset_all_settings', {}); 
            } catch (error) {
                console.log(error.message);
            } finally {
                setTimeout(() => {
                    setProcessing('done');
                    setTimeout(() => {
                        setProcessing('normal');
                    }, 1000); // Simulate a 3-second processing time
                }, 3000); // Simulate a 3-second processing time
            }

        }
    };

    
    // const handleResetAll = async () => {
    //     const confirmation = window.confirm(__( "Are you sure you want to proceed?", "authpress" ));
    //     let result;
    //     if (confirmation) {       
    //         setResetting(true);     
    //         setResetLoading(true);
    //         setResetError(null);            
    //         try {
    //             result = await formDataPost('authpress_reset_all_settings', {}); 
    //             setSettingReload(Math.random);
    //         } catch (error) {
    //             setResetError(error.message);
    //         } finally {
    //             setResetLoading(false);
    //             setResetting(false);
    //         }
    //     }
    // };
    return (
        <>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Delete all the plugin data upon", "authpress")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Enable/Disable \"Scripts\" functionalities", "authpress")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-5">
                            <SelectControl
                                // label="Size"
                                value={ settingData?.tools.delete_data_on }
                                //delete, unstall, none
                                options={ [
                                    { label: 'None', value: 'none' },
                                    { label: 'Delete', value: 'delete' },
                                    { label: 'Unstall', value: 'unstall' },
                                ] }
                                onChange={ ( newSize ) => handleChange('tools.delete_data_on', newSize ) }
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            /> 
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
                            : <h4>{__("Reset Plugin", "authpress")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Enable/Disable \"Scripts\" functionalities", "authpress")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-auto">
                            <Tooltip text={__("Reset all the settings to default", "authpress")} position="top">

                                <Button
                                    isDestructive={ processing=='processing'?true:false } // Red button
                                    isBusy={ processing!='normal'?true:false  } // Show loading indicator
                                    disabled={ processing!='normal'?true:false } // Disable the button
                                    isPressed={ false } // Appear pressed, Become black  
                                    icon={ processing=='processing'?rotateRight:processing=='done'?check:backup} // Button icon
                                    iconPosition="left" // Icon position (left, right)
                                    iconSize={ 20 } // Icon size
                                    size="medium" // Button size (small, medium, large)
                                    style={ { marginRight: '8px' } } // Custom styles
                                    className={processing=='processing'?'button-processing':'' } // Custom class name (button-processing)                  
                                    variant="primary"
                                    onClick={ handleClick }
                                >
                                    {__("Reset", "authpress")}
                                </Button>
                            </Tooltip>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(Tools, 'tools');