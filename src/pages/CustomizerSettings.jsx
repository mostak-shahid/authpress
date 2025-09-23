import { __ } from "@wordpress/i18n";
import React from 'react';
import MediaUploader from '../components/MediaUploader/MediaUploader';
import Switch from '../components/Switch/Switch';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
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
                            <div className="form-group">
                                <div class="input-group">   
                                    <span class="input-group-text"><i class="dashicons dashicons-admin-links"></i></span>                             
                                    <input 
                                        id="customizer-logo-height"
                                        className="form-control"
                                        type="url"
                                        value={settingData?.customizer?.settings?.login_url}
                                        min="0"
                                        onChange={(e) => handleChange('customizer.settings.login_url', e.target.value)}
                                    /> 
                                </div> 
                            </div>                       
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
                            <div className="form-group">
                                <div class="input-group">   
                                    <span class="input-group-text"><i class="dashicons dashicons-admin-links"></i></span>                             
                                    <input 
                                        id="customizer-logo-height"
                                        className="form-control"
                                        type="url"
                                        value={settingData?.customizer?.settings?.registration_url}
                                        min="0"
                                        onChange={(e) => handleChange('customizer.settings.registration_url', e.target.value)}
                                    /> 
                                </div> 
                            </div>                       
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
                            <div className="form-group">
                                <div class="input-group">   
                                    <span class="input-group-text"><i class="dashicons dashicons-admin-links"></i></span>                             
                                    <input 
                                        id="customizer-logo-height"
                                        className="form-control"
                                        type="url"
                                        value={settingData?.customizer?.settings?.forgot_password_url}
                                        min="0"
                                        onChange={(e) => handleChange('customizer.settings.forgot_password_url', e.target.value)}
                                    /> 
                                </div> 
                            </div>                       
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
                            <select 
                                className="form-select"
                                value={settingData?.customizer?.settings?.login_by} 
                                onChange={(e) => handleChange('customizer.settings.login_by', e.target.value)}
                            >
                                <option value="username">{__("Username", "authpress")}</option>
                                <option value="email">{__("Email", "authpress")}</option>
                                <option value="both">{__("Both", "authpress")}</option>
                                <option value="phone" disabled>{__("Phone Number", "authpress")} ({__("Pro", "authpress")})</option>
                            </select>                         
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
                            <Switch 
                                name="customizer.settings.remember_me_always_on"
                                checked={settingData?.customizer?.settings?.remember_me_always_on} // Pass "1"/"0" from API 
                                onChange={handleChange} 
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
                            <Switch 
                                name="customizer.settings.enable_registration_password"
                                checked={settingData?.customizer?.settings?.enable_registration_password} // Pass "1"/"0" from API 
                                onChange={handleChange} 
                            />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(CustomizerSettings);