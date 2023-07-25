import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import ProductsForm from "./ProductsForm";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";
import { getProducts } from "../../../apicalls/products";

const Products = () => {
  const [showProductsForm, setShowProductsForm] = useState(false);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await getProducts();
      if (response.success) {
        setProducts(response.products);
        dispatch(SetLoader(false));
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
      title: "Name",
      dataIndex: "name",
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
      title: "Action",
      dataIndex: "action",
    },
  ];
  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="default"
          onClick={() => {
            setShowProductsForm(true);
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
        />
      )}
    </div>
  );
};

export default Products;
