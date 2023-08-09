import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";
import { getProducts } from "../../apicalls/products";
import { message } from "antd";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilers] = useState({
    status: "approved",
  });
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await getProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.products);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
       {
        products?.map((product, index)=>{
          return <div>
             <h1>{product.name}</h1>
          </div>
        })
       }
        
    </div>
  );
};

export default Home;
