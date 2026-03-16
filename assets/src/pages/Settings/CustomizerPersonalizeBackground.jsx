import { __ } from "@wordpress/i18n";
import { Row, Col, Skeleton, Typography, Select, Input} from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ActionButtons from "./ActionButtons";
import {BackgroundControl, ColorPickerControl, SkeletonPlaceholder} from '../../components';

const { Title, Paragraph } = Typography;
const CustomizerPersonalizeBackground = () => {
    const { settings, settingsLoading, handleSubmit, handleReset } = useOutletContext();
    const [hasChanges, setHasChanges] = useState(false);
    const [localValues, setLocalValues] = useState({});
    const [originalValues, setOriginalValues] = useState({});

    useEffect(() => {
        if (settings && settings?.customizer?.redesign?.background) {
            const bgSettings = settings.customizer.redesign.background;
            setLocalValues({ ...bgSettings });
            setOriginalValues({ ...bgSettings });
            setHasChanges(false);
        }
    }, [settings]);

    const handleChange = (field, value) => {
        setLocalValues(prev => {
            const updated = { ...prev };
            const keys = field.split('.');
            if (keys.length === 1) {
                updated[keys[0]] = value;
            } else {
                if (!updated[keys[0]]) updated[keys[0]] = {};
                updated[keys[0]][keys[1]] = value;
            }
            const isChanged = JSON.stringify(updated) !== JSON.stringify(originalValues);
            setHasChanges(isChanged);
            return updated;
        });
    };

    const onSave = () => {
        const updatedSettings = {
            ...settings,
            customizer: {
                ...settings.customizer,
                redesign: {
                    ...settings.customizer.redesign,
                    background: localValues
                }
            }
        };
        handleSubmit('customizer', updatedSettings.customizer);
    };

    return (
        <>
            {console.log(localValues?.type)}
            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Background type", "authpress")}</Title>
                            <Paragraph>{__("Select the type of background you want to use", "authpress")}</Paragraph>
                        </Skeleton>
                    </Col>
                    {
                        !settingsLoading &&
                        <Col xs={24} lg={12} xl={10}>
                            <Select
                                noLabel
                                className="w-full"
                                placeholder={__("Background type", "authpress")}
                                value={localValues?.type}
                                optionList={[
                                    { label: 'Default', value: 'image' },
                                    { label: 'Video', value: 'video' },
                                ]}
                                onChange={(value) => handleChange('type', value)}
                            />
                        </Col>
                    }
                </Row>
            </div>
            {
            localValues?.type === 'image' &&
                <div className="setting-unit py-4">
                    <Row type="flex" gutter={[24, 24]}>
                        <Col xs={24} lg={12} xl={14}>
                            <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                <Title heading={4}>{__("Background Image", "authpress")}</Title>
                                <Paragraph>{__("Select the background image for your login page", "authpress")}</Paragraph>
                            </Skeleton>
                        </Col>
                        {
                            !settingsLoading &&
                            <Col xs={24} lg={12} xl={10}>
                                <BackgroundControl
                                    defaultValues={localValues?.background || {}}
                                    name="background"
                                    handleChange={handleChange}
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
                                />
                            </Col>
                        }
                    </Row>
                </div>
            }
            {
            localValues?.type === 'video' &&
                <div className="setting-unit py-4">
                    <Row type="flex" gutter={[24, 24]}>
                        <Col xs={24} lg={12} xl={14}>
                            <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                <Title heading={4}>{__("Background Video", "authpress")}</Title>
                                <Paragraph>{__("Select the background video for your login page", "authpress")}</Paragraph>
                            </Skeleton>
                        </Col>
                        {
                            !settingsLoading &&
                            <Col xs={24} lg={12} xl={10}>
                                <Input
                                    placeholder={__("Youtube or Vimeo video URL", "authpress")}
                                    type="url"
                                    showClear
                                    value={localValues?.video || ''}
                                    onChange={(value) => handleChange('video', value)}
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
                            <Paragraph>{__("Select the background overlay for your login page", "authpress")}</Paragraph>
                        </Skeleton>
                        </Col>
                    {
                        !settingsLoading &&
                        <Col xs={24} lg={12} xl={10}>
                            <ColorPickerControl
                                defaultValue={localValues?.overlay || ''}
                                handleChange={(value) => handleChange('overlay', value)}
                                mode='color'
                            />
                        </Col>
                    }
                </Row>
            </div>
            <ActionButtons hasChanges={hasChanges} section='customizer.redesign.background' handleReset={handleReset} onSave={onSave} />
        </>
    );
};

export default CustomizerPersonalizeBackground;
