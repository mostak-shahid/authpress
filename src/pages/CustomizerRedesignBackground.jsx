import { __ } from "@wordpress/i18n";
import React from 'react';
import Gradient from '../components/Gradient/Gradient';
import Background from '../components/Background/Background';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
const CustomizerRedesignBackground = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    return (
        <>
            {/* {console.log(settingData)} */}
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Background type", "authpress")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                        }
                    </div>    
                    {
                        // color, gradient, image, video
                        !settingLoading &&                               
                        <div className="col-lg-5">                            
                            <select 
                                className="form-select"
                                value={settingData?.customizer?.background?.type} 
                                onChange={(e) => handleChange('customizer.background.type', e.target.value)}
                            >
                                <option value="image">{__('Image', 'authpress')}</option>
                                <option value="gradient">{__('Gradient', 'authpress')}</option>
                                <option value="video">{__('Video', 'authpress')}</option>
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
                            : <h4>{__("Background Image", "authpress")}</h4>
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
                            <Background
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
                                defaultValues={settingData?.customizer?.background?.background}
                                name="customizer.background.background"
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
                            : <h4>{__("Background Gradient", "authpress")}</h4>
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
                            <Gradient
                                name="customizer.background.gradient"
                                defaultValues={{
                                    type: "linear",
                                    angle: 90,
                                    stops: [
                                        { color: "#ef709b", position: 0 },
                                        { color: "#fa9372", position: 100 },
                                    ],
                                }}
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
                            : <h4>{__("Background Video", "authpress")}</h4>
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
                                <span class="input-group-text"><span class="dashicons dashicons-format-video"></span></span>
                                <input 
                                    className="form-control"
                                    type="url"
                                    value={settingData?.customizer?.background?.video}
                                    onChange={(e) => handleChange('customizer.background.video', e.target.value)}
                                />
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
                            : <h4>{__("Background Overlay", "authpress")}</h4>
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
                            <div class="mb-2">
                                <label htmlFor="customizer-background-overlay-color">{__('Color', 'authpress')}</label>
                                <input 
                                    id="customizer-background-overlay-color"
                                    className="form-control"
                                    type="color"
                                    value={settingData?.customizer?.background?.overlay?.color}
                                    onChange={(e) => handleChange('customizer.background.overlay.color', e.target.value)}
                                /> 
                            </div>  
                            <div class="mb-2">
                                <label htmlFor="customizer-background-overlay-opacity">{__('Opacity', 'authpress')}</label>
                                <input 
                                    id="customizer-background-overlay-opacity"
                                    className="form-control"
                                    type="number"
                                    value={settingData?.customizer?.background?.overlay?.opacity}
                                    onChange={(e) => handleChange('customizer.background.overlay.opacity', e.target.value)}
                                    min="0"
                                    max="100"
                                    step="1"
                                /> 
                            </div>                           
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(CustomizerRedesignBackground);