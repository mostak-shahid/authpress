import { __ } from "@wordpress/i18n";
import Switch from '../components/Switch/Switch';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import { 
    ToggleControl,
    SelectControl,
    Flex, 
    FlexBlock, 
    FlexItem,
    TextControl
} from '@wordpress/components';
const CustomizerSettings = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
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
                            <Flex className="input-group-authpress">
                                <FlexItem className="input-group-text">
                                    <span>{authpress_ajax_obj.home_url}/</span>
                                </FlexItem>
                                <FlexBlock>
                                    <TextControl
                                        __nextHasNoMarginBottom
                                        __next40pxDefaultSize
                                        // label="Additional CSS Class"
                                        value={ settingData?.customizer?.settings?.login_url }
                                        onChange={ ( value ) => handleChange('customizer.settings.login_url', value) }
                                    />
                                </FlexBlock>
                            </Flex>                     
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Registration URL", "authpress")}</h4>
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
                            <Flex className="input-group-authpress">
                                <FlexItem className="input-group-text">
                                    <span>{authpress_ajax_obj.home_url}/</span>
                                </FlexItem>
                                <FlexBlock>
                                    <TextControl
                                        __nextHasNoMarginBottom
                                        __next40pxDefaultSize
                                        // label="Additional CSS Class"
                                        value={ settingData?.customizer?.settings?.registration_url }
                                        onChange={ ( value ) => handleChange('customizer.settings.registration_url', value) }
                                    />
                                </FlexBlock>
                            </Flex>                        
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Forgot Password URL", "authpress")}</h4>
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
                            <Flex className="input-group-authpress">
                                <FlexItem className="input-group-text">
                                    <span>{authpress_ajax_obj.home_url}/</span>
                                </FlexItem>
                                <FlexBlock>
                                    <TextControl
                                        __nextHasNoMarginBottom
                                        __next40pxDefaultSize
                                        // label="Additional CSS Class"
                                        value={ settingData?.customizer?.settings?.forgot_password_url }
                                        onChange={ ( value ) => handleChange('customizer.settings.forgot_password_url', value) }
                                    />
                                </FlexBlock>
                            </Flex>                       
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Login By", "authpress")}</h4>
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
                            <SelectControl
                                // label="Size"
                                value={ settingData?.customizer?.settings?.login_by }
                                options={ [
                                    { label: __("Username", "authpress"), value: 'username' },
                                    { label: __("Email", "authpress"), value: 'email' },
                                    { label: __("Both", "authpress"), value: 'both' },
                                    { label: __("Phone Number (Pro)", "authpress"), value: 'phone',disabled: true },
                                ] }
                                onChange={ ( newSize ) => handleChange('customizer.settings.login_by', newSize ) }
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            />                       
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Auto Remember Me", "authpress")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-auto">
                            <ToggleControl
                                __nextHasNoMarginBottom
                                onChange={(newValue) => handleChange('customizer.settings.remember_me_always_on', newValue)}
                                checked={settingData?.customizer?.settings?.remember_me_always_on}
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
                            : <h4>{__("Password Fields on registration page", "authpress")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-auto">
                            <ToggleControl
                                __nextHasNoMarginBottom
                                onChange={(newValue) => handleChange('customizer.settings.enable_registration_password', newValue)}
                                checked={settingData?.customizer?.settings?.enable_registration_password}
                            /> 
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(CustomizerSettings);