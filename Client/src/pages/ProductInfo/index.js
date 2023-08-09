import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { SetLoader } from "../../redux/loaderSlice";
import { GetProductById } from "../../apicalls/products";
import { message } from 'antd';

const ProductInfo = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
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
            <div className="flex flex-col gap-2">
              <img src={products.images[selectedImageIndex]} alt="" className='w-full h-96 object-cover rounded-md' />

              <div className="flex gap-5">
                {products.images.map((image, index)=> {
                  return (
                    <img key={index} src={image} alt="" className={`w-20 h-20 object-cover rounded-md cursor-pointer ${selectedImageIndex === index ? 'border-2 border-green-700 border-solid' : ''}`} onClick={()=>setSelectedImageIndex(index)} />
                  )
                })}
              </div>
            </div>

        </div>
    </div>
  )
}

export default ProductInfo