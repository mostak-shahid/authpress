import { __ } from "@wordpress/i18n";
import { Row, Col, Skeleton, Typography, Switch, InputNumber, TextArea, TagInput } from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ActionButtons from "./ActionButtons";
import { SkeletonPlaceholder } from "../../components";

const { Title, Paragraph } = Typography;
const LimitLoginAttempts = () => {
   const { settings, settingsLoading, handleSubmit, handleReset } = useOutletContext();
   const [hasChanges, setHasChanges] = useState(false);
   const [localValues, setLocalValues] = useState({});
   const [originalValues, setOriginalValues] = useState({});

   useEffect(() => {
       if (settings && settings?.limit_login_attempts) {
           const LimitLoginAttemptsSettings = settings.limit_login_attempts;
           setLocalValues({ ...LimitLoginAttemptsSettings });
           setOriginalValues({ ...LimitLoginAttemptsSettings });
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
       handleSubmit('limit_login_attempts', localValues);
   };

   return (
        <>
            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Enable Limit Login Attempts", "authpress")}</Title>
                            <Paragraph>{__("Enable or disable the limit on login attempts.", "authpress")}</Paragraph>
                        </Skeleton>
                    </Col>
                    {
                        !settingsLoading &&
                        <Col xs={24} lg={12} xl={10}>                                   
                            <Switch
                                onChange={(value) => handleChange('enabled', value)}
                                checked={ Boolean(localValues?.enabled) }
                            />
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Attempts Allowed", "authpress")}</Title>
                            <Paragraph>{__("The number of login attempts allowed before lockout.", "authpress")}</Paragraph>
                        </Skeleton>
                    </Col>
                    {
                        !settingsLoading &&
                        <Col xs={24} lg={12} xl={10}>  
                            <InputNumber 
                                min={1} 
                                placeholder={__("Attempts Allowed", "authpress")}
                                style={{ width: '100%' }}
                                value={localValues?.attempts_allowed || 1}
                                onChange={(value) => handleChange('attempts_allowed', value)}
                            />
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Minutes Lockout", "authpress")}</Title>
                            <Paragraph>{__("The number of minutes a user is locked out after exceeding the allowed login attempts.", "authpress")}</Paragraph>
                        </Skeleton>
                    </Col>
                    {
                        !settingsLoading &&
                        <Col xs={24} lg={12} xl={10}>  
                            <InputNumber 
                                min={1} 
                                placeholder={__("Minutes Lockout", "authpress")}
                                style={{ width: '100%' }}
                                value={localValues?.minutes_lockout || 1}
                                onChange={(value) => handleChange('minutes_lockout', value)}
                            />
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Lockout Message", "authpress")}</Title>
                            <Paragraph>{__("The message displayed to users when they are locked out.", "authpress")}</Paragraph>
                        </Skeleton>
                    </Col>
                    {
                        !settingsLoading &&
                        <Col xs={24} lg={12} xl={10}>  
                            <TextArea
                                showClear
                                placeholder={__("Too many failed login attempts. Please try again in {minutes} minutes.", "authpress")}
                                style={{ width: '100%' }}
                                value={localValues?.lockout_message || ''}
                                onChange={(value) => handleChange('lockout_message', value)}
                            />
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("IP Blacklist", "authpress")}</Title>
                            <Paragraph>{__("List of IP addresses that are blacklisted from login attempts.", "authpress")}</Paragraph>
                        </Skeleton>
                    </Col>
                    {
                        !settingsLoading &&
                        <Col xs={24} lg={12} xl={10}>  
                            <TagInput
                                addOnBlur={true}
                                placeholder={__("Please enter IPs...", "authpress")}                                
                                value={localValues?.ip_blacklist || ''}
                                onChange={(value) => handleChange('ip_blacklist', value)}
                            />
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Email Blacklist", "authpress")}</Title>
                            <Paragraph>{__("List of email addresses that are blacklisted from login attempts.", "authpress")}</Paragraph>
                        </Skeleton>
                    </Col>
                    {
                        !settingsLoading &&
                        <Col xs={24} lg={12} xl={10}>  
                            <TagInput
                                addOnBlur={true}
                                placeholder={__("Please enter emails...", "authpress")}
                                value={localValues?.email_blacklist || ''}
                                onChange={(value) => handleChange('email_blacklist', value)}
                            />
                        </Col>
                    }
                </Row>
            </div>
            <ActionButtons hasChanges={hasChanges} section='limit_login_attempts' handleReset={handleReset} onSave={onSave} />
        </>
   );
};

export default LimitLoginAttempts;
