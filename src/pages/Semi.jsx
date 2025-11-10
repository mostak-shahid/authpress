import React, { useState, useEffect } from 'react';
import { Layout, Nav, Avatar, Dropdown } from '@douyinfe/semi-ui';
import {
    IconStar,
    IconUser,
    IconUserGroup,
    IconSetting,
    IconEdit,
} from '@douyinfe/semi-icons';

import { SideSheet, Button } from '@douyinfe/semi-ui';
import { 
    IconMenu 
} from '@douyinfe/semi-icons';

const navItems = [
    { itemKey: 'user', text: 'User Management', icon: <IconUser /> },
    { itemKey: 'union', text: 'Union Center', icon: <IconStar /> },
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
export default function Semi() {
    const { Header, Footer, Sider, Content } = Layout;
    const commonStyle = {
        // height: 64,
        // lineHeight: '64px',
        // background: 'var(--semi-color-fill-0)'
    };

    const [isTab, setIsTab] = useState(window.innerWidth < 960);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 782);
    const [menuVisible, setMenuVisible] = useState(false);
    


    // Handle responsive change
    // Tab 960px
    // Phone 782px
    useEffect(() => {
        const handleResize = () => {
            setIsTab(window.innerWidth <= 961);
            setIsMobile(window.innerWidth <= 783);
            console.log(window.innerWidth)
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const headerContent = {
        logo: (
            <img
                src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/webcast_logo.svg"
                alt="logo"
            />
        ),
        text: 'Live Platform',
    };
    const footerContent = (
        <Dropdown
            position="bottomRight"
            render={
                <Dropdown.Menu>
                    <Dropdown.Item>Detail</Dropdown.Item>
                    <Dropdown.Item>Quit</Dropdown.Item>
                </Dropdown.Menu>
            }
        >
            <Avatar size="small" color="light-blue" style={{ margin: 4 }}>
                BD
            </Avatar>
            <span>Bytedancer</span>
        </Dropdown>
    );
    return ( 
        <>
        {console.log('isMobile:', isMobile, 'isTab:', isTab)}
        <Layout className="components-layout-demo">
            <Header 
                style={commonStyle}
            >
                {/* <Nav
                    mode="horizontal"
                    items={[
                        { itemKey: 'user', text: 'User Management', icon: <IconUser /> },
                        { itemKey: 'union', text: 'Union Center', icon: <IconStar /> },
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
                    ]}
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
                /> */}
                {!isTab ? (
                    // Desktop view
                    <Nav
                        mode="horizontal"
                        items={navItems}
                        onSelect={(key) => console.log('Selected:', key)}
                        header={headerContent}
                        footer={footerContent}
                    />
                ) : (
                    // Mobile view
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 16px',
                            backgroundColor: 'var(--semi-color-bg-1)',
                            borderBottom: '1px solid var(--semi-color-border)',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {headerContent.logo}
                            <span style={{ marginLeft: 8, fontWeight: 600 }}>
                                {headerContent.text}
                            </span>
                        </div>

                        {/* Hamburger button */}
                        <Button
                            icon={<IconMenu />}
                            type="tertiary"
                            onClick={() => setMenuVisible(true)}
                        />
                    </div>
                )}
            </Header>
            <Layout>
                <Sider>
                    <Nav
                        // bodyStyle={{ height: 320 }}
                        defaultIsCollapsed={isMobile}
                        items={items}
                        onSelect={(key) => console.log(key)}
                        footer={{
                            collapseButton: true,
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
        
        {/* SideSheet (mobile menu) */}
        <SideSheet
            placement="right"
            visible={menuVisible}
            onCancel={() => setMenuVisible(false)}
            width={240}
            title="Menu"
            closeOnEsc={true}
        >
            <Nav
                mode="vertical"
                items={navItems}
                onSelect={(key) => {
                    console.log('Selected:', key);
                    setMenuVisible(false); // auto close after select
                }}
                footer={{ collapseButton: false }}
            />
        </SideSheet>
        </>       
    )
}
