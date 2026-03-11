import { __ } from "@wordpress/i18n";
import { Form, Row, Col, Skeleton, Typography} from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import ActionButtons from "./ActionButtons";
import { SkeletonPlaceholder } from "../../components";
import { ImageSelector } from "../../components/ImageSelector/ImageSelector";

const { Title, Paragraph } = Typography;
const CustomizerPresets = () => {
    const { settings, settingsLoading, handleSubmit, handleReset, setSettingsReload } = useOutletContext();
    const [hasChanges, setHasChanges] = useState(false);
    const settingsOld = useRef(null);

    const presets = authpress_ajax_obj?.default_presets || [];

    // const onSubmit = (values) => {
    //     handleSubmit('basic', values);
    // };

    // const handleValuesChange = (values) => {
    //     if (settingsOld.current && settings.basic) {
    //         const isChanged = JSON.stringify(values) !== JSON.stringify(settingsOld.current.basic);
    //         setHasChanges(isChanged);
    //     }
    // };

    const onSubmit = (values) => {
        handleSubmit('customizer', values);
    };

    const handleValuesChange = (values) => {
        if (settingsOld.current && settings?.customizer?.redesign?.templates) {
            const isChanged = JSON.stringify(values) !== JSON.stringify(settingsOld.current.customizer?.redesign?.templates);
            setHasChanges(isChanged);
        }
    };

    useEffect(() => {
        if (settings && settings?.customizer?.redesign?.templates) {
            settingsOld.current = { ...settings };
            setHasChanges(false);
        }
    }, [settings]);

    const onClick = (preset) => {
        if (!preset.preset) return;

        const updatedSettings = {
            ...settings,
            ...preset.preset
        };

        handleSubmit('customizer', updatedSettings.customizer);
    }

    const handlePresetSelect = (templateId) => {
        const preset = presets.find(p => p.template === templateId);
        if (preset) {
            onClick(preset);
        }
    }

    const presetImages = presets.map(preset => ({
        id: preset.template,
        title: preset.name,
        cat: "Preset",
        src: preset.img
    }));

    return (
        <>
            {console.log(settings?.customizer?.redesign?.templates)}
            {!settingsLoading && settings?.customizer?.redesign?.templates && (
                <Form
                    initValues={settings?.customizer?.redesign?.templates || {}}
                    onSubmit={onSubmit}
                    onValueChange={handleValuesChange}
                    labelPosition="left"
                    labelWidth="150px"
                >

                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                    <Title heading={4}>{__("Text Input", "authpress")}</Title>
                                    <Paragraph>{__("Lorem", "authpress")}</Paragraph>
                                </Skeleton>
                            </Col>
                            {
                                !settingsLoading && presetImages.length > 0 &&
                                <Col xs={24} className="mt-4">
                                    <ImageSelector
                                        images={presetImages}
                                        selectedId={settings?.customizer?.redesign?.templates?.layout || null}
                                        onSelect={handlePresetSelect}
                                        idField="id"
                                    />
                                </Col>
                            }
                        </Row>
                    </div>
                    <ActionButtons 
                        hasChanges={hasChanges} 
                        // section='customizer.redesign.templates' 
                        // handleReset={handleReset} 
                    />
                </Form>
            )}
        </>
    );
};

export default CustomizerPresets;