import { __ } from "@wordpress/i18n";
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import { Row, Col, Typography, Skeleton, Switch, } from '@douyinfe/semi-ui';
import { SkeletonPlaceholder } from '../components';

import AceEditor from "react-ace";
// Load modes and theme
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
const More = ({handleChange}) => {
    const {
        settingData,
        settingLoading,
    } = useMain();
    const { Title, Text, Paragraph } = Typography;
    return (
        <>
            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                            <Title heading={4}>{__("Enable Scripts", "authpress")}</Title>
                            <Paragraph>{__("Enable/Disable \"Scripts\" functionalities", "authpress")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingLoading &&                               
                        <Col xs={24} lg={12} xl={10}>
                            <Switch 
                                onChange={(value, element) => handleChange('more.enable_scripts', value)}
                                checked={ Boolean(settingData?.more.enable_scripts) }
                            />   
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                            <Title heading={4}>{__("CSS Editor", "authpress")}</Title>
                            <Paragraph>{__("Add any custom CSS code if necessary", "authpress")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingLoading &&                               
                        <Col xs={24}>
                            <AceEditor
                                mode="css"
                                theme="monokai"
                                value={settingData?.more?.css}
                                onChange={(value) => handleChange("more.css", value)}
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
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                            <Title heading={4}>{__("JavaScript Editor", "authpress")}</Title>
                            <Paragraph>{__("Add any custom JS code if necessary", "authpress")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingLoading &&                               
                        <Col xs={24}>
                            <AceEditor
                                mode="javascript"
                                theme="monokai"
                                value={settingData?.more?.js}
                                onChange={(value) => handleChange("more.js", value)}
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
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                            <Title heading={4}>{__("Header Code", "authpress")}</Title>
                            <Paragraph>{__("This code will be placed inside <head> tag", "authpress")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingLoading &&                               
                        <Col xs={24}>
                            <AceEditor
                                mode="html"
                                theme="monokai"
                                value={settingData?.more?.header_content}
                                onChange={(value) => handleChange("more.header_content", value)}
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
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                            <Title heading={4}>{__("Footer Code", "authpress")}</Title>
                            <Paragraph>{__("This code will be placed inside <body> tag", "authpress")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingLoading &&                               
                        <Col xs={24}>
                            <AceEditor
                                mode="html"
                                theme="monokai"
                                value={settingData?.more?.footer_content}
                                onChange={(value) => handleChange("more.footer_content", value)}
                                name="html-editor-2"
                                width="100%"
                                height="200px"
                                editorProps={{ $blockScrolling: true }}
                            />
                        </Col>
                    }
                </Row>
            </div>
        </>
    )
}
export default withForm(More, 'more');