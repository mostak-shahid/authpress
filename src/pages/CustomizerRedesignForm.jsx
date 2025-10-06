import { __ } from "@wordpress/i18n";
import Border from '../components/Border/Border';
import Measurement from '../components/Measurement/Measurement';
import Background from '../components/Background/Background';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import Accordion from 'react-bootstrap/Accordion';
import {useState} from 'react';
import { 
    __experimentalUnitControl as UnitControl, 
    BoxControl,
    SelectControl,
    BorderBoxControl,
    __experimentalInputControl as InputControl,
    Panel, 
    PanelBody, 
    PanelRow
} from '@wordpress/components';
import { more } from '@wordpress/icons';
const colors = [
    { name: 'Blue 20', color: '#72aee6' },
    { name: 'Pink Flare', color: '#E1C0C8' },
    { name: 'Carissma', color: '#EA88A8' },
    { name: 'Ash', color: '#A09998' },
];
const CustomizerRedesignForm = ({handleChange}) => {
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
    const defaultBorder = {
        color: '#72aee6',
        style: 'dashed',
        width: '1px',
    };
    const [ borders, setBorders ] = useState( {
        top: defaultBorder,
        right: defaultBorder,
        bottom: defaultBorder,
        left: defaultBorder,
    } );
    const onBorderChange = ( newBorders ) => setBorders( newBorders );
    const [ border, setBorder ] = useState();
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
                                        <UnitControl 
                                            __next40pxDefaultSize 
                                            onChange={(value) => handleChange('customizer.redesign.form.wrapper.width', value)}
                                            value={settingData?.customizer?.redesign?.form?.wrapper?.width}
                                            units={units}
                                            min="320"
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
                                        <BorderBoxControl
                                            label={ __( 'Borders', 'authpress' ) }
                                            __next40pxDefaultSize
                                            colors={ colors }
                                            value={ settingData?.customizer?.redesign?.form?.wrapper?.border }
                                            onChange={(value) => handleChange('customizer.redesign.form.wrapper.border', value)}
                                            
                                        />
                                        <UnitControl 
                                            label={ __( 'Radius', 'authpress' ) }
                                            __next40pxDefaultSize 
                                            onChange={(value) => handleChange('customizer.redesign.form.wrapper.border_radius', value)}
                                            value={ settingData?.customizer?.redesign?.form?.wrapper?.border_radius }
                                            units={units}
                                            min="0"
                                            style={{marginTop: '10px'}}
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
            <Panel>
                <PanelBody title="Form Wrapper" initialOpen={ true }>
                    <PanelRow>My Panel Inputs and Labels</PanelRow>
                </PanelBody>
                <PanelBody title={__('Form', 'authpress')} initialOpen={ false }>
                    <PanelRow>My Panel Inputs and Labels</PanelRow>
                </PanelBody>
            </Panel>

        </>
    )
}
export default withForm(CustomizerRedesignForm);