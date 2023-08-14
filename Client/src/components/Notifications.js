import { Divider } from "antd";
import Modal from "antd/es/modal/Modal";
import React from "react";
import { useNavigate } from "react-router-dom";

const Notifications = ({
  notifications,
  reloadNotifications,
  showNotifications,
  setShowNotifications,
}) => {

    const navigate = useNavigate()
  return (
    <Modal
      title="Notifications"
      open={showNotifications}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
      width={1000}
    >
      <div className="flex flex-col gap-2">
        {notifications?.map((notification) => (
          <div className="flex flex-col border border-solid border-gray-300 rounded p-2 cursor-pointer"
          key={notification._id} onClick={()=>{navigate(notification.onClick)
           setShowNotifications(false)
          }}>
            <h1 className="text-gray-700">{notification.title}</h1>
            <span className="text-gray-500 cursor-pointer">{notification.message}</span>

          </div>
        ))}
      </div>
    </Modal>
  );
};

export default Notifications;
