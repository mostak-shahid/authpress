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
const layouts = ["default-login", "default-login-left", "default-login-right"];

// -------------------------
// CORRECT PRESETS (FORM MOVED INSIDE redesign)
// -------------------------
const preset1 = {
    customizer: {
        redesign: {
            templates: "default-login",
            form: {
                wrapper: { position: "center" },
            },
        },
    },
};

const preset2 = {
    customizer: {
        redesign: {
            templates: "default-login-left",
            form: {
                wrapper: { position: "left" },
            },
        },
    },
};

const preset3 = {
    customizer: {
        redesign: {
            templates: "default-login-right",
            form: {
                wrapper: { position: "right" },
            },
        },
    },
};

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




    const onClick = (template) => {
        let preset = null;

        if (template === "default-login") preset = preset1;
        if (template === "default-login-left") preset = preset2;
        if (template === "default-login-right") preset = preset3;

        if (preset) {
            const updated = deepMerge(settings, preset);
            // setSettingData(updated);
            handleSubmit("customizer.redesign.templates", template);
        }
    };

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
        console.log(values);
        handleSubmit('customizer', updatedSettings.customizer);
    };

    const handleValuesChange = (values) => {
        if (settingsOld.current && settings?.customizer?.redesign?.templates) {
            const isChanged = JSON.stringify(values) !== JSON.stringify(settingsOld.current.customizer?.redesign?.templates);
            setHasChanges(isChanged);
        }
    };

    const handlePresetChange = (template) => {
        const selectedPreset = defaultPresets.find(p => p.template === template);
        if (selectedPreset && selectedPreset.preset) {
            const updatedSettings = {
                ...settings,
                customizer: {
                    ...settings.customizer,
                    redesign: {
                        ...settings.customizer.redesign,
                        ...selectedPreset.preset.customizer.redesign
                    }
                }
            };
            handleSubmit('customizer', updatedSettings.customizer);
        }
    };

    const applyPreset = (preset) => {
        const updated = merge({}, settings, preset);
        // setSettings(updated);
        console.log(updated);
    };

    useEffect(() => {
        if (settings && settings?.customizer?.redesign?.templates) {
            settingsOld.current = { ...settings };
            setHasChanges(false);
        }
    }, [settings]);

    return (
        <>
            {console.log(settings.customizer)}
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
                    <div>
                        {
                            defaultPresets.map(preset => (
                                <button 
                                    onClick={() => applyPreset(preset.preset)}
                                    key={preset.template}
                                >
                                    <span>{preset.name}</span>
                                </button>
                            ))

                        }

                        {/* <pre>{JSON.stringify(settings, null, 2)}</pre> */}
                    </div>


                    <div className="setting-unit pt-4">              
                        <Row type="flex" gutter={[24, 24]}>
                            {layouts.map((template) => {
                                const active =
                                    settings?.customizer?.redesign?.templates === template;

                                return (
                                    <Col xs={24} lg={12} xl={8} key={template}>
                                        <img
                                            src={`${authpress_ajax_obj.image_url}${template}.png`}
                                            alt={template}
                                            onClick={() => onClick(template)}
                                            style={{
                                                cursor: "pointer",
                                                width: "100%",
                                                border: "5px solid",
                                                borderColor: active
                                                    ? "var(--semi-color-success)"
                                                    : "var(--semi-color-info)",
                                            }}
                                        />
                                    </Col>
                                );
                            })}
                        </Row>
                        
                    
                    </div>

                    <ActionButtons hasChanges={hasChanges} section='customizer.redesign.templates' handleReset={handleReset} />
                </Form>
            )}
        </>
    );
};

export default CustomizerPresets;