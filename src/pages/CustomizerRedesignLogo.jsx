import { __ } from "@wordpress/i18n";
import React from 'react';
import MediaUploader from '../components/MediaUploader/MediaUploader';
import Switch from '../components/Switch/Switch';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
const CustomizerRedesignLogo = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    return (
        <>
            {/* {console.log(settingData?.customizer?.redesign?.logo)} */}
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Upload Logo", "authpress")}</h4>
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
                            <MediaUploader 
                                data={settingData?.customizer?.redesign?.logo?.image} 
                                name='customizer.redesign.logo.image' 
                                handleChange={handleChange}
                                options = {{
                                    frame:{
                                        title: __("Select or Upload Image", "authpress"),
                                    },
                                    library: {type: 'image'},
                                    buttons: {
                                        upload: __("Upload Image", "authpress"),
                                        remove: __("Remove", "authpress"),
                                        select: __("Use this image", "authpress")                                            
                                    }
                                }}
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
                            : <h4>{__("Logo Size", "authpress")}</h4>
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
                            <div className="mb-2 form-group">
                                <label htmlFor="customizer-logo-width">{__('Width', 'authpress')}</label>
                                <div class="input-group">                                
                                    <input 
                                        id="customizer-logo-width"
                                        className="form-control"
                                        type="number"
                                        value={settingData?.customizer?.redesign?.logo?.width}
                                        min="0"
                                        onChange={(e) => handleChange('customizer.redesign.logo.width', e.target.value)}
                                    /> 
                                    <span class="input-group-text">px</span>
                                </div> 
                            </div>   
                            <div className="mb-2 form-group">
                                <label htmlFor="customizer-logo-height">{__('Height', 'authpress')}</label>
                                <div class="input-group">                                
                                    <input 
                                        id="customizer-logo-height"
                                        className="form-control"
                                        type="number"
                                        value={settingData?.customizer?.redesign?.logo?.height}
                                        min="0"
                                        onChange={(e) => handleChange('customizer.redesign.logo.height', e.target.value)}
                                    /> 
                                    <span class="input-group-text">px</span>
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
                            : <h4>{__("Space below", "authpress")}</h4>
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
                            <div class="input-group">                                
                                <input 
                                    className="form-control"
                                    type="number"
                                    value={settingData?.customizer?.redesign?.logo?.space}
                                    onChange={(e) => handleChange('customizer.redesign.logo.space', e.target.value)}
                                />  
                                <span class="input-group-text">px</span>
                            </div>                                                     
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
                            : <h4>{__("Logo URL", "authpress")}</h4>
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
                            <div class="input-group">  
                                <span class="input-group-text"><span class="dashicons dashicons-admin-links"></span></span>                              
                                <input 
                                    className="form-control"
                                    type="url"
                                    value={settingData?.customizer?.redesign?.logo?.url}
                                    onChange={(e) => handleChange('customizer.redesign.logo.url', e.target.value)}
                                />  
                            </div>                          
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(CustomizerRedesignLogo);