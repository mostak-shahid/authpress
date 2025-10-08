import { __ } from "@wordpress/i18n";
import Font from '../components/Font/Font';
import LinkColor from '../components/LinkColor/LinkColor';
import BoxShadow from '../components/BoxShadow/BoxShadow';
import TextShadow from '../components/TextShadow/TextShadow';
import FontControl from '../components/FontControl/FontControl';
import BoxShadowControl from '../components/BoxShadowControl/BoxShadowControl';
import TextShadowControl from '../components/TextShadowControl/TextShadowControl';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import { UNITS, COLORS, DEFAULT_BORDER, FONT_SIZES } from '../lib/Constants';
import { 
    AlignmentMatrixControl, 
    AnglePickerControl,
    BorderBoxControl,
    BorderControl,
    BoxControl,
    DatePicker,
    DateTimePicker,
    ColorIndicator,
    ColorPalette,
    ColorPicker,
    GradientPicker,
    MenuGroup,
    MenuItem,
    FontSizePicker,
    SelectControl,
    __experimentalNavigation as Navigation,
    __experimentalNavigationGroup as NavigationGroup,
    __experimentalNavigationItem as NavigationItem,
    __experimentalNavigationMenu as NavigationMenu,
    __experimentalUnitControl as UnitControl, 
} from '@wordpress/components';
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
                            <BoxControl
                                __next40pxDefaultSize
                                values={ settingData?.customizer?.redesign?.button?.padding }
                                onChange={ (value) => handleChange('customizer.redesign.button.padding', value) }
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
                                values={ settingData?.customizer?.redesign?.button?.margin }
                                onChange={ (value) => handleChange('customizer.redesign.button.margin', value) }
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
                                value={ settingData?.customizer?.redesign?.button?.border }
                                onChange={(value) => handleChange('customizer.redesign.button.border', value)}
                                
                            />
                            <UnitControl 
                                label={ __( 'Radius', 'authpress' ) }
                                __next40pxDefaultSize 
                                onChange={(value) => handleChange('customizer.redesign.button.border_radius', value)}
                                value={ settingData?.customizer?.redesign?.button?.border_radius }
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
                            <SelectControl
                                // label="Size"
                                value={settingData?.customizer?.redesign?.button?.width}
                                options={ [
                                    { label: __('Auto','authpress'), value: 'auto' },
                                    { label: __('Full Width','authpress'), value: 'full' },
                                ] }
                                onChange={ ( newValue ) => handleChange('customizer.redesign.button.width', newValue ) }
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            />                       
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(CustomizerRedesignButton);