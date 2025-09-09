import { __ } from "@wordpress/i18n";
import React from 'react';
import Radio from '../components/Radio/Radio';
import Switch from '../components/Switch/Switch';
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
                                        : <h4>{__("Width, height, padding, background, border and border radious", "authpress")}</h4>
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
                                        <input 
                                            className="form-control"
                                            type="text"
                                            value={settingData?.customizer?.redesign?.form?.wrapper?.width}
                                            onChange={(e) => handleChange('customizer.redesign.form.wrapper.width', e.target.value)}
                                        />                          
                                    </div>
                                }
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Accordion Item #2</Accordion.Header>
                    <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

        </>
    )
}
export default withForm(CustomizerRedesignForm);