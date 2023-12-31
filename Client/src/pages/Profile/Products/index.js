import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import ProductsForm from "./ProductsForm";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";
import { DeleteProduct, getProducts } from "../../../apicalls/products";
import moment from "moment";
import Bids from "./Bids";

const Products = () => {
  const [showProductsForm, setShowProductsForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showBids, setShowBids] = useState(false);
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await getProducts({ seller: user._id });
      if (response.success) {
        setProducts(response.products);
        dispatch(SetLoader(false));
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteProduct(id);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Product",
      dataIndex: "image",
      render: (text, record) => {
        return (
          <img
            src={record?.images?.length > 0 ? record.images[0] : ""}
            alt=""
            className="w-14 h-14 object-cover rounded-md"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
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
        return (
          <div className="flex gap-5 items-center">
            <i
              className="ri-delete-bin-line cursor-pointer"
              onClick={() => deleteProduct(record._id)}
            ></i>
            <i
              className="ri-pencil-line cursor-pointer"
              onClick={() => {
                setSelectedProduct(record);
                setShowProductsForm(true);
              }}
            ></i>
            <span
              className="underline cursor-pointer"
              onClick={() => {
                setSelectedProduct(record);
                setShowBids(true);
              }}
            >
              Show Bids
            </span>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className="flex justify-end mb-2">
        <Button
          type="default"
          onClick={() => {
            setShowProductsForm(true);
            setSelectedProduct(null);
          }}
        >
          Add product
        </Button>
      </div>
      <Table columns={columns} dataSource={products} />
      {showProductsForm && (
        <ProductsForm
          showProductsForm={showProductsForm}
          setShowProductsForm={setShowProductsForm}
          selectedProduct={selectedProduct}
          getData={getData}
        />
      )}
      {showBids && (
        <Bids
          showBidsModal={showBids}
          setShowBidsModal={setShowBids}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
};

export default Products;
