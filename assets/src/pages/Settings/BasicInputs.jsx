import { __ } from "@wordpress/i18n";
import { Form, Row, Col, Skeleton, Typography} from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import ActionButtons from "./ActionButtons";
import { SkeletonPlaceholder } from "../../components";

const { Title, Paragraph } = Typography;
const BasicInputs = () => {
    const { settings, settingsLoading, handleSubmit, handleReset } = useOutletContext();
    const [hasChanges, setHasChanges] = useState(false);
    const settingsOld = useRef(null);

    const onSubmit = (values) => {
        handleSubmit('basic', values);
    };

    const handleValuesChange = (values) => {
        if (settingsOld.current && settings.basic) {
            const isChanged = JSON.stringify(values) !== JSON.stringify(settingsOld.current.basic);
            setHasChanges(isChanged);
        }
    };

    useEffect(() => {
        if (settings && settings.basic) {
            settingsOld.current = { ...settings };
            setHasChanges(false);
        }
    }, [settings]);

    return (
        <>
            {/* {console.log(settings.basic)} */}
            {!settingsLoading && settings?.basic && (
                <Form
                    initValues={settings.basic}
                    onSubmit={onSubmit}
                    onValueChange={handleValuesChange}
                    labelPosition="left"
                    labelWidth="150px"
                >
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                    <Title heading={4}>{__("Text Input", "authpress")}</Title>
                                    <Paragraph>{__("Lorem", "authpress")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingsLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <Form.Input
                                        field="text"
                                        noLabel
                                        placeholder={__("Enter text", "authpress")}
                                        style={{ width: '100%' }}
                                    /> 
                                </Col>
                            }
                        </Row>
                    </div>
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                    <Title heading={4}>{__("Text Area", "authpress")}</Title>
                                    <Paragraph>{__("Lorem", "authpress")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingsLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <Form.TextArea
                                        field="textarea"
                                        noLabel
                                        placeholder={__("Enter textarea content", "authpress")}
                                        rows={4}
                                        style={{ width: '100%' }}
                                    />
                                </Col>
                            }
                        </Row>
                    </div>
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                    <Title heading={4}>{__("Radio Group", "authpress")}</Title>
                                    <Paragraph>{__("Lorem", "authpress")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingsLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <Form.RadioGroup field="radio" noLabel type="button">
                                        <Form.Radio value="radio-1">{__('Radio 1', 'authpress')}</Form.Radio>
                                        <Form.Radio value="radio-2">{__('Radio 2', 'authpress')}</Form.Radio>
                                        <Form.Radio value="radio-3">{__('Radio 3', 'authpress')}</Form.Radio>
                                    </Form.RadioGroup>
                                </Col>
                            }
                        </Row>
                    </div>
                    <ActionButtons hasChanges={hasChanges} section='basic' handleReset={handleReset} />
                </Form>
            )}
        </>
    );
};

export default BasicInputs;