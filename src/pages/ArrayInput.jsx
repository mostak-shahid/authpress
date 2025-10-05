import { __ } from "@wordpress/i18n";
import React, { useState } from 'react';
import Checkbox from '../components/Checkbox/Checkbox';
import Background from '../components/Background/Background';
import MultiSelect from '../components/MultiSelect/MultiSelect';
import NativeMultiSelect from '../components/NativeMultiSelect/NativeMultiSelect';
import Measurement from '../components/Measurement/Measurement';
import BoxShadow from '../components/BoxShadow/BoxShadow';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import LinkColor from "../components/LinkColor/LinkColor";
import Font from "../components/Font/Font";
import TextShadow from "../components/TextShadow/TextShadow";
import ColorPicker from "../components/Colorpicker/Colorpicker";
const ArrayInput = ({handleChange}) => {
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
                            : <h4>{__("TextShadow", "authpress")}</h4>
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
                            {console.log(settingData?.array_input?.rgba_color)}
                            <ColorPicker
                                // defaultValues={{ color: "#00ffcc", alpha: 0.8 }}
                                defaultValues={settingData?.array_input?.rgba_color}
                                name="array_input.rgba_color"
                                mood="rgba"
                                handleChange={handleChange}
                            />  
                            <hr />               
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
                            : <h4>{__("TextShadow", "authpress")}</h4>
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
                                    defaultValues={{
                                        offsetX: 2,
                                        offsetY: 2,
                                        blur: 5,
                                        color: "#ff00ff",
                                    }}
                                    name="array_input.text_shadow"
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
                                defaultValues={settingData?.array_input?.font}
                                name='array_input.font' 
                                handleChange={handleChange}
                                options = {['color', 'font-size', 'font-weight', 'font-style', 'font-variant', 'font-stretch', 'text-align', 'text-decoration', 'text-transform']}
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
                            : <h4>{__("Link Color", "authpress")}</h4>
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
                                name="array_input.link_color"
                                options={['normal', 'hover', 'active']}
                                defaultValues={settingData?.array_input?.link_color}
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
                                name="array_input.cardShadow"
                                defaultValues={{
                                    offsetX: 0,
                                    offsetY: 8,
                                    blur: 20,
                                    spread: 0,
                                    color: "rgba(0,0,0,0.25)",
                                    inset: false,
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
                            : <h4>{__("Measurement", "authpress")}</h4>
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
                                defaultValues={[]}
                                allowNegative={true}
                                name="array_input.padding"
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
                                defaultValues={settingData?.array_input?.background}
                                name="array_input.background"
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
                            : <h4>{__("Checkbox Input", "authpress")}</h4>
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
                            <Checkbox 
                                options={[
                                    { value: 'checkbox-1', label: 'Checkbox 1' },
                                    { value: 'checkbox-2', label: 'Checkbox 2' },
                                    { value: 'checkbox-3', label: 'Checkbox 3' },
                                    { value: 'checkbox-4', label: 'Checkbox 4' },
                                    { value: 'checkbox-5', label: 'Checkbox 5' }
                                ]}
                                defaultValues={settingData?.array_input?.checkbox_input}
                                name="array_input.checkbox_input"
                                handleChange= {handleChange}
                                type="block"
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
                            : <h4>{__("Multi Select Input", "authpress")}</h4>
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
                            <NativeMultiSelect 
                                options={[
                                    { value: 'select-1', label: 'Select 1' },
                                    { value: 'select-2', label: 'Select 2' },
                                    { value: 'select-3', label: 'Select 3' },
                                    { value: 'select-4', label: 'Select 4' },
                                    { value: 'select-5', label: 'Select 5' },
                                    { value: 'select-6', label: 'Select 6' },
                                    { value: 'select-7', label: 'Select 7' },
                                    { value: 'select-8', label: 'Select 8' },
                                    { value: 'select-9', label: 'Select 9' },
                                    { value: 'select-10', label: 'Select 10' }
                                ]}
                                defaultValues={settingData?.array_input?.multi_select_input}
                                name="array_input.multi_select_input"
                                size={6}
                                handleChange={handleChange}
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
                            : <h4>{__("Multi Select Input", "authpress")}</h4>
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
                            <MultiSelect 
                                options={[
                                    { value: 'select-1', label: 'Select 1' },
                                    { value: 'select-2', label: 'Select 2' },
                                    { value: 'select-3', label: 'Select 3' },
                                    { value: 'select-4', label: 'Select 4' },
                                    { value: 'select-5', label: 'Select 5' },
                                    { value: 'select-6', label: 'Select 6' },
                                    { value: 'select-7', label: 'Select 7' },
                                    { value: 'select-8', label: 'Select 8' },
                                    { value: 'select-9', label: 'Select 9' },
                                    { value: 'select-10', label: 'Select 10' }
                                ]}
                                // defaultValues={['javascript', 'python', 'rust']}
                                defaultValues={settingData?.array_input?.multi_select_input}
                                name="array_input.multi_select_input"
                                placeholder="Choose languages..."
                                handleChange= {handleChange}
                            />                            
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(ArrayInput);