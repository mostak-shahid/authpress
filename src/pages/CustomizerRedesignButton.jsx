import { __ } from "@wordpress/i18n";
import React from 'react';
import MediaUploader from '../components/MediaUploader/MediaUploader';
import Switch from '../components/Switch/Switch';
import Font from '../components/Font/Font';
import LinkColor from '../components/LinkColor/LinkColor';
import Measurement from '../components/Measurement/Measurement';
import Border from '../components/Border/Border';
import BoxShadow from '../components/BoxShadow/BoxShadow';
import TextShadow from '../components/TextShadow/TextShadow';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
const CustomizerRedesignButton = ({handleChange}) => {
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
                                defaultValues={settingData?.customizer?.redesign?.button?.font}
                                name='customizer.redesign.button.font' 
                                handleChange={handleChange}
                                options = {['font-size', 'font-weight', 'font-style', 'text-transform']}
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
                            : <h4>{__("Background", "authpress")}</h4>
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
                            <LinkColor
                                name='customizer.redesign.button.background'
                                options={['normal', 'hover', 'active']}
                                defaultValues={settingData?.customizer?.redesign?.button?.background}
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
                            : <h4>{__("Background", "authpress")}</h4>
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
                            <LinkColor
                                name='customizer.redesign.button.color'
                                options={['normal', 'hover', 'active']}
                                defaultValues={settingData?.customizer?.redesign?.button?.color}
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
                            : <h4>{__("Padding", "authpress")}</h4>
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
                            <Measurement
                                options={[
                                    "top",
                                    "right",
                                    "bottom",
                                    "left",
                                    "unit",
                                ]}
                                defaultValues={settingData?.customizer?.redesign?.button?.padding}
                                // allowNegative={true}
                                name="customizer.redesign.button.padding"
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
                            : <h4>{__("Margin", "authpress")}</h4>
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
                            <Measurement
                                options={[
                                    "top",
                                    "right",
                                    "bottom",
                                    "left",
                                    "unit",
                                ]}
                                defaultValues={settingData?.customizer?.redesign?.button?.margin}
                                allowNegative={true}
                                name="customizer.redesign.button.margin"
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
                            : <h4>{__("Border", "authpress")}</h4>
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
                            <Border 
                                options={[
                                    'width',
                                    'style',
                                    'color',
                                    'radius'
                                ]}
                                defaultValues={settingData?.customizer?.redesign?.button?.border}
                                name="customizer.redesign.button.border"
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
                            : <h4>{__("Box Shadow", "authpress")}</h4>
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
                            <BoxShadow
                                name="customizer.redesign.button.boxshadow"
                                defaultValues={settingData?.customizer?.redesign?.button?.boxshadow}
                                // defaultValues={{
                                //     offsetX: 0,
                                //     offsetY: 8,
                                //     blur: 20,
                                //     spread: 0,
                                //     color: "rgba(0,0,0,0.25)",
                                //     inset: false,
                                // }}
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
                            : <h4>{__("Text Shadow", "authpress")}</h4>
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
                                <TextShadow
                                    options={["offsetX", "offsetY", "blur", "color"]}
                                    // defaultValues={{
                                    //     offsetX: 2,
                                    //     offsetY: 2,
                                    //     blur: 5,
                                    //     color: "#ff00ff",
                                    // }}
                                    name="customizer.redesign.button.textshadow"
                                    defaultValues={settingData?.customizer?.redesign?.button?.textshadow}
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
                            : <h4>{__("Button Size", "authpress")}</h4>
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
                                value={settingData?.customizer?.redesign?.button?.width}
                                onChange={(e) => handleChange('customizer.redesign.button.width', e.target.value)}
                            >
                                <option value="auto">{__("Auto", "authpress")}</option>
                                <option value="full">{__("Full Width", "authpress")}</option>
                            </select>                         
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(CustomizerRedesignButton);