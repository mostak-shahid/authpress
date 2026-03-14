import { __ } from "@wordpress/i18n";
import { Form, Row, Col, Skeleton, Typography} from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import ActionButtons from "./ActionButtons";
import { SkeletonPlaceholder } from "../../components";
import ImageSelectorStandalone from "../../components/ImageSelector/ImageSelector";


const { Title, Paragraph } = Typography;
const CheckIcon = () => { 
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// -------------------------
// SAFE DEEP MERGE
// -------------------------
const deepMerge = (target, source) => {
    if (typeof source !== "object" || source === null) return source;
    if (typeof target !== "object" || target === null) return source;

    const output = { ...target };

    Object.keys(source).forEach((key) => {
        output[key] =
            key in target ? deepMerge(target[key], source[key]) : source[key];
    });

    return output;
};
const CustomizerPresets = () => {
    const { settings, settingsLoading, handleSubmit, handleReset } = useOutletContext();
    const [hasChanges, setHasChanges] = useState(false);
    const settingsOld = useRef(null);
    const defaultPresets = authpress_ajax_obj?.default_presets || [];


    const onSubmit = (values) => {
        const updatedSettings = {
            ...settings,
            customizer: {
                ...settings.customizer,
                redesign: {
                    ...settings.customizer.redesign,
                    templates: values
                }
            }
        };
        // console.log('updatedSettings', updatedSettings);
        handleSubmit('customizer', updatedSettings.customizer);
    };

    const handleValuesChange = (values) => {
        if (settingsOld.current && settings?.customizer?.redesign?.templates) {
            const isChanged = JSON.stringify(values) !== JSON.stringify(settingsOld.current.customizer?.redesign?.templates);
            setHasChanges(isChanged);
        }
    };

    const handlePresetChange = (template) => {
        const selectedPreset = defaultPresets.find(p => p.template === template.target.value);
        // console.log('template', template.target.value);
        // console.log('selectedPreset', selectedPreset);
        if (selectedPreset && selectedPreset.preset) {
            const updatedSettings = {
                ...settings,
                customizer: deepMerge(settings.customizer, selectedPreset.preset.customizer)
            };
            handleSubmit('customizer', updatedSettings.customizer);
        }
    };

    useEffect(() => {
        if (settings && settings?.customizer?.redesign?.templates) {
            settingsOld.current = { ...settings };
            setHasChanges(false);
        }
    }, [settings]);

    return (
        <>
            {/* {console.log(settings.customizer)} */}
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
                            {
                                !settingsLoading &&
                                <Col xs={24}>
                                    <Form.RadioGroup field="layout" noLabel type="button" className="authpress-image-selector" onChange={handlePresetChange}>
                                        {/* {console.log(defaultPresets)} */}
                                        {
                                            defaultPresets.map(preset => (
                                                <Form.Radio key={preset.template} value={preset.template}>
                                                    <div className="image-container">
                                                        <img src={preset.img} alt={preset.label}/>
                                                        <span>{preset.name}</span>
                                                        <div className="authpress-image-selected">
                                                            <CheckIcon />
                                                        </div>
                                                    </div>
                                                    {/* {console.log(settings?.customizer?.redesign?.templates.layout, preset.template)} */}
                                                </Form.Radio>
                                            ))

                                        }

                                    </Form.RadioGroup>
                                </Col>
                            }
                        </Row>
                    </div>

                    {/* <ActionButtons hasChanges={hasChanges} section='customizer.redesign.templates' handleReset={handleReset} /> */}
                </Form>
            )}
        </>
    );
};

export default CustomizerPresets;