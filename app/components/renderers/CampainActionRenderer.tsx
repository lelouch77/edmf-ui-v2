import React from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import routes from '../../constants/routes.json'
import { Popconfirm } from "antd";
import { useHistory } from 'react-router-dom'

const ActionRenderer = ({ onDelete, data }: any) => {
  const history = useHistory();
  return (
    <div className="flex">
      <div className="-mt-1 mr-5 cursor-pointer" onClick={() => history.push(`${routes.SEGMENTS}/${data.id}`)}>
        <EditOutlined style={{ fontSize: "16px", color: "#08c" }} />
      </div>
      <Popconfirm
        title="Are you sure you want to delete this Segment?"
        onConfirm={() => onDelete(data.id)}
        okText="Yes"
        cancelText="No"
      >
        <div className="-mt-1 cursor-pointer">
          <DeleteOutlined style={{ fontSize: "16px", color: "#08c" }} />
        </div>
      </Popconfirm>
    </div>
  );
}

export default ActionRenderer