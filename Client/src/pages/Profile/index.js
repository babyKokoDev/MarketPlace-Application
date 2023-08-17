import React from "react";
import { Tabs } from "antd";
import Products from "../Profile/Products";
import UserBids from "./UserBids";
import { useSelector } from "react-redux";
import moment from "moment";

const Profile = () => {
  const { user } = useSelector((state)=> state.users)
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="My Bids" key="2">
          <UserBids />
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <div className="flex flex-col w-1/3">
            <span className="text-primary text-xl flex justify-between mb-3">
              Name : <b className="text-2xl">{user.name}</b>
            </span>
            <span className="text-primary text-xl flex justify-between mb-3">
              Email : <b className="text-2xl">{user.email}</b>
            </span>
            <span className="text-primary text-xl flex justify-between mb-3">
              Role : <b className="text-2xl">{user.role}</b>
            </span>
            <span className="text-primary text-xl flex justify-between mb-3">
              Created At  :{" "} <b className="text-2xl">{moment(user.createdAt).format('MMM D , YYYY hh:mm A')}</b>
            </span>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
