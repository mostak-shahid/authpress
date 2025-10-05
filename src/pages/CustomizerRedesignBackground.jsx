import { __ } from "@wordpress/i18n";
import Background from '../components/Background/Background';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import { SelectControl } from '@wordpress/components';
import Colorpicker from '../components/Colorpicker/Colorpicker';
import { TextControl } from '@wordpress/components';
const CustomizerRedesignBackground = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    return (
        <>
            {/* {console.log(settingData)} */}
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Background type", "authpress")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                        }
                    </div>    
                    {
                        // color, gradient, image, video
                        !settingLoading &&                               
                        <div className="col-lg-5">    
                            <SelectControl
                                // label="Size"
                                value={ settingData?.customizer?.redesign?.background?.type }
                                options={ [
                                    { label: 'Image', value: 'image' },
                                    { label: 'Gradient', value: 'gradient' },
                                    { label: 'Video', value: 'video' },
                                ] }
                                onChange={ ( newSize ) => handleChange('customizer.redesign.background.type', newSize ) }
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            />                         
                        </div>
                    }
                </div>
            </div>

{
                settingData?.customizer?.redesign?.background?.type === 'image' &&
            
                    <div className="setting-unit border-bottom py-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Background Image", "authpress")}</h4>
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
                                        defaultValues={settingData?.customizer?.redesign?.background?.background}
                                        name="customizer.redesign.background.background"
                                        handleChange={handleChange}
                                    />                          
                                </div>
                            }
                        </div>
                    </div>
            }
            {
                settingData?.customizer?.redesign?.background?.type === 'gradient' &&
                    <div className="setting-unit border-bottom py-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Background Gradient", "authpress")}</h4>
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
                                    <Colorpicker
                                        defaultValue={settingData?.customizer?.redesign?.background?.background?.color}
                                        handleChange={(value) => handleChange('customizer.redesign.background.background.color', value)}
                                        mode='gradient'
                                    />                        
                                </div>
                            }
                        </div>
                    </div>
            }
            {
                settingData?.customizer?.redesign?.background?.type === 'video' &&                
                    <div className="setting-unit border-bottom py-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Background Video", "authpress")}</h4>
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
                                    <TextControl
                                        placeholder="Youtube or Vimeo video URL"
                                        type="url"
                                        value={settingData?.customizer?.redesign?.background?.video}
                                        onChange={(value) => handleChange('customizer.redesign.background.video', value)}
                                    />                           
                                </div>
                            }
                        </div>
                    </div>                    
            }
            <div className="setting-unit pt-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Background Overlay", "authpress")}</h4>
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
                            <Colorpicker
                                defaultValue={settingData?.customizer?.redesign?.background?.overlay}
                                handleChange={(value) => handleChange('customizer.redesign.background.overlay', value)}
                                mode='color'
                            />                           
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(CustomizerRedesignBackground);