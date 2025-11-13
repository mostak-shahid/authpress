import { __ } from "@wordpress/i18n";
import { 
    Layout,
    Space, 
    Typography,
    Banner, 
} from '@douyinfe/semi-ui';
import { Card } from '@douyinfe/semi-ui';
import { Button } from '@douyinfe/semi-ui';
import { IconInfoCircle } from '@douyinfe/semi-icons';
import VerticalMenu from './VerticalMenu';
import HorizontalMenu from './HorizontalMenu';
import './Semi.scss';

import {Logo} from '../../lib/Illustrations';
import Sidebar from "./Sidebar";

export default function Semi() {
    const { Header, Footer, Sider, Content } = Layout;
    const { Title, Text } = Typography;
    return ( 
        <>
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
                    <HorizontalMenu/>
                </Header>
                <Layout>
                    <Sider>
                        <VerticalMenu />
                    </Sider>
                    <Content style={{ minHeight: 'calc(100vh - 32px)' }}>
                        
                        <Button
                        >
                            Switch Mode
                        </Button>
                    </Content>
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
