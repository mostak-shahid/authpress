
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MultiLevelListGroup from "../components/MultiLevelListGroup/MultiLevelListGroup";
import PageInfo from "../components/PageInfo/PageInfo";
import { useMain } from "../contexts/MainContext";
import { formDataPost, setNestedValue, urlToArr,  } from "../lib/Helpers"; // Import utility function
import Details from '../data/details.json';

import { Layout, Typography,  Banner, Breadcrumb, Card, Button, Space,} from '@douyinfe/semi-ui';
import { IconSave, IconRefresh } from '@douyinfe/semi-icons';


import VerticalMenuControl from "../components/VerticalMenuControl/VerticalMenuControl";

import { IllustrationIdle, Illustration404, Logo } from '../lib/Illustrations';
import BreadcrumbControl from "../components/BreadcrumbControl/BreadcrumbControl";


const withForm = (OriginalComponent, sectionPath = null) => {   
    const { Header, Footer, Sider, Content } = Layout;
    const { Title, Text, Paragraph } = Typography;  

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
                    // console.log(result); 
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
        const [settingsBodyHeight, setHeight] = useState();
        useEffect(() => {
            function updateVH() {
                const authpress_height = document.body.scrollHeight
                ? document.body.scrollHeight
                : window.innerHeight; // fallback
                // const appliedHeight = vh - 69;
                setHeight(authpress_height - 130);
                // console.log("document.body.scrollHeight:", document.body.scrollHeight);
            }

            updateVH();

            // Listen to resize & viewport changes
            window.visualViewport?.addEventListener("resize", updateVH);
            window.visualViewport?.addEventListener("scroll", updateVH);

            return () => {
                window.visualViewport?.removeEventListener("resize", updateVH);
                window.visualViewport?.removeEventListener("scroll", updateVH);
            };
        }, []);
        
        const headerContent = {
                logo: <Logo width={36} height={36} />,
                text: Details?.name,
        };
        return (
            <>
                <div className="authpress-settings container mx-auto px-4">
                    <Layout>
                        <Sider>
                            <VerticalMenuControl 
                                items={settingsMenu}
                                breakpoint={960}
                                headerContent={headerContent}
                            />
                        </Sider>
                        <Content style={{ padding: 24, minHeight: settingsBodyHeight, backgroundColor: 'var(--semi-color-bg-4)'}}>    
                            <BreadcrumbControl />
                            <Card 
                                title={
                                    <PageInfo url={location.pathname} />
                                }
                                style={{ borderRadius: 0 }}
                                headerExtraContent={
                                    <Text link>
                                        More
                                    </Text>
                                }
                                footerLine={ sectionPath?true:false }
                                // footerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
                                footer={ sectionPath ?
                                    <Space>
                                        <Button 
                                            theme="solid"
                                            type="primary"
                                            icon={<IconSave />}
                                            loading={saving!='normal'?true:false } 
                                            onClick={handleSave} 
                                            style={{ marginRight: 14 }}
                                        >                                
                                            {
                                                saving == 'processing' ? __( "Saving...", "authpress" ) : __( "Save", "authpress" )
                                            }
                                        </Button>
                                        <Button 
                                            theme="solid"
                                            type="danger"
                                            icon={<IconRefresh />}
                                            loading={resetting!='normal'?true:false } 
                                            onClick={handleReset} style={{ marginRight: 14 }}
                                        >                                
                                            {
                                                resetting == 'processing' ? __( "Resetting...", "authpress" ) : __( "Reset", "authpress" )
                                            }
                                        </Button>
                                    </Space> : ''
                                }
                            >
                                <OriginalComponent handleChange={handleChange} />
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