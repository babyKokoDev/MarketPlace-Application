import { Button, message } from "antd";
import Upload from "antd/es/upload/Upload";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";
import { uploadProductImage } from "../../../apicalls/products";

const Images = ({ selectedProduct, getData, setShowProductForm }) => {
  const [showPreview, setShowPreview] = useState(true);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const [images, setImages] = useState(selectedProduct.images);
  const upLoad = async () => {
    try {
      dispatch(SetLoader(true));
      // Upload Image to Cloudinary and Get the URL
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedProduct._id);
      const response = await uploadProductImage(formData);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        setImages([...images, response.data]);
        setShowPreview(false);
        setFile(null)
        getData();
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  return (
    <div>
      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => {
          setFile(info.file);
          setShowPreview(true);
        }}
        showUploadList={showPreview}
      >
        <div className="flex gap-5 mb-5">
          {images.map((image, index) => (
            <div className="flex gap-2 border border-solid border-gray-500 rounded p-2 items-end">
              <img src={image} alt="" className="h-20 w-20 object-cover" />
              <i className="ri-delete-bin-line cursor-pointer"></i>
            </div>
          ))}
        </div>

        <Button type="dashed">Upload Image</Button>
      </Upload>

      <div className="flex justify-end gap-5 mt-5">
        <Button
          type="default"
          onClick={() => {
            setShowProductForm(false);
          }}
        >
          Cancel
        </Button>
        <Button type="primary" onClick={upLoad} disabled={!file}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Images;
