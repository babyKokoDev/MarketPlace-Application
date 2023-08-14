import { Divider } from "antd";
import Modal from "antd/es/modal/Modal";
import React from "react";

const Notifications = ({
  notifications,
  reloadNotifications,
  showNotifications,
  setShowNotifications,
}) => {
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
        {notifications.map((notification) => (
          <div className="flex flex-col gap-2 items-center border border-solid p-2">
            <h1>{notification.title}</h1>
            <Divider />
            <span>{notification.message}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default Notifications;
