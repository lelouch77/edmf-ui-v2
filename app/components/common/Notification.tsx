import {notification} from 'antd';

const openNotificationWithIcon = (message,type="success",description="") => {
  notification[type]({
    message,
    description
    });
};

export default openNotificationWithIcon