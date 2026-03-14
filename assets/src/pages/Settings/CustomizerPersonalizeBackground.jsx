import { __ } from "@wordpress/i18n";
import { Form, Row, Col, Skeleton, Typography} from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import ActionButtons from "./ActionButtons";
import {BackgroundControl, ColorPickerControl, SkeletonPlaceholder} from '../../components';

const { Title, Paragraph } = Typography;
const CustomizerPersonalizeBackground = () => {
    const { settings, settingsLoading, handleSubmit, handleReset } = useOutletContext();
    const [hasChanges, setHasChanges] = useState(false);
    const settingsOld = useRef(null);

    const onSubmit = (values) => {
        const updatedSettings = {
            ...settings,
            customizer: {
                ...settings.customizer,
                redesign: {
                    ...settings.customizer.redesign,
                    background: values
                }
            }
        };
        handleSubmit('customizer', updatedSettings.customizer);
    };

    const handleValuesChange = (values) => {
        if (settingsOld.current && settings?.customizer?.redesign?.background) {
            const isChanged = JSON.stringify(values) !== JSON.stringify(settingsOld.current.customizer?.redesign?.background);
            setHasChanges(isChanged);
        }
    };

    useEffect(() => {
        if (settings && settings?.customizer?.redesign?.background) {
            settingsOld.current = { ...settings };
            setHasChanges(false);
        }
    }, [settings]);

    return (
        <>
            {/* {console.log(settings.basic)} */}
            {!settingsLoading && settings?.customizer?.redesign?.background && (
                <Form
                    initValues={settings.customizer.redesign.background}
                    onSubmit={onSubmit}
                    onValueChange={handleValuesChange}
                    labelPosition="left"
                    labelWidth="150px"
                >
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                    <Title heading={4}>{__("Background type", "authpress")}</Title>
                                    <Paragraph>{__("Lorem", "authpress")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingsLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <Form.Select 
                                        noLabel
                                        field="type"
                                        className="w-full"
                                        placeholder={__("Background type", "authpress")} 
                                        optionList={[
                                            { label: 'Image', value: 'image' },
                                            { label: 'Gradient', value: 'gradient' },
                                            { label: 'Video', value: 'video' },
                                        ]}
                                        // onChange={ ( changedValue ) => handleChange('customizer.redesign.background.type', changedValue ) }
                                        // value={ settingData?.customizer?.redesign?.background?.type }
                                    />
                                </Col>
                            }
                        </Row>
                    </div>
                    {
                    settings?.customizer?.redesign?.background?.type === 'image' &&
                        <div className="setting-unit py-4">
                            <Row type="flex" gutter={[24, 24]}>
                                <Col xs={24} lg={12} xl={14}>
                                    <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                        <Title heading={4}>{__("Background Image", "authpress")}</Title>
                                        <Paragraph>{__("Lorem", "authpress")}</Paragraph>
                                    </Skeleton>
                                </Col>    
                                {
                                    !settingsLoading &&                               
                                    <Col xs={24} lg={12} xl={10}>
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
                                            // defaultValues={settingData?.customizer?.redesign?.background?.background}
                                            // name="customizer.redesign.background.background"
                                            // handleChange={handleChange}
                                        /> 
                                    </Col>
                                }
                            </Row>
                        </div>
                    }
                    {
                    settings?.customizer?.redesign?.background?.type === 'gradient' &&
                        <div className="setting-unit py-4">
                            <Row type="flex" gutter={[24, 24]}>
                                <Col xs={24} lg={12} xl={14}>
                                    <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                        <Title heading={4}>{__("Background Gradient", "authpress")}</Title>
                                        <Paragraph>{__("Lorem", "authpress")}</Paragraph>
                                    </Skeleton>
                                </Col>    
                                {
                                    !settingsLoading &&                               
                                    <Col xs={24} lg={12} xl={10}>
                                        <ColorPickerControl
                                        // defaultValue={settingData?.customizer?.redesign?.background?.background?.color}
                                        // handleChange={(value) => handleChange('customizer.redesign.background.background.color', value)}
                                        mode='gradient'
                                    />   
                                    </Col>
                                }
                            </Row>
                        </div>
                    }
                    {
                    settings?.customizer?.redesign?.background?.type === 'video' &&
                        <div className="setting-unit py-4">
                            <Row type="flex" gutter={[24, 24]}>
                                <Col xs={24} lg={12} xl={14}>
                                    <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                        <Title heading={4}>{__("Background Gradient", "authpress")}</Title>
                                        <Paragraph>{__("Lorem", "authpress")}</Paragraph>
                                    </Skeleton>
                                </Col>    
                                {
                                    !settingsLoading &&                               
                                    <Col xs={24} lg={12} xl={10}>
                                        <Form.Input 
                                            placeholder={__("Youtube or Vimeo video URL", "authpress")}
                                            noLabel
                                            field="video"
                                            type="url"
                                            showClear 
                                            defaultValue='click to clear'
                                            // value={settingData?.customizer?.redesign?.background?.video}
                                            // onChange={(value) => handleChange('customizer.redesign.background.video', value)}
                                        />   
                                    </Col>
                                }
                            </Row>
                        </div>
                    }
                    <div className="setting-unit pt-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                    <Title heading={4}>{__("Background Overlay", "authpress")}</Title>
                                    <Paragraph>{__("Lorem", "authpress")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingsLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <ColorPickerControl
                                        // defaultValue={settingData?.customizer?.redesign?.background?.overlay}
                                        // handleChange={(value) => handleChange('customizer.redesign.background.overlay', value)}
                                        mode='color'
                                    />  
                                </Col>
                            }
                        </Row>
                    </div>
                    <ActionButtons hasChanges={hasChanges} section='customizer.redesign.background' handleReset={handleReset} />
                </Form>
            )}
        </>
    );
};

export default CustomizerPersonalizeBackground;