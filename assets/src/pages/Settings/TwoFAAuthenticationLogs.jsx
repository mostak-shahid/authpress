import { __ } from "@wordpress/i18n";
import { Row, Col, Skeleton, Typography, Switch, Select} from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ActionButtons from "./ActionButtons";
import { MediaUploaderControl, SkeletonPlaceholder, UnitControl } from "../../components";
import { UNITS } from "../../lib/Constants";
const { Title, Paragraph } = Typography;
const TwoFAAuthenticationLogs = () => {
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
            Tables and logs will be here
        </>
    );
};

export default TwoFAAuthenticationLogs;
