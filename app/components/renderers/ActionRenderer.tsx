import React, { ReactNode } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';

export default function ActionRenderer(props: Props) { 
    function confirm(e) {
        props.onDelete(props.data);
    }

   return (
    <Popconfirm
    title="Are you sure you want to delete this campaign?"
    onConfirm={confirm}
    okText="Yes"
    cancelText="No"
  ><div className="-mt-1"><DeleteOutlined style={{ fontSize: '16px', color: '#08c' }} /></div></Popconfirm>
  );
}