import { __ } from "@wordpress/i18n";
import Font from "../components/Font/Font";
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import { 
    ToggleControl
} from '@wordpress/components';
const CustomizerRedesignOther = ({handleChange}) => {
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
                            : <h4>{__("Disable Register Link?", "authpress")}</h4>
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
                                onChange={(newValue) => handleChange('customizer.redesign.other.disable_register_link', newValue)}
                                checked={settingData?.customizer?.redesign?.other?.disable_register_link}
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
                            : <h4>{__("Disable Lost Password?", "authpress")}</h4>
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
                                onChange={(newValue) => handleChange('customizer.redesign.other.disable_lost_password', newValue)}
                                checked={settingData?.customizer?.redesign?.other?.disable_lost_password}
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
                            : <h4>{__("Disable Privacy policy", "authpress")}</h4>
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
                                onChange={(newValue) => handleChange('customizer.redesign.other.disable_privacy_policy', newValue)}
                                checked={settingData?.customizer?.redesign?.other?.disable_privacy_policy}
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
                            : <h4>{__("Disable Back to Website?", "authpress")}</h4>
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
                                onChange={(newValue) => handleChange('customizer.redesign.other.disable_back_to_website', newValue)}
                                checked={settingData?.customizer?.redesign?.other?.disable_back_to_website}
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
                            : <h4>{__("Font", "authpress")}</h4>
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
                            <Font 
                                defaultValues={settingData?.customizer?.redesign?.other?.font}
                                name='customizer.redesign.other.font' 
                                handleChange={handleChange}
                                options = {['color', 'font-size', 'font-weight', 'font-style', 'text-transform']}
                            />  
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(CustomizerRedesignOther);