import { __ } from "@wordpress/i18n";
import { Table, Input, Select, Tag, Popconfirm, Toast, Empty, Button, Spin } from '@douyinfe/semi-ui';
import { IconSearch, IconDelete, IconRefresh } from '@douyinfe/semi-icons';
import { useState, useEffect } from 'react';
import apiFetch from "@wordpress/api-fetch";

const { Option } = Select;

const TwoFAAuthenticationLogs = () => {
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        perPage: 10,
        total: 0
    });
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        method: ''
    });

    const statusMap = {
        'sent': { text: 'Sent', color: 'blue' },
        'verified': { text: 'Verified', color: 'green' },
        'failed': { text: 'Failed', color: 'red' },
        'expired': { text: 'Expired', color: 'orange' }
    };

    const methodMap = {
        'email': 'Email',
        'sms': 'SMS',
        'whatsapp': 'WhatsApp',
        'totp': 'TOTP',
        'hotp': 'HOTP',
        'backup_code': 'Backup Code'
    };

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: pagination.page,
                per_page: pagination.perPage,
            });

            if (filters.search) {
                params.append('search', filters.search);
            }
            if (filters.status) {
                params.append('status', filters.status);
            }
            if (filters.method) {
                params.append('method', filters.method);
            }

            const response = await apiFetch({
                path: `/authpress/v1/2fa-logs?${params.toString()}`,
                method: 'GET'
            });

            setLogs(response.data || []);
            setPagination(prev => ({
                ...prev,
                total: response.total || 0
            }));
        } catch (error) {
            console.error('Error fetching 2FA logs:', error);
            Toast.error({
                content: __('Failed to fetch logs', 'authpress'),
                duration: 3
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [pagination.page, pagination.perPage]);

    const handleSearch = () => {
        setPagination(prev => ({ ...prev, page: 1 }));
        fetchLogs();
    };

    const handleResetFilters = () => {
        setFilters({
            search: '',
            status: '',
            method: ''
        });
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handleDeleteLog = async (id) => {
        try {
            await apiFetch({
                path: `/authpress/v1/2fa-logs/${id}`,
                method: 'DELETE'
            });

            Toast.success({
                content: __('Log deleted successfully', 'authpress'),
                duration: 3
            });

            fetchLogs();
        } catch (error) {
            console.error('Error deleting log:', error);
            Toast.error({
                content: __('Failed to delete log', 'authpress'),
                duration: 3
            });
        }
    };

    const handleBulkDelete = async () => {
        if (selectedRowKeys.length === 0) {
            Toast.warning({
                content: __('Please select at least one log to delete', 'authpress'),
                duration: 3
            });
            return;
        }

        try {
            await apiFetch({
                path: '/authpress/v1/2fa-logs/bulk-delete',
                method: 'DELETE',
                data: { ids: selectedRowKeys }
            });

            Toast.success({
                content: __('Selected logs deleted successfully', 'authpress'),
                duration: 3
            });

            setSelectedRowKeys([]);
            fetchLogs();
        } catch (error) {
            console.error('Error deleting logs:', error);
            Toast.error({
                content: __('Failed to delete logs', 'authpress'),
                duration: 3
            });
        }
    };

    const handleDeleteAll = async () => {
        try {
            await apiFetch({
                path: '/authpress/v1/2fa-logs/delete-all',
                method: 'DELETE'
            });

            Toast.success({
                content: __('All logs deleted successfully', 'authpress'),
                duration: 3
            });

            setSelectedRowKeys([]);
            fetchLogs();
        } catch (error) {
            console.error('Error deleting all logs:', error);
            Toast.error({
                content: __('Failed to delete all logs', 'authpress'),
                duration: 3
            });
        }
    };

    const columns = [
        {
            title: __('User', 'authpress'),
            dataIndex: 'display_name',
            key: 'display_name',
            width: 200,
            render: (text, record) => (
                <div>
                    <div style={{ fontWeight: 600 }}>{text || 'Unknown'}</div>
                    <div style={{ fontSize: '12px', color: 'var(--semi-color-text-2)' }}>
                        {text ? `(${record.user_id})` : `ID: ${record.user_id}`}
                    </div>
                </div>
            ),
        },
        {
            title: __('Method', 'authpress'),
            dataIndex: 'method',
            key: 'method',
            width: 120,
            render: (method) => (
                <Tag color="cyan">{methodMap[method] || method}</Tag>
            ),
        },
        {
            title: __('Status', 'authpress'),
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => {
                const statusInfo = statusMap[status] || { text: status, color: 'grey' };
                return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
            },
        },
        {
            title: __('IP Address', 'authpress'),
            dataIndex: 'ip_address',
            key: 'ip_address',
            width: 150,
        },
        {
            title: __('User Agent', 'authpress'),
            dataIndex: 'user_agent',
            key: 'user_agent',
            width: 250,
            ellipsis: true,
            render: (text) => (
                <div title={text} style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {text}
                </div>
            ),
        },
        {
            title: __('Attempts', 'authpress'),
            dataIndex: 'attempts',
            key: 'attempts',
            width: 100,
        },
        {
            title: __('Created', 'authpress'),
            dataIndex: 'created_at',
            key: 'created_at',
            width: 180,
            render: (date) => {
                const d = new Date(date);
                return d.toLocaleString();
            },
        },
        {
            title: __('Actions', 'authpress'),
            key: 'actions',
            width: 100,
            fixed: 'right',
            render: (_, record) => (
                <Popconfirm
                    title={__('Are you sure you want to delete this log?', 'authpress')}
                    onConfirm={() => handleDeleteLog(record.ID)}
                    okText={__('Yes', 'authpress')}
                    cancelText={__('No', 'authpress')}
                >
                    <Button
                        type="danger"
                        size="small"
                        icon={<IconDelete />}
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
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Input
                        prefix={<IconSearch />}
                        placeholder={__('Search by user, IP, or user agent...', 'authpress')}
                        value={filters.search}
                        onChange={(value) => setFilters(prev => ({ ...prev, search: value }))}
                        onEnterPress={handleSearch}
                        style={{ width: '300px' }}
                        showClear
                    />
                    <Select
                        placeholder={__('Filter by Status', 'authpress')}
                        value={filters.status || undefined}
                        onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
                        style={{ width: '150px' }}
                        showClear
                    >
                        {Object.keys(statusMap).map(key => (
                            <Option key={key} value={key}>
                                {statusMap[key].text}
                            </Option>
                        ))}
                    </Select>
                    <Select
                        placeholder={__('Filter by Method', 'authpress')}
                        value={filters.method || undefined}
                        onChange={(value) => setFilters(prev => ({ ...prev, method: value }))}
                        style={{ width: '150px' }}
                        showClear
                    >
                        {Object.keys(methodMap).map(key => (
                            <Option key={key} value={key}>
                                {methodMap[key]}
                            </Option>
                        ))}
                    </Select>
                    <Button
                        type="primary"
                        icon={<IconSearch />}
                        onClick={handleSearch}
                    >
                        {__('Search', 'authpress')}
                    </Button>
                    <Button
                        icon={<IconRefresh />}
                        onClick={handleResetFilters}
                    >
                        {__('Reset', 'authpress')}
                    </Button>
                </div>
            </div>

            {selectedRowKeys.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                    <Button
                        type="danger"
                        onClick={handleBulkDelete}
                    >
                        {__('Delete Selected', 'authpress')} ({selectedRowKeys.length})
                    </Button>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <Popconfirm
                    title={__('Are you sure you want to delete all logs? This action cannot be undone.', 'authpress')}
                    onConfirm={handleDeleteAll}
                    okText={__('Yes, Delete All', 'authpress')}
                    cancelText={__('Cancel', 'authpress')}
                >
                    <Button type="danger">
                        {__('Delete All Logs', 'authpress')}
                    </Button>
                </Popconfirm>
            </div>

            <Spin spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={logs}
                    rowKey="ID"
                    rowSelection={rowSelection}
                    pagination={{
                        current: pagination.page,
                        pageSize: pagination.perPage,
                        total: pagination.total,
                        showSizeChanger: true,
                        showTotal: (total) => `${__('Total', 'authpress')}: ${total}`,
                        onChange: (page, pageSize) => {
                            setPagination(prev => ({
                                ...prev,
                                page,
                                perPage: pageSize
                            }));
                        },
                    }}
                    scroll={{ x: 1200 }}
                    empty={
                        <Empty
                            title={__('No logs found', 'authpress')}
                            description={__('There are no 2FA authentication logs to display.', 'authpress')}
                        />
                    }
                />
            </Spin>
        </div>
    );
};

export default TwoFAAuthenticationLogs;
