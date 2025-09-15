import { __ } from "@wordpress/i18n";
import React from 'react';
import MediaUploader from '../components/MediaUploader/MediaUploader';
import Switch from '../components/Switch/Switch';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
const CustomizerRedesignFields = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    return (
        <>
            {/* {console.log(settingData?.customizer?.redesign?.logo)} */}
            <ul>
                <li>Disable Remember Me?</li>
                <li>Width</li>
                <li>Font Size</li>
                <li>Border</li>
                <li>Disable Box Shadow?</li>
                <li>Margin</li>
                <li>Padding</li>
                <li>Background</li>
                <li>Text Color</li>
                <li>Label Color</li>
                <li>Label Font Size</li>
            </ul>
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
        </>
    )
}
export default withForm(CustomizerRedesignFields);