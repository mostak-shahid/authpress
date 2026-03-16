import { __ } from "@wordpress/i18n";
import { Row, Col, Skeleton, Typography, Switch, Select} from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ActionButtons from "./ActionButtons";
import { MediaUploaderControl, SkeletonPlaceholder, UnitControl } from "../../components";
import { UNITS } from "../../lib/Constants";
const { Title, Paragraph } = Typography;
const TwoFAAuthenticationSettings = () => {
    const { settings, settingsLoading, handleSubmit, handleReset } = useOutletContext();
    const [hasChanges, setHasChanges] = useState(false);
    const [localValues, setLocalValues] = useState({});
    const [originalValues, setOriginalValues] = useState({});

    useEffect(() => {
        if (settings && settings?.two_fa_authentication?.settings) {
            const twoFaAuthenticationSettings = settings.two_fa_authentication.settings;
            setLocalValues({ ...twoFaAuthenticationSettings });
            setOriginalValues({ ...twoFaAuthenticationSettings });
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
            two_fa_authentication: {
                ...settings.two_fa_authentication,
                settings: localValues
            }
        };
        handleSubmit('two_fa_authentication', updatedSettings.two_fa_authentication);
    };

    return (
        <>
            <div className="setting-unit pt-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Enable two_fa_authentication", "authpress")}</Title>
                            <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</Paragraph>
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
            <div className="setting-unit pt-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Select Captcha", "authpress")}</Title>
                            <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</Paragraph>
                        </Skeleton>
                    </Col>
                    {
                        !settingsLoading &&
                        <Col xs={24} lg={12} xl={10}>
                            <Select
                                noLabel
                                className="w-full"
                                placeholder={__("Background type", "authpress")}
                                value={localValues?.selected_two_fa_authentication}
                                optionList={[
                                    { label: 'Email OTP', value: 'email_otp' },
                                    { label: 'TOTP OTP', value: 'totp_otp', disabled: true },
                                    { label: 'HOTP OTP', value: 'hotp_otp', disabled: true },

                                ]}
                                onChange={(value) => handleChange('selected_two_fa_authentication', value)}
                            />
                        </Col>
                    }
                </Row>
            </div>
            <ActionButtons hasChanges={hasChanges} section='two_fa_authentication.settings' handleReset={handleReset} onSave={onSave} />
        </>
    );
};

export default TwoFAAuthenticationSettings;
