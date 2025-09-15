import { __ } from "@wordpress/i18n";
import React from 'react';
import Border from '../components/Border/Border';
import Measurement from '../components/Measurement/Measurement';
import Background from '../components/Background/Background';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import Accordion from 'react-bootstrap/Accordion';
const CustomizerRedesignForm = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    return (
        <>
            {/* {console.log(settingData)} */}
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{__('Form Wrapper', 'authpress')}</Accordion.Header>
                    <Accordion.Body>
                        <div className="setting-unit border-bottom py-4">
                            <div className="row justify-content-between">
                                <div className="col-lg-7">
                                    {
                                        settingLoading 
                                        ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                        : <h4>{__("Width", "authpress")}</h4>
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
                                                min="320"
                                                value={settingData?.customizer?.redesign?.form?.wrapper?.width}
                                                onChange={(e) => handleChange('customizer.redesign.form.wrapper.width', e.target.value)}
                                            /> 
                                            <span class="input-group-text">px</span>
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
                                            defaultValues={settingData?.customizer?.redesign?.form?.wrapper?.padding}
                                            allowNegative={true}
                                            name="customizer.redesign.form.wrapper.padding"
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
                                        : <h4>{__("Position", "authpress")}</h4>
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
                                            value={settingData?.customizer?.redesign?.form?.wrapper?.position} 
                                            onChange={(e) => handleChange('customizer.redesign.form.wrapper.position', e.target.value)}
                                        >
                                            <option value="left">{__('Left','authpress')}</option>
                                            <option value="center">{__('Center','authpress')}</option>
                                            <option value="right">{__('Right','authpress')}</option>
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
                                            defaultValues={settingData?.customizer?.redesign?.form?.wrapper?.background}
                                            name="customizer.redesign.form.wrapper.background"
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
                                             defaultValues={settingData?.customizer?.redesign?.form?.wrapper?.border}
                                            name="customizer.redesign.form.wrapper.border"
                                            handleChange={handleChange}
                                        />                          
                                    </div>
                                }
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>{__('Form', 'authpress')}</Accordion.Header>
                    <Accordion.Body>
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
                                            defaultValues={settingData?.customizer?.redesign?.form?.unit?.padding}
                                            allowNegative={true}
                                            name="customizer.redesign.form.unit.padding"
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
                                            defaultValues={settingData?.customizer?.redesign?.form?.unit?.background}
                                            name="customizer.redesign.form.unit.background"
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
                                             defaultValues={settingData?.customizer?.redesign?.form?.unit?.border}
                                            name="customizer.redesign.form.unit.border"
                                            handleChange={handleChange}
                                        />                          
                                    </div>
                                }
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

        </>
    )
}
export default withForm(CustomizerRedesignForm);