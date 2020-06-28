import React, { ReactNode } from "react";
import { DeleteOutlined, PauseCircleOutlined,PlayCircleOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

export default function ActionRenderer(props: Props) {
  const campaign = props.data;
  function confirmPause(e) {
    props.onPause(props.data);
  }

  function confirmRestart(e) {
    props.onRestart(props.data);
  }

  function confirmDelete(e) {
    props.onDelete(props.data);
  }

  return (
    <div className="flex">
      <div className="mr-4">
       { campaign.status === 10 ?
        <Popconfirm
          title="Are you sure you want to pause this campaign?"
          onConfirm={confirmPause}
          okText="Yes"
          cancelText="No"
        >
          <div className="-mt-1">
            <PauseCircleOutlined style={{ fontSize: "16px", color: "#08c", cursor : "pointer" }} />
          </div>
        </Popconfirm>
        :
        <Popconfirm
          title="Are you sure you want to start this campaign?"
          onConfirm={confirmRestart}
          okText="Yes"
          cancelText="No"
        >
          <div className="-mt-1">
            <PlayCircleOutlined style={{ fontSize: "16px", color: "#08c" , cursor : "pointer"}} />
          </div>
        </Popconfirm>


       }
      </div>
      <div>
        <Popconfirm
          title="Are you sure you want to delete this campaign?"
          onConfirm={confirmDelete}
          okText="Yes"
          cancelText="No"
        >
          <div className="-mt-1">
            <DeleteOutlined style={{ fontSize: "16px", color: "#08c", cursor : "pointer" }} />
          </div>
        </Popconfirm>
      </div>
    </div>
  );
}