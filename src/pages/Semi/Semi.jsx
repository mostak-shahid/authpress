import { 
    Layout,
    Space, 
    Typography,
} from '@douyinfe/semi-ui';
import { Card, Popover, Avatar } from '@douyinfe/semi-ui';
import { Button } from '@douyinfe/semi-ui';
import { IconInfoCircle } from '@douyinfe/semi-icons';
import VerticalMenu from './VerticalMenu';
import HorizontalMenu from './HorizontalMenu';
import './Semi.scss';

import {Logo} from '../../lib/Illustrations';

export default function Semi() {
    const { Header, Footer, Sider, Content } = Layout;
    const { Meta } = Card;
    const { Title, Text } = Typography;

    return ( 
        <>
            <Space 
                align='center'
                style={{ 
                    justifyContent: 'space-between',
                    width: '100%',
                    borderBottom: '1px solid var(--semi-color-border)',
                }}
            >
                <Space align='center' style={{ opacity: '.5' }}>
                    <Logo
                        width={60}
                        height={60}
                        
                    />
                    <Title heading={3} style={{ margin: '0 8px' }} >AuthPress</Title>            
                </Space>
                
                <Space spacing='medium'style={{paddingRight: 10}}>
                    <Button
                        theme="solid"
                        type='primary'
                    >
                        Upgrade to Pro
                    </Button>
                    <Button
                        theme="solid"
                        type='secondary'
                    >
                        Documentation
                    </Button>
                </Space>
            </Space>
            <Card 
                style={{ borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: 0 }} 
                // bodyStyle={{ 
                //     display: 'flex',
                //     alignItems: 'center',
                //     justifyContent: 'space-between'
                // }}
            >
                <Title heading={3} style={{ margin: '8px 0' }} >Leave A Review?</Title> 
                <Text>We hope you've enjoyed using AuthPress! Would you consider leaving us a review on WordPress.org?</Text> 
                <Space spacing='medium' style={{width: '100%', marginTop:8}}>         
                    <Button
                        icon={<IconInfoCircle />}
                        theme="outline"
                        type='primary'
                    >
                        Sure! I'd love to!
                    </Button>
                    <Button
                        icon={<IconInfoCircle />}
                        theme="outline"
                        type='secondary'
                    >
                        Maybe Later
                    </Button>
                    <Button
                        icon={<IconInfoCircle />}
                        theme="outline"
                        type='secondary'
                    >
                        Never show again
                    </Button>
                </Space>

            </Card>
            <Layout className="components-layout-demo">
                <Header>                    
                    <HorizontalMenu/>
                </Header>
                <Layout>
                    <Sider>
                        <VerticalMenu />
                    </Sider>
                    <Content style={{ minHeight: 'calc(100vh - 32px)' }}>Content</Content>
                </Layout>
                <Footer 
                    style={{borderTop: '1px solid var(--semi-color-border)', padding: '15px 0'}}
                >
                    Footer
                </Footer>
            </Layout>
        </>       
    )
}
