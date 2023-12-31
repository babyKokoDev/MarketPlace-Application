import { Divider, message } from "antd";
import Modal from "antd/es/modal/Modal";
import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment"
import { useDispatch } from "react-redux";
import { DeleteNotifications } from "../apicalls/notifications";
import { SetLoader } from "../redux/loaderSlice";

const Notifications = ({
  notifications,
  reloadNotifications,
  showNotifications,
  setShowNotifications,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteNotification = async (id) => {
    try {
        dispatch(SetLoader(true));
        const response = await DeleteNotifications(id)
        dispatch(SetLoader(false));
        if (response.success){
            message.success(response.message)
            reloadNotifications()
        } else {
            throw new Error(response.message)
        }
    } catch (error) {
        dispatch(SetLoader(true));
        return(error.message)
    }
  }
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
          <div
            className="flex flex-col border border-solid border-gray-300 rounded p-2 cursor-pointer"
            key={notification._id}
          >
            <div className="flex justify-between">
              <div onClick={() => {
              navigate(notification.onClick);
              setShowNotifications(false);
            }}>
                <h1 className="text-gray-700">{notification.title}</h1>
                <span className="text-gray-500 cursor-pointer">
                  {notification.message}
                </span>
                <h1 className="text-gray-400 text-sm">{moment(notification.createdAt).fromNow()}</h1>
              </div>
              <div>
                   <i className="ri-delete-bin-line" onClick={()=>{deleteNotification(notification._id)}}></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default Notifications;
