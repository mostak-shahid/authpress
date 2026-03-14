import { __ } from "@wordpress/i18n";
import { Row, Col, Skeleton, Typography, Input, RadioGroup, Radio, TextArea } from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ActionButtons from "./ActionButtons";
import { SkeletonPlaceholder } from "../../components";

const { Title, Paragraph } = Typography;
const BasicInputs = () => {
   const { settings, settingsLoading, handleSubmit, handleReset } = useOutletContext();
   const [hasChanges, setHasChanges] = useState(false);
   const [localValues, setLocalValues] = useState({});
   const [originalValues, setOriginalValues] = useState({});

   useEffect(() => {
       if (settings && settings?.basic) {
           const basicSettings = settings.basic;
           setLocalValues({ ...basicSettings });
           setOriginalValues({ ...basicSettings });
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
       handleSubmit('basic', localValues);
   };

   return (
       <>
           {!settingsLoading && settings?.basic && (
               <div>
                   <div className="setting-unit py-4">
                       <Row type="flex" gutter={[24, 24]}>
                           <Col xs={24} lg={12} xl={14}>
                               <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                   <Title heading={4}>{__("Text Input", "authpress")}</Title>
                                   <Paragraph>{__("Lorem", "authpress")}</Paragraph>
                               </Skeleton>
                           </Col>
                           {
                               !settingsLoading &&
                               <Col xs={24} lg={12} xl={10}>
                                   <Input
                                       placeholder={__("Enter text", "authpress")}
                                       style={{ width: '100%' }}
                                       value={localValues?.text || ''}
                                       onChange={(value) => handleChange('text', value)}
                                   />
                               </Col>
                           }
                       </Row>
                   </div>
                   <div className="setting-unit py-4">
                       <Row type="flex" gutter={[24, 24]}>
                           <Col xs={24} lg={12} xl={14}>
                               <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                   <Title heading={4}>{__("Text Area", "authpress")}</Title>
                                   <Paragraph>{__("Lorem", "authpress")}</Paragraph>
                               </Skeleton>
                           </Col>
                           {
                               !settingsLoading &&
                               <Col xs={24} lg={12} xl={10}>
                                   <TextArea
                                       placeholder={__("Enter textarea content", "authpress")}
                                       rows={4}
                                       style={{ width: '100%' }}
                                       value={localValues?.textarea || ''}
                                       onChange={(value) => handleChange('textarea', value)}
                                   />
                               </Col>
                           }
                       </Row>
                   </div>
                   <div className="setting-unit py-4">
                       <Row type="flex" gutter={[24, 24]}>
                           <Col xs={24} lg={12} xl={14}>
                               <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                   <Title heading={4}>{__("Radio Group", "authpress")}</Title>
                                   <Paragraph>{__("Lorem", "authpress")}</Paragraph>
                               </Skeleton>
                           </Col>
                           {
                               !settingsLoading &&
                               <Col xs={24} lg={12} xl={10}>
                                   <RadioGroup
                                       type="button"
                                       value={localValues?.radio || ''}
                                       onChange={(value) => handleChange('radio', value)}
                                   >
                                       <Radio value="radio-1">{__('Radio 1', 'authpress')}</Radio>
                                       <Radio value="radio-2">{__('Radio 2', 'authpress')}</Radio>
                                       <Radio value="radio-3">{__('Radio 3', 'authpress')}</Radio>
                                   </RadioGroup>
                               </Col>
                           }
                       </Row>
                   </div>
                   <ActionButtons hasChanges={hasChanges} section='basic' handleReset={handleReset} onSave={onSave} />
               </div>
           )}
       </>
   );
};

export default BasicInputs;
