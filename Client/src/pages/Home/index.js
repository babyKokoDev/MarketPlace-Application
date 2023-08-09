import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";
import { getProducts } from "../../apicalls/products";
import { Divider, message } from "antd";
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilers] = useState({
    status: "approved",
  });
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate()

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
      <div className="grid grid-cols-5 gap-5">
      {
        products?.map((product, index)=>{
          return <div className="border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer" onClick={()=>{
            navigate(`/products/${product._id}`)
          }}>
             <img src={product.images[0]} className="w-full h-40 object-cover" alt="" />

             
              <div className="px-2 flex-col gap-1">
                <h1 className="text-lg font-semibold">{product.name}</h1>
                <p className="text-sm">{product.description}</p>
                <Divider/>
                <span className="text-xl font-semibold text-green-700">
                  ${product.price}
                </span>
              </div>
          </div>
        })
       }
      </div>  
    </div>
  );
};

export default Home;
