import { __ } from "@wordpress/i18n";

import "./App.scss";
import "./tailwind.css"
// import Header from "./layouts/Header/Header";
// import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
import { Layout, Typography, Banner, Breadcrumb, Card, Space, Badge, Button, SideSheet, Col, Row  } from '@douyinfe/semi-ui';
import { IconStar, IconSetting, IconMenu, IconHome, IconMember, IconBookStroked, IconHelpCircleStroked, IconUserGroup, IconEdit, IconHorn, IconBellStroked, IconSun, IconMoon, } from '@douyinfe/semi-icons';
import { Link, Navigate, Route, Routes } from "react-router-dom";
//Route Pages
import Dashboard from "./pages/Dashboard/Dashboard";
// import ImportExport from "./pages/ImportExport";
// import More from "./pages/More";
// import ComponentsBasic from "./pages/ComponentsBasic";
// import CustomizerRedesignTemplate from "./pages/CustomizerRedesignTemplate";
// import CustomizerRedesignBackground from "./pages/CustomizerRedesignBackground";
// import CustomizerRedesignLogo from "./pages/CustomizerRedesignLogo";
// import CustomizerRedesignForm from "./pages/CustomizerRedesignForm";
// import ComponentsAdvanced from "./pages/ComponentsAdvanced";
// import BasicTable from "./pages/BasicTable";
// import AjaxTable from "./pages/AjaxTable";
// import Page from "./pages/Page";
// import Feedback from "./pages/Feedback";
// import Footer from "./layouts/Footer/Footer";
// import CustomizerRedesignFields from "./pages/CustomizerRedesignFields";
// import CustomizerRedesignButton from "./pages/CustomizerRedesignButton";
// import CustomizerRedesignOther from "./pages/CustomizerRedesignOther";
// import Tools from "./pages/Tools";
// import HideLogin from "./pages/HideLogin";
// import Two_FA_Email from "./pages/Two_FA_Email";
// import Two_FA from "./pages/Two_FA";
// import Captcha from "./pages/Captcha";
// import AutoLogin from "./pages/AutoLogin";
// import AutoLoginLink from "./pages/AutoLoginLink";

import { LocaleProvider } from '@douyinfe/semi-ui';
import local from "@douyinfe/semi-ui/lib/es/locale/source/en_US";
import { IllustrationIdle, Illustration404, Logo } from './lib/Illustrations';
import Details from './data/details.json';

const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '40px' }}>
      <Illustration404 style={{ width: 250, height: 250 }} />
      <h3>{__("404 - Page Not Found", "authpress")}</h3>
  </div>
);
import React, { useState, useEffect } from 'react';
import Semi from "./pages/Semi/Semi";
import HorizontalMenuControl from "./components/HorizontalMenuControl/HorizontalMenuControl";
import apiFetch from "@wordpress/api-fetch";


