import { __ } from "@wordpress/i18n";
import React from 'react';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
const layouts = [
    'default-login', 'default-login-left', 'default-login-right'
];
import { Layout, Typography, Banner, Breadcrumb, Card, Space, Badge, Button, SideSheet, Col, Row  } from '@douyinfe/semi-ui';
const CustomizerRedesignTemplate = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    const onClick = (template) => {
        handleChange('customizer.redesign.templates',template);
        // Do some more task with template variable
    }
    return (
        <>
            {/* {console.log(settingData)} */}
            <div className="setting-unit pt-4">   
                {
                    !settingLoading &&                               
                    <div xs={24} lg={12} xl={8}>
                        <Row type="flex" gutter={[24, 24]}>
                            {layouts.map((template) => (
                                <Col
                                    key={template}
                                    xs={24} 
                                    lg={12}
                                    xl={8}                                       
                                >
                                    <img 
                                        style={{ cursor: "pointer", border: '5px solid transparent',borderColor: `${settingData?.customizer?.redesign?.templates == template ?'var(--semi-color-success)':'var(--semi-color-info)'}` }} 
                                        className={`w-full border-solid border-4 ${settingData?.customizer?.redesign?.templates == template ?'border-primary':''}`}
                                        src={`${authpress_ajax_obj.image_url}${template}.png`} alt=""
                                        data-src={template}
                                        onClick={ () => onClick(template) }
                                    />
                                </Col>
                            ))}
                        </Row>                 
                    </div>
                }
            </div>
        </>
    )
}
export default withForm(CustomizerRedesignTemplate, 'customizer.redesign.templates');