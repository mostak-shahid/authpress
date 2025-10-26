import { __ } from "@wordpress/i18n";
import BackgroundControl from '../components/BackgroundControl/BackgroundControl';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import {useState} from 'react';
import { 
    __experimentalUnitControl as UnitControl, 
    BoxControl,
    SelectControl,
    BorderBoxControl,
    Panel, 
    PanelBody, 
    PanelRow,
    ToggleControl
} from '@wordpress/components';
import { UNITS, COLORS, DEFAULT_BORDER, FONT_SIZES } from '../lib/Constants';

const CustomizerRedesignForm = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    const [ hasFixedBackground, setHasFixedBackground ] = useState( false );

    return (
        <>
            {/* {console.log(settingData)} */}
            <Panel>
                <PanelBody title={__('Form Wrapper', 'authpress')} initialOpen={ true } style={{marginBottom: '0px'}}>
                    <PanelRow>
                        <div className="panel-wrapper">
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
                                            <UnitControl 
                                                __next40pxDefaultSize 
                                                onChange={(value) => handleChange('customizer.redesign.form.wrapper.width', value)}
                                                value={settingData?.customizer?.redesign?.form?.wrapper?.width}
                                                units={UNITS}
                                                min="0"
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
                                            : <h4>{__("Height", "authpress")}</h4>
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
                                            <UnitControl 
                                                __next40pxDefaultSize 
                                                onChange={(value) => handleChange('customizer.redesign.form.wrapper.height', value)}
                                                value={settingData?.customizer?.redesign?.form?.wrapper?.height}
                                                units={UNITS}
                                                min="0"
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
                                            <BoxControl
                                                __next40pxDefaultSize
                                                values={ settingData?.customizer?.redesign?.form?.wrapper?.margin }
                                                onChange={ (value) => handleChange('customizer.redesign.form.wrapper.margin', value) }
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
                                            <BoxControl
                                                __next40pxDefaultSize
                                                values={ settingData?.customizer?.redesign?.form?.wrapper?.padding }
                                                onChange={ (value) => handleChange('customizer.redesign.form.wrapper.padding', value) }
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
                                            <SelectControl
                                                // label="Size"
                                                value={ settingData?.customizer?.redesign?.form?.wrapper?.position }
                                                options={ [
                                                    { label: __('Left','authpress'), value: 'left' },
                                                    { label: __('Center','authpress'), value: 'center' },
                                                    { label: __('Right','authpress'), value: 'right' },
                                                ] }
                                                onChange={ ( newValue ) => handleChange('customizer.redesign.form.wrapper.position', newValue ) }
                                                __next40pxDefaultSize
                                                __nextHasNoMarginBottom
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
                                            <BorderBoxControl
                                                label={ __( 'Borders', 'authpress' ) }
                                                __next40pxDefaultSize
                                                colors={ COLORS }
                                                value={ settingData?.customizer?.redesign?.form?.wrapper?.border }
                                                onChange={(value) => handleChange('customizer.redesign.form.wrapper.border', value)}
                                                
                                            />
                                            <UnitControl 
                                                label={ __( 'Radius', 'authpress' ) }
                                                __next40pxDefaultSize 
                                                onChange={(value) => handleChange('customizer.redesign.form.wrapper.border_radius', value)}
                                                value={ settingData?.customizer?.redesign?.form?.wrapper?.border_radius }
                                                units={UNITS}
                                                min="0"
                                                style={{marginTop: '10px'}}
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
                                            : <h4>{__("Glass Effect", "authpress")}</h4>
                                        }
                                        {
                                            settingLoading 
                                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                        }
                                    </div>    
                                    {
                                        !settingLoading &&                               
                                        <div className="col-lg-auto">
                                            <ToggleControl
                                                __nextHasNoMarginBottom
                                                onChange={(value) => handleChange('customizer.redesign.form.wrapper.glass_effect', value)}
                                                checked={ settingData?.customizer?.redesign?.form?.wrapper?.glass_effect }
                                            />                        
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </PanelRow>
                </PanelBody>
                <PanelBody title={__('Form', 'authpress')} initialOpen={ false } style={{marginBottom: '0px'}}>
                    <PanelRow>
                        <div className="panel-wrapper">
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
                                            <BoxControl
                                                __next40pxDefaultSize
                                                values={ settingData?.customizer?.redesign?.form?.unit?.margin}
                                                onChange={ (value) => handleChange('customizer.redesign.form.unit.margin', value) }
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
                                            <BoxControl
                                                __next40pxDefaultSize
                                                values={ settingData?.customizer?.redesign?.form?.unit?.padding}
                                                onChange={ (value) => handleChange('customizer.redesign.form.unit.padding', value) }
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
                                            {console.log(settingData?.customizer?.redesign?.form?.unit?.border)}
                                            <BorderBoxControl
                                                label={ __( 'Borders', 'authpress' ) }
                                                __next40pxDefaultSize
                                                colors={ COLORS }
                                                value={ settingData?.customizer?.redesign?.form?.unit?.border }
                                                onChange={(value) => handleChange('customizer.redesign.form.unit.border', value)}
                                                
                                            />
                                            <UnitControl 
                                                label={ __( 'Radius', 'authpress' ) }
                                                __next40pxDefaultSize 
                                                onChange={(value) => handleChange('customizer.redesign.form.unit.border_radius', value)}
                                                value={ settingData?.customizer?.redesign?.form?.unit?.border_radius }
                                                units={UNITS}
                                                min="0"
                                                style={{marginTop: '10px'}}
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
                                            : <h4>{__("Glass Effect", "authpress")}</h4>
                                        }
                                        {
                                            settingLoading 
                                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                        }
                                    </div>    
                                    {
                                        !settingLoading &&                               
                                        <div className="col-lg-auto">
                                            <ToggleControl
                                                __nextHasNoMarginBottom
                                                onChange={(value) => handleChange('customizer.redesign.form.unit.glass_effect', value)}
                                                checked={ settingData?.customizer?.redesign?.form?.unit?.glass_effect }
                                            />                        
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </PanelRow>
                </PanelBody>
            </Panel>

        </>
    )
}
export default withForm(CustomizerRedesignForm);