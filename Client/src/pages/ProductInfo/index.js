import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { SetLoader } from "../../redux/loaderSlice";
import { GetProductById } from "../../apicalls/products";
import { message } from 'antd';

const ProductInfo = () => {
    
    const [products, setProducts] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const getData = async () => {
        try {
          dispatch(SetLoader(true));
          const response = await GetProductById(id);
          dispatch(SetLoader(false));
          if (response.success) {
            setProducts(response.data);
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
   products && <div>
        <div className="grid grid-cols-2">
            {/* Images */}

        </div>
    </div>
  )
}

export default ProductInfo