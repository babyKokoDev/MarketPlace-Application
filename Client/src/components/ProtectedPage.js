import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { Link, useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../redux/loaderSlice";
import { SetUsers } from "../redux/userSlice";
import { Avatar, Badge, Space } from "antd";
import Notifications from "./Notifications";

const ProtectedPage = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      dispatch(SetLoader(false));
      if (response.success) {
        dispatch(SetUsers(response.data));
      }
    } catch (error) {
      dispatch(SetLoader(false));
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <div>
        {/* Header */}
        <div className="flex justify-between items-center bg-primary p-5">
          <Link to="/" className="no-underline">
            <h1 className="text-2xl text-white">MARKET PLACE</h1>
          </Link>
          <div className="bg-white py-2 px-5 flex rounded gap-1 items-center">
            <span
              onClick={() => {
                if (user.role === "user") {
                  navigate("/profile");
                } else {
                  navigate("/admin");
                }
              }}
              className="underline cursor-pointer"
            >
              {user.name}
            </span>
            <Badge count={notifications?.filter((notification)=> !notification.read).length} onClick={()=>setShowNotifications(true)} className="cursor-pointer">
              <Avatar shape="circle" icon={<i className="ri-notification-3-line" />}/>
            </Badge>
            <i
              className="ri-logout-box-r-line ml-10 cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">{children}</div>
        {
          <Notifications
          notifications={notifications}
          reloadNotifications={setNotifications}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications} />
        }
      </div>
    )
  );
};

export default ProtectedPage;
