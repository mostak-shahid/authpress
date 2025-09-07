import { __ } from "@wordpress/i18n";
import React from 'react';
import Radio from '../components/Radio/Radio';
import Switch from '../components/Switch/Switch';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
const CustomizerRedesignTemplate = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    return (
        <>
            {/* {console.log(settingData)} */}
            <div className="setting-unit pt-4">
                <div className="row justify-content-between">
                    <div className="col-lg-12">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("This will be a image selector field, default will be none", "authpress")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-12 mt-4">
                            <Radio
                                defaultValue={settingData?.customizer?.redesign?.templates}
                                // defaultValue='radio-1'
                                options={[
                                    { value: 'default-login', label: `<img class="img-fluid" src="${authpress_ajax_obj.image_url}default-login.png" alt=""  />` },
                                    { value: 'default-login-left', label: `<img class="img-fluid" src="${authpress_ajax_obj.image_url}default-login-left.png" alt=""  />` },
                                    { value: 'default-login-right', label: `<img class="img-fluid" src="${authpress_ajax_obj.image_url}default-login-right.png" alt=""  />` },
                                ]}
                                name="customizer.redesign.templates"
                                handleChange= {handleChange}
                                type="inline" // block
                                hasMedia="1"
                            />                           
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(CustomizerRedesignTemplate);