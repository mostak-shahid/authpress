import '@coreui/icons/css/all.css';
import { __ } from "@wordpress/i18n";
import React from 'react';
import MediaUploaderControl from '../components/MediaUploaderControl/MediaUploaderControl';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import BackgroundControl from '../components/BackgroundControl/BackgroundControl';
const ComponentsAdvanced = ({handleChange}) => {
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
                            : <h4>{__("BackgroundControl", "authpress")}</h4>
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
                            <BackgroundControl
                                options={[
                                    "image",
                                    "color",
                                    "position",
                                    "size",
                                    "repeat",
                                    "origin",
                                    "clip",
                                    "attachment",
                                ]}
                                defaultValues={settingData?.customizer?.redesign?.background?.background}
                                name="customizer.redesign.background.background"
                                handleChange={handleChange}
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
                            : <h4>{__("Media Uploader", "authpress")}</h4>
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
                            <MediaUploaderControl 
                                data={settingData?.components?.advanced?.media_uploader} 
                                name='components.advanced.media_uploader' 
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
                            : <h4>{__("Media Uploader", "authpress")}</h4>
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
                            <MediaUploaderControl 
                                data={settingData?.components?.advanced?.media_uploader} 
                                name='components.advanced.media_uploader' 
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
        </>
    )
}
export default withForm(ComponentsAdvanced);