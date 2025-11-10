import { __ } from "@wordpress/i18n";
import "./App.scss";
import Header from "./layouts/Header/Header";
// import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import ImportExport from "./pages/ImportExport";
import More from "./pages/More";
import ComponentsBasic from "./pages/ComponentsBasic";
import CustomizerRedesignTemplate from "./pages/CustomizerRedesignTemplate";
import CustomizerRedesignBackground from "./pages/CustomizerRedesignBackground";
import CustomizerRedesignLogo from "./pages/CustomizerRedesignLogo";
import CustomizerRedesignForm from "./pages/CustomizerRedesignForm";
import ComponentsAdvanced from "./pages/ComponentsAdvanced";
import BasicTable from "./pages/BasicTable";
import AjaxTable from "./pages/AjaxTable";
import Page from "./pages/Page";
import Feedback from "./pages/Feedback";
import Footer from "./layouts/Footer/Footer";
import CustomizerRedesignFields from "./pages/CustomizerRedesignFields";
import CustomizerRedesignButton from "./pages/CustomizerRedesignButton";
import CustomizerRedesignOther from "./pages/CustomizerRedesignOther";
import { IllustrationIdle, Illustration404 } from './lib/Illustrations';

import Tools from "./pages/Tools";
import HideLogin from "./pages/HideLogin";
import Two_FA_Email from "./pages/Two_FA_Email";
import Two_FA from "./pages/Two_FA";
import Captcha from "./pages/Captcha";
import AutoLogin from "./pages/AutoLogin";
import AutoLoginLink from "./pages/AutoLoginLink";

import { Layout, Spin, Typography, LocaleProvider } from '@douyinfe/semi-ui';
import local from "@douyinfe/semi-ui/lib/es/locale/source/en_US";


const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '40px' }}>
      <Illustration404 style={{ width: 250, height: 250 }} />
      <h3>{__("404 - Page Not Found", "authpress")}</h3>
  </div>
);
import React, { useState, useEffect } from 'react';
import { Nav, Avatar, Dropdown } from '@douyinfe/semi-ui';
import {
    IconStar,
    IconUser,
    IconUserGroup,
    IconSetting,
    IconEdit,
} from '@douyinfe/semi-icons';
const items = [
        { itemKey: 'user', text: 'User Management', icon: <IconUser /> },
        { itemKey: 'union', text: 'Union Center', icon: <IconStar /> },
        {
            itemKey: 'union-management',
            text: 'Union Management',
            icon: <IconUserGroup />,
            items: ['Announcement Settings', 'Union Query', 'Entry Information'],
        },
        {
            itemKey: 'approve-management',
            text: 'Approval Management',
            icon: <IconEdit />,
            items: [
                'Check-in Review',
                {
                    itemKey: 'operation-management',
                    text: 'Operations Management',
                    items: ['Personnel Management', 'Personnel Change'],
                },
            ],
        },
        {
            text: 'Task Platform',
            icon: <IconSetting />,
            itemKey: 'job',
            items: ['Task Management', 'User Task Query'],
        },
    ];
function App() {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
    const [openKey, setOpenKey] = useState(null); // for accordion behavior


    // Handle responsive change
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 992);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSubNavClick = (itemKey) => {
        // Accordion logic: toggle or close others
        setOpenKey((prevKey) => (prevKey === itemKey ? null : itemKey));
    };
  const { Header, Footer, Sider, Content } = Layout;
  const commonStyle = {
        height: 64,
        lineHeight: '64px',
        background: 'var(--semi-color-fill-0)'
    };
  return (
    <LocaleProvider locale={local}>
      <Layout className="components-layout-demo">
            <Header 
            style={commonStyle}
            >
        <Nav
            mode="horizontal"
            items={items}
            onSelect={(key) => console.log(key)}
            header={{
                logo: (
                    <img
                        src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/webcast_logo.svg"
                        alt="logo"
                    />
                ),
                text: 'Live Platform',
            }}
            footer={
                <Dropdown
                    position="bottomRight"
                    render={
                        <Dropdown.Menu>
                            <Dropdown.Item>Detail</Dropdown.Item>
                            <Dropdown.Item>Quit</Dropdown.Item>
                        </Dropdown.Menu>
                    }
                >
                    <Avatar
                        size="small"
                        color="light-blue"
                        style={{ margin: 4 }}
                    >
                        BD
                    </Avatar>
                    <span>Bytedancer</span>
                </Dropdown>
            }
        />
            </Header>
            <Layout>
                <Sider>

            <Nav
                items={items.map((item) => {
                    if (item.items) {
                        return {
                            ...item,
                            isOpen: openKey === item.itemKey, // control open state
                            onClick: () => handleSubNavClick(item.itemKey),
                        };
                    }
                    return item;
                })}
                onSelect={(key) => console.log(key)}
                style={{ borderRight: '1px solid var(--semi-color-border)', height: '100%' }}
                footer={{
                    collapseButton: false, // we disable default collapse button
                }}
            />

                </Sider>
                <Content style={{ minHeight: 'calc(100vh - 32px)' }}>Content</Content>
            </Layout>
            <Footer 
            style={commonStyle}
            >
              Footer
              </Footer>
        </Layout>

      <div className="authpress-settings-container">
        <Header />
        <Routes>
          {/* <Route path="/" element={<RestrictionsSettings handleChange={handleChange} />} /> */}
          {/* <Route path="/"  element={<Navigate to="/restrictions/settings" />} /> */}
          <Route path="/" element={<Dashboard />} />

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
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>      
      </div>
    </LocaleProvider>
  );
}

export default App;
