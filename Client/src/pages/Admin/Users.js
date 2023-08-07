import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { SetLoader } from "../../redux/loaderSlice";
import { GetAllUsers } from "../../apicalls/users";
import { updateProductStatus } from "../../apicalls/products";

const Users = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllUsers();
      dispatch(SetLoader(false));
      if (response.success) {
        setUsers(response.data);
        
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
      try {
        dispatch(SetLoader(true))
        const response = await updateProductStatus(id, status)
        dispatch(SetLoader(false))
        if (response.success) {
          message.success(response.message)
          getData()
        } else {
          throw new Error(response.message)
        }
      } catch (error) {
        dispatch(SetLoader(false))
        message.error(error.message)
      }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      render : (text, record) => {
        return record.role.toUpperCase()
      }
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render : (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY hh:mm A")
      }
    },
    {
      title: "Status",
      dataIndex: "status",
      render : (text, record) => {
        return record.status.toUpperCase()
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === "pending" && (
              <span
                className="underline cursor-pointer"
                onClick={() => {
                  onStatusUpdate(_id, "approved");
                }}
              >
                Approve
              </span>
            )}
            {status === "pending" && (
              <span
                className="underline cursor-pointer"
                onClick={() => {
                  onStatusUpdate(_id, "rejected");
                }}
              >
                Reject
              </span>
            )}
            {status === "approved" && (
              <span
                className="underline cursor-pointer"
                onClick={() => {
                  onStatusUpdate(_id, "blocked");
                }}
              >
                Block
              </span>
            )}
            {status === "blocked" && (
              <span
                className="underline cursor-pointer"
                onClick={() => {
                  onStatusUpdate(_id, "approved");
                }}
              >
                Unblock
              </span>
            )}
          </div>
        );
      },
    },
    
  ];
  return (
    <div>
      <Table columns={columns} dataSource={users} />
    </div>
  );
};

export default Users;
