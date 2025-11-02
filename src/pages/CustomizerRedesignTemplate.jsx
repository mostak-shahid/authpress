import { __ } from "@wordpress/i18n";
import React from 'react';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
const layouts = [
    'default-login', 'default-login-left', 'default-login-right'
];
const CustomizerRedesignTemplate = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    const onClick = (template) => {
        handleChange('customizer.redesign.templates',template);
        // Do some more task with template variable
    }
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
                            <div className="row">
                                {layouts.map((template) => (
                                    <div
                                        key={template}
                                        className="col-lg-4 mb-4"                                        
                                    >
                                        <img 
                                            style={{ cursor: "pointer" }} 
                                            className={`img-fluid border border-5 ${settingData?.customizer?.redesign?.templates == template ?'border-primary':''}`}
                                            src={`${authpress_ajax_obj.image_url}${template}.png`} alt=""
                                            data-src={template}
                                            onClick={ () => onClick(template) }
                                        />
                                    </div>
                                ))}
                            </div>                 
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(CustomizerRedesignTemplate, 'customizer.redesign.templates');