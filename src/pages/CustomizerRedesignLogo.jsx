import { __ } from "@wordpress/i18n";
import MediaUploaderControl from '../components/MediaUploaderControl/MediaUploaderControl';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import { 
    __experimentalUnitControl as UnitControl, 
    __experimentalInputControl as InputControl
} from '@wordpress/components';


const CustomizerRedesignLogo = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    const units = [
        { value: 'px', label: 'px' },
        { value: '%', label: '%' },
        { value: 'em', label: 'em' },
        { value: 'rem', label: 'rem' },
        { value: 'vw', label: 'vw' },
    ];
    return (
        <>
            {/* {console.log(settingData?.customizer?.redesign?.logo)} */}
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Upload Logo", "authpress")}</h4>
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
                            <MediaUploaderControl 
                                data={settingData?.customizer?.redesign?.logo?.image} 
                                name='customizer.redesign.logo.image' 
                                handleChange={handleChange}
                                options = {{
                                    frame:{
                                        title: __("Select or Upload Image", "authpress"),
                                    },
                                    library: {type: 'image'},
                                    buttons: {
                                        upload: __("Upload Image", "authpress"),
                                        remove: __("Remove", "authpress"),
                                        select: __("Use this image", "authpress")                                            
                                    }
                                }}
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
                                <UnitControl 
                                    __next40pxDefaultSize 
                                    label={__('Width', 'authpress')}
                                    onChange={(value) => handleChange('customizer.redesign.logo.width', value)}
                                    value={settingData?.customizer?.redesign?.logo?.width}
                                    units={units}
                                />
                            </div>   
                            <div className="mb-2 form-group">
                                <UnitControl 
                                    __next40pxDefaultSize 
                                    label={__('Height', 'authpress')}
                                    onChange={(value) => handleChange('customizer.redesign.logo.height', value)}
                                    value={settingData?.customizer?.redesign?.logo?.height}
                                    units={units}
                                />
    
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
                            : <h4>{__("Space below", "authpress")}</h4>
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
                                // label={__('Height', 'authpress')}
                                onChange={(value) => handleChange('customizer.redesign.logo.space', value)}
                                value={settingData?.customizer?.redesign?.logo?.space}
                                units={units}
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
                            : <h4>{__("Logo URL", "authpress")}</h4>
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
                            <InputControl
                                __next40pxDefaultSize
                                type="url"
                                value={settingData?.customizer?.redesign?.logo?.url}
                                onChange={(value) => handleChange('customizer.redesign.logo.url', value)}
                            />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(CustomizerRedesignLogo);