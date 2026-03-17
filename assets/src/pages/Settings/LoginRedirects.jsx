import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { Row, Col, Skeleton, Typography, Switch, RadioGroup, Radio, TextArea, Table, Popconfirm, Select, Button, Modal, Form, Input, Toast } from '@douyinfe/semi-ui';
import { IconDelete, IconEdit, IconPlus } from "@douyinfe/semi-icons";
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ActionButtons from "./ActionButtons";
import { SkeletonPlaceholder } from "../../components";

const { Title, Paragraph } = Typography;
const LoginRedirects = () => {
   const { settings, settingsLoading, handleSubmit, handleReset } = useOutletContext();
   const [hasChanges, setHasChanges] = useState(false);
   const [localValues, setLocalValues] = useState({});
   const [originalValues, setOriginalValues] = useState({});
   const [tableData, setTableData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
   const [bulkAction, setBulkAction] = useState('');
   const [modalVisible, setModalVisible] = useState(false);
   const [formLoading, setFormLoading] = useState(false);
   const [formData, setFormData] = useState({
       type: 'user',
       value: '',
       redirect_to: '',
       status: 'active'
   });
   const [users, setUsers] = useState([]);
   const [roles, setRoles] = useState([]);

   useEffect(() => {
       if (settings && settings?.login_redirects) {
           const loginRedirectsSettings = settings.login_redirects;
           setLocalValues({ ...loginRedirectsSettings });
           setOriginalValues({ ...loginRedirectsSettings });
           setHasChanges(false);
       }
   }, [settings]);

   useEffect(() => {
       fetchLoginRedirects();
       fetchUsers();
       fetchRoles();
   }, []);

    const fetchLoginRedirects = async () => {
        setLoading(true);
        try {
            const result = await apiFetch({
                path: '/authpress/v1/login-redirects',
                method: 'GET',
            });
            if (result.success) {
                setTableData(result.data);
            }
        } catch (error) {
            console.error('Error fetching login redirects:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const result = await apiFetch({
                path: '/authpress/v1/users',
                method: 'GET',
            });
            if (result.success) {
                setUsers(result.data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const result = await apiFetch({
                path: '/authpress/v1/roles',
                method: 'GET',
            });
            if (result.success) {
                setRoles(result.data);
            }
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

   const handleChange = (field, value) => {
       setLocalValues(prev => {
           const updated = { ...prev, [field]: value };
           const isChanged = JSON.stringify(updated) !== JSON.stringify(originalValues);
           setHasChanges(isChanged);
           return updated;
       });
   };

   const handleStatusChange = async (id, newStatus) => {
       try {
           const result = await apiFetch({
               path: `/authpress/v1/login-redirects/${id}`,
               method: 'POST',
               data: { status: newStatus },
           });
           if (result.success) {
               fetchLoginRedirects();
           }
       } catch (error) {
           console.error('Error updating status:', error);
       }
   };

   const handleDelete = async (id) => {
       try {
           const result = await apiFetch({
               path: `/authpress/v1/login-redirects/${id}`,
               method: 'DELETE',
           });
           if (result.success) {
               fetchLoginRedirects();
           }
       } catch (error) {
           console.error('Error deleting redirect:', error);
       }
   };

    const handleBulkAction = async () => {
        if (!bulkAction || selectedRowKeys.length === 0) return;

        try {
            if (bulkAction === 'delete') {
                await apiFetch({
                    path: '/authpress/v1/login-redirects/bulk-delete',
                    method: 'DELETE',
                    data: { ids: selectedRowKeys },
                });
            } else {
                await apiFetch({
                    path: '/authpress/v1/login-redirects/bulk-status',
                    method: 'POST',
                    data: { ids: selectedRowKeys, status: bulkAction },
                });
            }
            setSelectedRowKeys([]);
            setBulkAction('');
            fetchLoginRedirects();
        } catch (error) {
            console.error('Error performing bulk action:', error);
        }
    };

    const handleAddRedirect = () => {
        setModalVisible(true);
    };

    const handleModalCancel = () => {
        setModalVisible(false);
        setFormData({
            type: 'user',
            value: '',
            redirect_to: '',
            status: 'active'
        });
    };

    const handleModalSubmit = async () => {
        if (!formData.type || !formData.value || !formData.redirect_to) {
            Toast.error({ content: __('Please fill in all required fields', 'authpress'), duration: 3 });
            return;
        }

        setFormLoading(true);
        try {
            const result = await apiFetch({
                path: '/authpress/v1/login-redirects',
                method: 'POST',
                data: formData,
            });
            if (result.success) {
                Toast.success({ content: __('Login redirect added successfully', 'authpress'), duration: 3 });
                handleModalCancel();
                fetchLoginRedirects();
            }
        } catch (error) {
            Toast.error({ content: __('Error adding login redirect', 'authpress'), duration: 3 });
            console.error('Error adding redirect:', error);
        } finally {
            setFormLoading(false);
        }
    };

   const onSave = () => {
       handleSubmit('login_redirects', localValues);
   };

    const columns = [
        {
            title: __('ID', 'authpress'),
            dataIndex: 'ID',
            key: 'ID',
            width: 80,
        },
        {
            title: __('User ID', 'authpress'),
            dataIndex: 'user_id',
            key: 'user_id',
            width: 100,
        },
        {
            title: __('Type', 'authpress'),
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: __('Value', 'authpress'),
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: __('Redirect To', 'authpress'),
            dataIndex: 'redirect_to',
            key: 'redirect_to',
        },
        {
            title: __('Status', 'authpress'),
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (text, record) => (
                <Select
                    value={text}
                    onChange={(value) => handleStatusChange(record.ID, value)}
                    style={{ width: '100%' }}
                >
                    <Select.Option value="active">{__('Active', 'authpress')}</Select.Option>
                    <Select.Option value="inactive">{__('Inactive', 'authpress')}</Select.Option>
                </Select>
            ),
        },
        {
            title: __('Actions', 'authpress'),
            key: 'actions',
            width: 100,
            render: (text, record) => (
                <Popconfirm
                    title={__('Are you sure you want to delete this redirect?', 'authpress')}
                    onConfirm={() => handleDelete(record.ID)}
                >
                    <Button
                        type="danger"
                        icon={<IconDelete />}
                        size="small"
                    />
                </Popconfirm>
            ),
        },
    ];

   const rowSelection = {
       selectedRowKeys,
       onChange: setSelectedRowKeys,
   };

   return (
        <>
            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Enable Login Redirects", "authpress")}</Title>
                            <Paragraph>{__("Enable or disable login redirects", "authpress")}</Paragraph>
                        </Skeleton>
                    </Col>
                    {
                        !settingsLoading &&
                        <Col xs={24} lg={12} xl={10}>                                   
                            <Switch
                                onChange={(value) => handleChange('enabled', value)}
                                checked={ Boolean(localValues?.enabled) }
                            />
                        </Col>
                    }
                 </Row>
             </div>

             <div className="setting-unit py-4">
                 <Row gutter={[24, 24]} align="middle">
                     <Col xs={24} lg={12} xl={14}>
                         <Title heading={4}>
                             {__("Login Redirects", "authpress")}
                         </Title>
                         <Paragraph>
                             {__("Manage login redirects for users", "authpress")}
                         </Paragraph>
                     </Col>
                     <Col xs={24} lg={12} xl={10}>
                         {selectedRowKeys.length > 0 && (
                             <div style={{ display: 'flex', gap: '8px' }}>
                                 <Select
                                     value={bulkAction}
                                     onChange={setBulkAction}
                                     placeholder={__("Select bulk action", "authpress")}
                                     style={{ flex: 1 }}
                                 >
                                     <Select.Option value="active">{__("Set Active", "authpress")}</Select.Option>
                                     <Select.Option value="inactive">{__("Set Inactive", "authpress")}</Select.Option>
                                     <Select.Option value="delete">{__("Delete", "authpress")}</Select.Option>
                                 </Select>
                                 <Button
                                     type="primary"
                                     onClick={handleBulkAction}
                                     disabled={!bulkAction}
                                 >
                                     {__("Apply", "authpress")}
                                 </Button>
                             </div>
                         )}
                     </Col>
                  </Row>
                  <div className="pt-4" style={{ marginBottom: '16px' }}>
                      <Button
                          type="primary"
                          icon={<IconPlus />}
                          onClick={handleAddRedirect}
                      >
                          {__('Add New Rule', 'authpress')}
                      </Button>
                  </div>

                  <Modal
                      title={__('Add Login Redirect Rule', 'authpress')}
                      visible={modalVisible}
                      onOk={handleModalSubmit}
                      onCancel={handleModalCancel}
                      confirmLoading={formLoading}
                      okText={__('Add', 'authpress')}
                      cancelText={__('Cancel', 'authpress')}
                      width={600}
                  >
                      <Form
                          layout="vertical"
                          style={{ marginTop: '24px' }}
                      >
                          <Form.Select
                              field="type"
                              label={__('Type', 'authpress')}
                              style={{ width: '100%' }}
                              value={formData.type}
                              onChange={(value) => setFormData({ ...formData, type: value, value: '' })}
                              optionList={[
                                  { label: __('User', 'authpress'), value: 'user' },
                                  { label: __('Role', 'authpress'), value: 'role' },
                              ]}
                          />

                          <Form.Select
                              field="value"
                              label={__('Value', 'authpress')}
                              style={{ width: '100%' }}
                              placeholder={formData.type === 'user' ? __('Select user', 'authpress') : __('Select role', 'authpress')}
                              value={formData.value}
                              onChange={(value) => setFormData({ ...formData, value })}
                              filter
                              showClear
                              optionList={
                                  formData.type === 'user'
                                      ? users.map(user => ({ label: user.name, value: user.id }))
                                      : roles.map(role => ({ label: role.name, value: role.slug }))
                              }
                          />

                          <Form.Input
                              field="redirect_to"
                              label={__('Redirect To', 'authpress')}
                              type="url"
                              placeholder={__('https://example.com/redirect-page', 'authpress')}
                              value={formData.redirect_to}
                              onChange={(value) => setFormData({ ...formData, redirect_to: value })}
                              style={{ width: '100%' }}
                          />

                          <Form.Select
                              field="status"
                              label={__('Status', 'authpress')}
                              style={{ width: '100%' }}
                              value={formData.status}
                              onChange={(value) => setFormData({ ...formData, status: value })}
                              optionList={[
                                  { label: __('Active', 'authpress'), value: 'active' },
                                  { label: __('Inactive', 'authpress'), value: 'inactive' },
                              ]}
                          />
                      </Form>
                  </Modal>

                  <div className="pt-4">

                      <Table
                          columns={columns}
                          dataSource={tableData}
                          rowKey="ID"
                          loading={loading}
                          rowSelection={rowSelection}
                          pagination={{
                              pageSize: 10,
                              showSizeChanger: true,
                              pageSizeOptions: ['10', '20', '50', '100'],
                          }}
                      />
                  </div>
             </div>

             <ActionButtons hasChanges={hasChanges} section='login_redirects' handleReset={handleReset} onSave={onSave} />
        </>
   );
};

export default LoginRedirects;
