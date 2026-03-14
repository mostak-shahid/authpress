import { __ } from "@wordpress/i18n";
import { Button, Card, Typography, Row, Col, Skeleton, Switch } from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ActionButtons from "./ActionButtons";
import { SkeletonPlaceholder } from "../../components";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const { Title, Paragraph } = Typography;

const More = () => {
    const { settings, settingsLoading, handleSubmit, handleReset } = useOutletContext();
    const [hasChanges, setHasChanges] = useState(false);
    const [localValues, setLocalValues] = useState({});
    const [originalValues, setOriginalValues] = useState({});

    useEffect(() => {
        if (settings && settings.more) {
            const moreSettings = settings.more;
            setLocalValues({ ...moreSettings });
            setOriginalValues({ ...moreSettings });
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
        handleSubmit('more', localValues);
    };

    return (
        <>
            {!settingsLoading && (
                <div>
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                    <Title heading={4}>{__("Enable Scripts", "authpress")}</Title>
                                    <Paragraph>{__("Enable/Disable \"Scripts\" functionalities", "authpress")}</Paragraph>
                                </Skeleton>
                            </Col>
                            {
                                !settingsLoading &&
                                <Col xs={24} lg={12} xl={10}>
                                    <Switch
                                        checked={localValues?.enable_scripts || false}
                                        onChange={(value) => handleChange('enable_scripts', value)}
                                    />
                                </Col>
                            }
                        </Row>
                    </div>

                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                    <Title heading={4}>{__("CSS Editor", "authpress")}</Title>
                                    <Paragraph>{__("Add any custom CSS code if necessary", "authpress")}</Paragraph>
                                </Skeleton>
                            </Col>
                            {
                                !settingsLoading &&
                                <Col xs={24}>
                                    <AceEditor
                                        mode="css"
                                        theme="monokai"
                                        value={localValues?.css || ''}
                                        onChange={(value) => handleChange('css', value)}
                                        name="css-editor"
                                        width="100%"
                                        height="200px"
                                        editorProps={{ $blockScrolling: true }}
                                    />
                                </Col>
                            }
                        </Row>
                    </div>

                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                    <Title heading={4}>{__("JavaScript Editor", "authpress")}</Title>
                                    <Paragraph>{__("Add any custom JS code if necessary", "authpress")}</Paragraph>
                                </Skeleton>
                            </Col>
                            {
                                !settingsLoading &&
                                <Col xs={24}>
                                    <AceEditor
                                        mode="javascript"
                                        theme="monokai"
                                        value={localValues?.js || ''}
                                        onChange={(value) => handleChange('js', value)}
                                        name="js-editor"
                                        width="100%"
                                        height="200px"
                                        editorProps={{ $blockScrolling: true }}
                                    />
                                </Col>
                            }
                        </Row>
                    </div>

                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                    <Title heading={4}>{__("Header Code", "authpress")}</Title>
                                    <Paragraph>{__("This code will be placed inside &lt;head&gt; tag", "authpress")}</Paragraph>
                                </Skeleton>
                            </Col>
                            {
                                !settingsLoading &&
                                <Col xs={24}>
                                    <AceEditor
                                        mode="html"
                                        theme="monokai"
                                        value={localValues?.header_content || ''}
                                        onChange={(value) => handleChange('header_content', value)}
                                        name="html-editor-1"
                                        width="100%"
                                        height="200px"
                                        editorProps={{ $blockScrolling: true }}
                                    />
                                </Col>
                            }
                        </Row>
                    </div>

                    <div className="setting-unit pt-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                    <Title heading={4}>{__("Footer Code", "authpress")}</Title>
                                    <Paragraph>{__("This code will be placed inside &lt;body&gt; tag", "authpress")}</Paragraph>
                                </Skeleton>
                            </Col>
                            {
                                !settingsLoading &&
                                <Col xs={24}>
                                    <AceEditor
                                        mode="html"
                                        theme="monokai"
                                        value={localValues?.footer_content || ''}
                                        onChange={(value) => handleChange('footer_content', value)}
                                        name="html-editor-2"
                                        width="100%"
                                        height="200px"
                                        editorProps={{ $blockScrolling: true }}
                                    />
                                </Col>
                            }
                        </Row>
                    </div>

                    <ActionButtons hasChanges={hasChanges} section='more' handleReset={handleReset} onSave={onSave} />
                </div>
            )}
        </>
    );
};

export default More;
