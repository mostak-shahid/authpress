
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MultiLevelListGroup from "../components/MultiLevelListGroup/MultiLevelListGroup";
import PageInfo from "../components/PageInfo/PageInfo";
import { useMain } from "../contexts/MainContext";
import { formDataPost, setNestedValue, urlToArr } from "../lib/Helpers"; // Import utility function
import Details from '../data/details.json';

import { 
    Layout,
    Typography,
    Banner, 
    Breadcrumb,
    Card,
    Button,
} from '@douyinfe/semi-ui';
import VerticalMenuControl from "../components/VerticalMenuControl/VerticalMenuControl";
const withForm = (OriginalComponent, sectionPath = null) => {   
    const { Header, Footer, Sider, Content } = Layout;
    const { Title, Text, Paragraph } = Typography;  
    const routes = ['Home', 'The is a very very very very long title', 'Detail'];
    function NewComponent() {
        const {
            settingData, 
            setSettingData,
            settingLoading,
            setSettingLoading,
            settingsMenu,
            settingReload,
            setSettingReload
        } = useMain();
        const [ saving, setSaving ] = useState('normal');
        const [ resetting, setResetting ] = useState('normal');

        const urlArr = urlToArr();

        const location = useLocation();
        
        const OPTIONS_API_URL = "/authpress/v1/options";

        useEffect(() => {
            const basePath = '/authpress/v1';        
            const fetchSettingData = async () => {
                try {
                    const response = await apiFetch({
                        path: `${basePath}/options`,
                        headers: { 'X-WP-Nonce': authpress_ajax_obj.api_nonce }
                    });
                    setSettingData(response);
                    setSettingLoading(false)
                } catch (error) {
                    console.log(error);
                }
            };
        
            fetchSettingData();
        }, [settingReload]);

        // Handle changes from child components
        const handleChange = (fieldPath, value) => {
            // console.log("Field changed:", fieldPath, "New value:", value);
            setSettingData(prev => {
                const updatedOptions = setNestedValue(prev, fieldPath, value);
                return { ...updatedOptions }; // Ensure React detects the update
            });
        };
        const handleSave = async () => {
            setSaving('processing');
            try {
                await apiFetch({
                    path: OPTIONS_API_URL,
                    method: 'POST',
                    data: { authpress_options: settingData },
                    headers: {
                        'X-WP-Nonce': authpress_ajax_obj.api_nonce
                    }
                });
                window.scrollTo(0, 0);
                setSettingReload(Math.random);
                setSaving('done');
                setTimeout(() => {
                    setSaving('normal');
                }, 1000);
            } catch (error) {
                console.error("Error saving settings:", error);
            }
        };
        const handleReset = async (name) => {
            const confirmation = window.confirm(__( "Are you sure you want to proceed?", "authpress" ));
            let result;
            if (confirmation) {       
                setResetting('processing');        
                try {
                    result = await formDataPost('authpress_reset_settings', {name:name});
                    console.log(result); 
                    if (result.success) {
                        setResetting('done');
                        setTimeout(() => {
                            setResetting('normal');
                        }, 2000);
                        setSettingReload(Math.random);   
                    }
                } catch (error) {
                    setResetError(error.message);
                } finally {
                    setResetting('normal');    
                }
            }
        };
        useEffect(() => {
        }, [])
        return (
            <>
                <div className="authpress-settings container mx-auto px-4">
                    <Layout>
                        <Sider>
                            <div className="plugin-info d-flex flex-column align-items-center gap-2 p-3 border-bottom">
                                <img src={`${authpress_ajax_obj.image_url}logo.svg`} alt="" width="100" height="100" />
                                <span className="fw-bold">{Details?.name}</span>
                                <span>{Details?.version}</span>
                            </div> 
                            <VerticalMenuControl/>
                        </Sider>
                        <Content style={{ padding: 24, minHeight: 280, backgroundColor: 'var(--semi-color-bg-4)'}}>                        
                            <Breadcrumb
                                routes={routes}
                                style={{ padding: 10, backgroundColor: 'var(--semi-color-bg-3)', border: '1px solid var(--semi-color-border)', marginBottom: 24 }}
                            />
                            <Card 
                                title={
                                    <>
                                    <Title heading={6} style={{ margin: '8px 0' }} >h6. Semi Design</Title>
                                    <Text>Welcome to Semi Design</Text>
                                    </>
                                }
                                style={{ borderRadius: 0 }}
                                headerExtraContent={
                                    <Text link>
                                        More
                                    </Text>
                                }
                            >
                                <PageInfo url={location.pathname} />
                                <hr />
                                <OriginalComponent handleChange={handleChange} />
                                <Button loading={saving!='normal'?true:false } onClick={handleSave} style={{ marginRight: 14 }}>                                
                                    {
                                        saving == 'processing' ? __( "Saving...", "authpress" ) : __( "Save", "authpress" )
                                    }
                                </Button>
                                <Button loading={saving!='normal'?true:false } onClick={handleSave} style={{ marginRight: 14 }}>                                
                                    {
                                        resetting == 'processing' ? __( "Resetting...", "authpress" ) : __( "Reset", "authpress" )
                                    }
                                </Button>
                
                            </Card>
                        </Content>
                    </Layout>
                
                    
                </div>
            </>
        )
    }
    return NewComponent;    
}
export default withForm;