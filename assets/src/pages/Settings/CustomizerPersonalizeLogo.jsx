import { __ } from "@wordpress/i18n";
import { Row, Col, Skeleton, Typography, Switch, Input} from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ActionButtons from "./ActionButtons";
import { MediaUploaderControl, SkeletonPlaceholder, UnitControl } from "../../components";
import ImageSelectorStandalone from "../../components/ImageSelector/ImageSelector";

const { Title, Paragraph } = Typography;
const CustomizerPersonalizeLogo = () => {
   const { settings, settingsLoading, handleSubmit, handleReset } = useOutletContext();
   const [hasChanges, setHasChanges] = useState(false);
   const [localValues, setLocalValues] = useState({});
   const [originalValues, setOriginalValues] = useState({});

   useEffect(() => {
       if (settings && settings?.customizer?.redesign?.logo) {
           const logoSettings = settings.customizer.redesign.logo;
           setLocalValues({ ...logoSettings });
           setOriginalValues({ ...logoSettings });
           setHasChanges(false);
       }
   }, [settings]);

   const handleChange = (field, value) => {
       setLocalValues(prev => {
           const updated = { ...prev, [field]: value };
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
                   logo: localValues
               }
           }
       };
       handleSubmit('customizer', updatedSettings.customizer);
   };

    const units = [
        { value: 'px', label: 'px' },
        { value: '%', label: '%' },
        { value: 'em', label: 'em' },
        { value: 'rem', label: 'rem' },
        { value: 'vw', label: 'vw' },
    ];

   return (
        <>
                   <div className="setting-unit pt-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Hide logo", "authpress")}</Title>
                            <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</Paragraph>
                        </Skeleton>
                    </Col>
                    {
                        !settingsLoading &&
                        <Col xs={24} lg={12} xl={10}>
                            <Switch
                                onChange={(value) => handleChange('disabled', value)}
                                checked={ Boolean(localValues?.disabled) }
                            />
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Upload Logo", "authpress")}</Title>
                            <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</Paragraph>
                        </Skeleton>
                    </Col>
                    {
                        !settingsLoading &&
                        <Col xs={24} lg={12} xl={10}>
                            <MediaUploaderControl
                                data={localValues?.image}
                                name='image'
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
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Logo Size", "authpress")}</Title>
                            <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</Paragraph>
                        </Skeleton>
                    </Col>
                    {
                        !settingsLoading &&
                        <Col xs={24} lg={12} xl={10}>
                            <Row type="flex" gutter={[16, 16]}>
                                <Col xs={12}>
                                    <UnitControl
                                        label={__('Width', 'authpress')}
                                        onChange={(value) => handleChange('width', value)}
                                        value={localValues?.width}
                                        units={units}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <UnitControl
                                        label={__('Height', 'authpress')}
                                        onChange={(value) => handleChange('height', value)}
                                        value={localValues?.height}
                                        units={units}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Space below", "authpress")}</Title>
                            <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</Paragraph>
                        </Skeleton>
                    </Col>
                    {
                        !settingsLoading &&
                        <Col xs={24} lg={12} xl={10}>
                            <UnitControl
                                onChange={(value) => handleChange('space', value)}
                                value={localValues?.space}
                                units={units}
                            />
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit pt-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Logo URL", "authpress")}</Title>
                            <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</Paragraph>
                        </Skeleton>
                    </Col>
                    {
                        !settingsLoading &&
                        <Col xs={24} lg={12} xl={10}>
                            <Input
                                type="url"
                                value={localValues?.url}
                                onChange={(value) => handleChange('url', value)}
                            />
                        </Col>
                    }
                </Row>
            </div>
                   <ActionButtons hasChanges={hasChanges} section='customizer.redesign.logo' handleReset={handleReset} onSave={onSave} />
        </>
   );
};

export default CustomizerPersonalizeLogo;
