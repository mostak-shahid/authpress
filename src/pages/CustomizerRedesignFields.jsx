import { __ } from "@wordpress/i18n";
import Switch from '../components/Switch/Switch';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import Measurement from "../components/Measurement/Measurement";
import Font from "../components/Font/Font";
import Border from "../components/Border/Border";
import Colorpicker from '../components/Colorpicker/Colorpicker';
import { 
    __experimentalUnitControl as UnitControl, 
    BoxControl,
    SelectControl,
    BorderBoxControl,
    __experimentalInputControl as InputControl,
    Panel, 
    PanelBody, 
    PanelRow,
    ToggleControl
} from '@wordpress/components';
import { UNITS, COLORS, DEFAULT_BORDER, FONT_SIZES } from '../lib/Constants';
const CustomizerRedesignFields = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    return (
        <>
            {/* {console.log(settingData?.customizer?.redesign?.logo)} */}
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Disable Remember Me?", "authpress")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-auto">
                            <ToggleControl
                                __nextHasNoMarginBottom
                                onChange={(value) => handleChange('customizer.redesign.fields.disable_remember_me', value)}
                                checked={settingData?.customizer?.redesign?.fields?.disable_remember_me} 
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
                                onChange={(value) => handleChange('customizer.redesign.fields.width', value)}
                                value={settingData?.customizer?.redesign?.fields?.width}
                                units={UNITS}
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
                                onChange={(value) => handleChange('customizer.redesign.fields.height', value)}
                                value={settingData?.customizer?.redesign?.fields?.height}
                                units={UNITS}
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
                                defaultValues={settingData?.customizer?.redesign?.fields?.font}
                                name='customizer.redesign.fields.font' 
                                handleChange={handleChange}
                                options = {['color', 'font-size', 'font-weight', 'font-style', 'text-transform']}
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
                                value={ settingData?.customizer?.redesign?.fields?.border }
                                onChange={(value) => handleChange('customizer.redesign.fields.border', value)}
                                
                            />
                            <UnitControl 
                                label={ __( 'Radius', 'authpress' ) }
                                __next40pxDefaultSize 
                                onChange={(value) => handleChange('customizer.redesign.fields.border_radius', value)}
                                value={ settingData?.customizer?.redesign?.fields?.border_radius }
                                units={UNITS}
                                min="0"
                                style={{marginTop: '10px'}}
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
                                values={settingData?.customizer?.redesign?.fields?.padding}
                                onChange={ (value) => handleChange('customizer.redesign.fields.padding', value) }
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
                                values={settingData?.customizer?.redesign?.fields?.margin}
                                onChange={ (value) => handleChange('customizer.redesign.fields.margin', value) }
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
                            : <h4>{__("Background Color", "authpress")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-auto">
                            <Colorpicker
                                defaultValue={settingData?.customizer?.redesign?.fields?.background_color}
                                handleChange={(value) => handleChange('customizer.redesign.fields.background_color', value)}
                                mode='color'
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
                            : <h4>{__("Disable Box Shadow?", "authpress")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-auto">
                            <ToggleControl
                                __nextHasNoMarginBottom
                                onChange={(value) => handleChange('customizer.redesign.fields.disable_box_shadow', value)}
                                checked={settingData?.customizer?.redesign?.fields?.disable_box_shadow}
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
                            : <h4>{__("Label", "authpress")}</h4>
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
                                defaultValues={settingData?.customizer?.redesign?.fields?.label_font}
                                name='customizer.redesign.fields.label_font' 
                                handleChange={handleChange}
                                options = {['color', 'font-size', 'font-weight', 'font-style', 'text-transform']}
                            />  
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(CustomizerRedesignFields);