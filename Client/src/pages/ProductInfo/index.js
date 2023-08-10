import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SetLoader } from "../../redux/loaderSlice";
import { GetProductById } from "../../apicalls/products";
import { Button, Divider, message } from "antd";
import moment from "moment";
import BidModal from "./BidModal";

const ProductInfo = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAddNewBid, setShowAddNewBid] = useState(false);
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

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
    products && (
      <div>
        <div className="grid grid-cols-2 gap-5 mt-5">
          {/* Images */}
          <div className="flex flex-col gap-2">
            <img
              src={products.images[selectedImageIndex]}
              alt=""
              className="w-full h-96 object-cover rounded-md"
            />

            <div className="flex gap-5">
              {products.images.map((image, index) => {
                return (
                  <img
                    key={index}
                    src={image}
                    alt=""
                    className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                      selectedImageIndex === index
                        ? "border-2 border-green-700 border-solid"
                        : ""
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                );
              })}
            </div>
            <Divider />
            <div>
              <h1 className="text-gray-600">Added On</h1>
              <span className="text-gray-600">
                {moment(products.createdAt).format("MMM-DD-YYYY hh:mm A")}
              </span>
            </div>
          </div>

          <div className="flex flex-col text-md">
            <div>
              <h1 className="text-2xl font-semibold text-orange-900">
                {products.name}
              </h1>
              <span>{products.description}</span>
            </div>
            <Divider />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-orange-900">
                Products Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Price</span>
                <span className="uppercase">${products.price}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Category</span>
                <span>{products.category}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Bill Available</span>
                <span>{products.billAvailable === true ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Box Available</span>
                <span>{products.boxAvailable === true ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Accessories Available</span>
                <span>
                  {products.accessoriesAvailable === true ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Warranty Available</span>
                <span>
                  {products.warrantyAvailable === true ? "Yes" : "No"}
                </span>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-orange-900">
                Seller Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Name</span>
                <span className="uppercase">{products.seller.name}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Email</span>
                <span>{products.seller.email}</span>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col">
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-orange-900">Bids</h1>
                <Button onClick={() => setShowAddNewBid(!showAddNewBid)}>
                  New Bid
                </Button>
              </div>
            </div>
          </div>
        </div>

        {showAddNewBid && (
          <BidModal
            products={products}
            reloadData={getData}
            showAddNewBid={showAddNewBid}
            setShowAddNewBid={setShowAddNewBid}
          />
        )}
      </div>
    )
  );
};

export default ProductInfo;
