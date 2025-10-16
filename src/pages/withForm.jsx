
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MultiLevelListGroup from "../components/MultiLevelListGroup/MultiLevelListGroup";
import PageInfo from "../components/PageInfo/PageInfo";
import { useMain } from "../contexts/MainContext";
import { formDataPost, setNestedValue, urlToArr } from "../lib/Helpers"; // Import utility function
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Details from '../data/details.json';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex, 
    FlexBlock, 
    FlexItem,
    Button, 
} from '@wordpress/components';
import { Icon, more, file, envelope, rotateRight, check, arrowUp, arrowDown, trash, reset } from '@wordpress/icons'; // Example icon
const withForm = (OriginalComponent) => {     
    function NewComponent() {
        const {
            settingData, 
            setSettingData,
            settingLoading,
            setSettingLoading,
            settingsMenu,
            settingReload,
            setSettingReload
        } = useMain();
        
        const [showToast, setShowToast] = useState(false)
        const [ saving, setSaving ] = useState('normal');
        const [ resetting, setResetting ] = useState('normal');

        const urlArr = urlToArr();

        const location = useLocation();
        
        const OPTIONS_API_URL = "/authpress/v1/options";

        useEffect(() => {
            const basePath = '/authpress/v1';        
            const fetchSettingData = async () => {
                try {
                    const response = await apiFetch({
                        path: `${basePath}/options`,
                        headers: { 'X-WP-Nonce': authpress_ajax_obj.api_nonce }
                    });
                    setSettingData(response);
                    setSettingLoading(false)
                } catch (error) {
                    console.log(error);
                }
            };
        
            fetchSettingData();
        }, [settingReload]);

        // Handle changes from child components
        const handleChange = (fieldPath, value) => {
            // console.log("Field changed:", fieldPath, "New value:", value);
            setSettingData(prev => {
                const updatedOptions = setNestedValue(prev, fieldPath, value);
                return { ...updatedOptions }; // Ensure React detects the update
            });
        };
        const handleSave = async () => {
            setSaving('processing');
            try {
                await apiFetch({
                    path: OPTIONS_API_URL,
                    method: 'POST',
                    data: { authpress_options: settingData },
                    headers: {
                        'X-WP-Nonce': authpress_ajax_obj.api_nonce
                    }
                });
                window.scrollTo(0, 0);
                setSettingReload(Math.random);
                setSaving('done');
                setTimeout(() => {
                    setSaving('normal');
                }, 1000);
                setShowToast(true);
            } catch (error) {
                console.error("Error saving settings:", error);
            }
        };
       const handleReset = async (name) => {
            // console.log(name)
            const confirmation = window.confirm(__( "Are you sure you want to proceed?", "authpress" ));
            let result;
            if (confirmation) {       
                setProcessing(true);     
                setResetLoading(true);
                setResetError(null);            
                try {
                    result = await formDataPost('authpress_reset_settings', {name:name}); 
                    setSettingReload(Math.random);
                } catch (error) {
                    setResetError(error.message);
                } finally {
                    setResetLoading(false);
                    setProcessing(false);
                }
            }
        };
        const handleResetAll = async () => {
            const confirmation = window.confirm(__( "Are you sure you want to proceed?", "authpress" ));
            let result;
            if (confirmation) {       
                setResetting('processing');        
                try {
                    result = await formDataPost('authpress_reset_all_settings', {});
                    console.log(result); 
                    if (result.success) {
                        setResetting('done');
                        setTimeout(() => {
                            setResetting('normal');
                        }, 2000);
                        setSettingReload(Math.random);   
                    }
                } catch (error) {
                    setResetError(error.message);
                } finally {
                    setResetting('normal');    
                }
            }
        };
        useEffect(() => {
        }, [])
        return (
            <>
                <ToastContainer
                    className="p-3"
                    // position="end"
                    style={{ zIndex: 9999, top:'43px', right:0 }}
                >
                    <Toast 
                        bg="success"
                        onClose={() => setShowToast(false)} 
                        show={showToast} 
                        delay={3000} 
                        autohide
                    >
                        <Toast.Header>
                            <strong className="me-auto">{__('Saved',"authpress")}</strong>
                        </Toast.Header>
                        <Toast.Body className="text-white">
                            {__(
                                'All changes have been applied correctly, ensuring your preferences are now in effect.',                                                        
                                "authpress"
                            )}
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
                <div className="authpress-settings">
                    <div className="container">                        
                        <div className="row g-0">
                            <div className="col-lg-3 d-none d-lg-block">
                                <Card className="authpress-sidebar py-3 rounded-0" style={{marginRight:'-1px', height: "100%"}}> 
                                    <div className="plugin-info d-flex flex-column align-items-center gap-2 p-3 border-bottom">
                                        <img src={`${authpress_ajax_obj.image_url}logo.svg`} alt="" width="100" height="100" />
                                        <span className="fw-bold">{Details?.name}</span>
                                        <span>{Details?.version}</span>
                                    </div>                           
                                    <MultiLevelListGroup data={settingsMenu}/>
                                    {/* <VerticalMenu menuData={settingsMenu} /> */}
                                </Card>
                            </div>
                            <div className="col-lg-9">
                                <Card className="rounded-0" style={{height: "100%"}}>
                                    <CardHeader>
                                        <PageInfo url={location.pathname} />
                                    </CardHeader>
                                    <CardBody className="p-4" style={{marginBottom: '80px'}}>        
                                        <OriginalComponent handleChange={handleChange} />
                                    </CardBody>
                                    {/* {console.log(location.pathname)} */}
                                    {
                                        (location.pathname!='/settings/feedback' && location.pathname!='/settings/import_export') && 
                                            <CardFooter style={{position: 'absolute', bottom: 0, backgroundColor: '#ffffff'}}>
                                                <Flex justify="start" align="center">
                                                    <FlexItem>
                                                        <Button
                                                            isDestructive={ saving=='processing'?true:false } // Red button
                                                            isBusy={ saving!='normal'?true:false  } // Show loading indicator
                                                            disabled={ saving!='normal'?true:false } // Disable the button
                                                            isPressed={ false } // Appear pressed, Become black  
                                                            icon={ saving=='processing'?rotateRight:saving=='done'?check:file} // Button icon
                                                            iconPosition="left" // Icon position (left, right)
                                                            iconSize={ 20 } // Icon size
                                                            size="medium" // Button size (small, medium, large)
                                                            // style={ { marginRight: '8px' } } // Custom styles
                                                            className={saving=='processing'?'button-processing':'' } // Custom class name (button-processing)                  
                                                            variant="primary"
                                                            onClick={ handleSave }
                                                        >
                                                            {
                                                                saving == 'processing' ? __( "Saving...", "authpress" ) : __( "Save", "authpress" )
                                                            }
                                                        </Button> 
                                                    </FlexItem>
                                                    <FlexItem>
                                                        <Button
                                                            isDestructive={ resetting=='processing'?true:false } // Red button
                                                            isBusy={ resetting!='normal'?true:false  } // Show loading indicator
                                                            disabled={ resetting!='normal'?true:false } // Disable the button
                                                            isPressed={ false } // Appear pressed, Become black  
                                                            icon={ resetting=='processing'?rotateRight:resetting=='done'?check:trash} // Button icon
                                                            iconPosition="left" // Icon position (left, right)
                                                            iconSize={ 20 } // Icon size
                                                            size="medium" // Button size (small, medium, large)
                                                            // style={ { marginRight: '8px' } } // Custom styles
                                                            className={resetting=='processing'?'button-processing':'' } // Custom class name (button-processing)                  
                                                            variant="secondary"
                                                            onClick={ handleResetAll }
                                                        >
                                                            {
                                                                resetting == 'processing' ? __( "Resetting...", "authpress" ) : __( "Reset", "authpress" )
                                                            }
                                                        </Button> 
                                                    </FlexItem>
                                                </Flex> 
                                            </CardFooter>
                                    }
                                    
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return NewComponent;    
}
export default withForm;