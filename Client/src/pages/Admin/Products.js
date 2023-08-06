import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { SetLoader } from "../../redux/loaderSlice";
import { getProducts, updateProductStatus } from "../../apicalls/products";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await getProducts(null);
      if (response.success) {
        setProducts(response.products);
        dispatch(SetLoader(false));
        console.log(response.products);
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
      title: "Product",
      dataIndex: "name",
    },
    {
      title: "Seller",
      dataIndex: "name",
      render: (text, record) => {
        return record.seller.name;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
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
      <Table columns={columns} dataSource={products} />
    </div>
  );
};

export default Products;