function App() {
    const { Header, Footer, Sider, Content } = Layout;
    const { Title, Text } = Typography;
    const [newsVisible, setNewsVisible] = useState(false);
    const [darkmode, setDarkmode] = useState(false);

    // const [darkMode, setDarkmode] = useState(0);
    useEffect(() => {
        const fetchSettingTheme = async () => {
            try {
                const params = new URLSearchParams({
                    id: authpress_ajax_obj.get_current_user_id,
                });
                const theme = await apiFetch({
                    path: `/authpress/v1/get-settings-theme?${params.toString()}`,
                    method: 'GET'
                });      

                // console.log('Theme received:', theme);
                document.body.setAttribute('theme-mode', theme);

                const isDark = theme === 'dark' || theme.value === 'dark';
                setDarkmode(isDark);
            } catch (err) {
                console.error('API error:', err);
            }
        };

        fetchSettingTheme();
    }, []); 

    // const switchMode = () => {
    //     const body = document.body;
    //     if (body.hasAttribute('theme-mode')) {
    //         body.removeAttribute('theme-mode');
    //     } else {
    //         body.setAttribute('theme-mode', 'dark');
    //     }
    //     setDarkmode(!darkmode);
    // };
    const switchingMode = async () => {
        const switchMode = !darkmode;
        setDarkmode(switchMode);
        try {
            const params = new URLSearchParams({
                id: authpress_ajax_obj.get_current_user_id,
                settings_theme: switchMode ? 'dark' : 'light',
            });

            const response = await apiFetch({
                path: `/authpress/v1/set-settings-theme?${params.toString()}`,
                // method: 'GET'
            });
            if (response.success) {
                document.body.setAttribute('theme-mode', switchMode?'dark':'light');
            }
            console.log(response);
        } catch (error) {
            console.error("Error fetching settings data:", error);
        }
    };
        
    const [settingsBodyHeight, setSettingsBodyHeight] = useState();
    useEffect(() => {
        function updateVH() {
            const ussbh = document.body.scrollHeight
            ? document.body.scrollHeight
            : window.innerHeight; // fallback
            // const appliedHeight = vh - 69;
            setSettingsBodyHeight(ussbh - 130);
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
    return (
        <LocaleProvider locale={local}>
            <div className="authpress-settings-container semi-scope">
                <Banner 
                    fullMode={false}
                    type="info"
                    description={
                        <>
                            <Text>{__('You\'re currently using the Free plan. ', 'authpress')}</Text>
                            <Text>{__('Some settings and features are only available in ', 'authpress')}</Text>
                            <b><Text link={{ href: 'https://semi.design', target: '_blank' }}>{__('Pro version.', 'authpress')}</Text></b>
                        </>
                    }
                />
                <Layout className="components-layout-demo">
                    <Header>                    
                        <HorizontalMenuControl
                            items = {[
                                { itemKey: 'welcome', text: 'Welcome', icon: <IconHome />, url: '/semi/welcome' },
                                { itemKey: 'settings', text: 'Settings', icon: <IconSetting />, url: '/semi/settings' },
                                { itemKey: 'feedback', text: 'Feedback', icon: <IconStar />, url: '/semi/feedback' },
                                { itemKey: 'free-vs-pro', text: 'Free vs Pro', icon: <IconMember />, url: '/semi/free-vs-pro' },
                            ]}
                            responsive="true"
                            headerContent = {{
                                logo: <Logo width={36} height={36} />,
                                text: Details?.name,
                            }}
                            footerContent = {(
                                <Space align='center'>  
                                    <Badge count={Details?.version} theme='light' countStyle={{padding: 8, height: 'auto'}} />    
                                    <Button theme='outline' icon={darkmode?<IconSun />:<IconMoon />} aria-label="Mode" onClick={switchingMode} />
                                    <Button theme='outline' icon={<IconBookStroked />} aria-label="Screenshot" />
                                    <Button theme='outline' icon={<IconHelpCircleStroked />} aria-label="Screenshot" />
                                    <Badge count={5}>
                                        <Button theme='outline' icon={<IconBellStroked />} onClick={() => setNewsVisible(true)} aria-label="Screenshot" />
                                    </Badge>
                                </Space>
                            )}
                        />
                    </Header>
                    <div 
                        className="authpress-settings p-6"
                        style={{minHeight:settingsBodyHeight, backgroundColor: 'var(--semi-color-bg-4)'}}
                    >
                        <Routes>
                            {/* <Route path="/" element={<RestrictionsSettings handleChange={handleChange} />} /> */}
                            {/* <Route path="/"  element={<Navigate to="/restrictions/settings" />} /> */}
                            <Route path="/" element={<Dashboard />} />

                            {/* 
                            <Route path="/settings" element={<Navigate to="/settings/customizer/redesign/templates" />} />
                            <Route path="/settings/customizer/redesign/templates" element={<CustomizerRedesignTemplate />} />
                            <Route path="/settings/customizer/redesign/background" element={<CustomizerRedesignBackground />} />
                            <Route path="/settings/customizer/redesign/logo" element={<CustomizerRedesignLogo />} />
                            <Route path="/settings/customizer/redesign/form" element={<CustomizerRedesignForm />} />
                            <Route path="/settings/customizer/redesign/fields" element={<CustomizerRedesignFields/>} />
                            <Route path="/settings/customizer/redesign/button" element={<CustomizerRedesignButton/>} />
                            <Route path="/settings/customizer/redesign/other" element={<CustomizerRedesignOther/>} />
                            <Route path="/settings/hide_login" element={<HideLogin/>} />
                            <Route path="/settings/two_fa_authentication" element={<Navigate to="/settings/two_fa_authentication/settings" />} />
                            <Route path="/settings/two_fa_authentication/email_otp" element={<Two_FA_Email/>} />
                            <Route path="/settings/two_fa_authentication/settings" element={<Two_FA/>} />
                            <Route path="/settings/captcha" element={<Navigate to="/settings/captcha/settings" />} />
                            <Route path="/settings/captcha/settings" element={<Captcha/>} />
                            <Route path="/settings/auto_login" element={<Navigate to="/settings/auto_login/settings" />} />
                            <Route path="/settings/auto_login/settings" element={<AutoLogin/>} />
                            <Route path="/settings/auto_login/link_login" element={<AutoLoginLink/>} />

                            <Route path="/settings/components" element={<Navigate to="/settings/components/basic" />} />
                            <Route path="/settings/components/basic" element={<ComponentsBasic />} />
                            <Route path="/settings/components/advanced" element={<ComponentsAdvanced />} />

                            <Route path="/settings/components/datatable" element={<Navigate to="/settings/components/datatable/basic_table" />} />
                            <Route path="/settings/components/datatable/basic_table" element={<BasicTable />} />
                            <Route path="/settings/components/datatable/ajax_table" element={<AjaxTable />} />

                            <Route path="/page" element={<Page />} /> 

                            <Route path="/settings/import_export" element={<ImportExport />} />
                            <Route path="/settings/more" element={<More />} />
                            <Route path="/settings/tools" element={<Tools />} />
                            <Route path="/settings/feedback" element={<Feedback />} />
                            
                            */}
                            <Route path="/semi" element={<Semi />} />

                            <Route path="/semi" element={<Semi />}>
                                <Route index element={<Semi />} />
                                {/* <Route path="profile" element={<ProfilePage />} />
                                <Route path="settings" element={<SettingsPage />} /> */}
                                <Route path="*" element={<Semi />} />
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                    <Footer
                        className="p-[15px]" 
                        style={{borderTop: '1px solid var(--semi-color-border)', backgroundColor: 'var(--semi-color-fill-0)'}}
                    >
                        <Row type="flex">
                            <Col lg={12} xl={12} className="text-center lg:text-left">
                                <Space align='center' spacing='medium'>
                                    <img src={`${authpress_ajax_obj.image_url}logo.svg`} alt="" width="30" height="30" />
                                    <span>{Details?.name}</span>
                                </Space>
                            </Col>
                            <Col lg={12} xl={12} className="text-center lg:text-right">
                                <Space align='center' spacing='medium'>
                                    {Details?.version} {__( 'Core', "authpress" )}
                                </Space>
                            </Col>
                        </Row>
                    </Footer>
                </Layout>
            </div>
            

            {/* --- What's New SideSheet --- */}
            <SideSheet
                placement="right"
                visible={newsVisible}
                onCancel={() => setNewsVisible(false)}
                title={__("What's New?", "authpress")}
                closeOnEsc={true}
            >
                <p>Feature updates and news content go here...</p>
            </SideSheet>
        </LocaleProvider>
    );
}

export default App;
