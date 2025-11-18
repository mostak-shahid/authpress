import { __ } from "@wordpress/i18n";
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from 'react';
import PluginCard from "../../components/PluginCard/PluginCard";
import { useMain } from '../../contexts/MainContext';
import Details from '../../data/details.json';
import './Dashboard.scss';
// import {
//     Card,
//     CardHeader,
//     CardBody,
// } from '@wordpress/components';
import { Layout, Typography, Banner, Breadcrumb, Card, Space, Badge, Button, SideSheet, Col, Row  } from '@douyinfe/semi-ui';
export default function Dashboard() {
    const {
        settingsMenu,
    } = useMain();
    const { Text, Paragraph, Title } = Typography;
    const [plugins, setPlugins] = useState([]);
    const [pluginsLoading, setPluginsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPlugins = async () => {
        try {
            // const response = await apiFetch({ path: 'https://raw.githubusercontent.com/mostak-shahid/update/refs/heads/master/plugin-details.json' });
            const response = await apiFetch({ path: `/authpress/v1/plugins` });
            // 
            setPlugins(response.plugins);
        } catch (error) {
            setError('Error fetching plugin data:', error);
        } finally {
            setPluginsLoading(false);
        }
        };
        fetchPlugins();
    }, []);
    
    return (
        <div className="authpress-settings">
            <div className="container">
                <Card>
                    <Title heading={2}>{__(`Welcome to ${Details?.name}`, "authpress")}</Title>
                    <Paragraph>
                        {__("Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste mollitia voluptates molestiae nihil! Atque repellendus, nulla, aut magni in, sunt optio labore commodi at ipsa voluptatibus provident eveniet perferendis consequuntur.", "authpress")}
                    </Paragraph>
                    <Paragraph>
                        {__("AuthPress is an all-in-one toolkit to enhance your WooCommerce store. This is a highly effective plugin developed for assisting online businesses in improving sales and profits.", "authpress")}
                    </Paragraph>
                </Card>
                <div className="px-[12px] overflow-x-hidden">
                    <Row type="flex" gutter={24}>
                        <Col lg={16}>
                            <Card 
                                title={__("Features", "authpress")}
                                className="dashboard-features-card"
                            >
                                {Object.values(settingsMenu).map((feature, index) => (
                                    <div className="feature" key={index}>
                                        <h4 className="feature-title">{feature?.title}</h4>
                                        <div className="feature-intro">{feature?.description}</div>
                                    </div>
                                ))}
                            </Card>
                            <Card 
                                title={__("Extend Your Website", "authpress")}
                                className=""
                            >
                                <Row type="flex">
                                    {
                                        pluginsLoading 
                                        ? 
                                        <div>                                    
                                            loading...
                                        </div>
                                        : <>
                                        {/* {Object.entries(plugins).map(([slug, plugin]) => ( 
                                            <div className="col-lg-6">
                                                <PluginCard 
                                                    key={slug} 
                                                    image={plugin.image} 
                                                    name={plugin.name} 
                                                    intro={plugin.intro} 
                                                    plugin_source={plugin.source} 
                                                    plugin_slug={slug} 
                                                    plugin_file={plugin.file} 
                                                    download_url={plugin.download}
                                                /> 
                                            </div> 
                                            ))
                                        } */}
                                        {plugins.map((plugin, index) => ( 
                                            <Col lg={12} key={index}>
                                                {/* {console.log(plugin.icons['1x'])} */}
                                                <PluginCard 
                                                    key={plugin.slug} 
                                                    image={plugin.icons['1x']} 
                                                    name={plugin.name} 
                                                    intro={plugin.short_description} 
                                                    plugin_source='internal'
                                                    plugin_slug={plugin.slug} 
                                                    plugin_file={`${plugin.file}/${plugin.slug}`} 
                                                    download_url={plugin.download_link}
                                                /> 
                                            </Col> 
                                            ))
                                        }
                                        </>
                                    }
                                </Row>
                            </Card>
                        </Col>
                        <Col lg={8}>
                            <Card>
                                <Title heading={4}>
                                    {__("VIP Priority Support", "authpress")}
                                </Title>
                                <Paragraph>
                                    {__("Faster and exclusive support service designed for VIP assistance and benefits.", "authpress")}                                    
                                </Paragraph>
                                <Text link={{ href: 'https://semi.design/', target:"_blank" }}>{__("Support", "authpress")}</Text>
                            </Card>
                            
                            <Card>                                                            
                                <Title heading={4}>
                                    {__("Join the Community", "authpress")}                                    
                                </Title>
                                <Paragraph>
                                    {__("Got a question about the plugin, want to share your awesome project or just say hi? Join our wonderful community!", "authpress")}                                    
                                </Paragraph>
                                <Text link={{ href: 'https://semi.design/', target:"_blank" }}>
                                    {__("Join", "authpress")}
                                </Text>                            
                            </Card>
                            <Card>                                                            
                                <Title heading={4}>
                                    {__("Rate Us", "authpress")}                                    
                                </Title>
                                <Paragraph>
                                    {__("We love to hear from you, we would appreciate every single review.", "authpress")}                                    
                                </Paragraph>
                                <Text link={{ href: 'https://semi.design/', target:"_blank" }}>
                                    {__("Rate", "authpress")}
                                </Text>                            
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
