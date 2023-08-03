import { Button } from "antd";
import Upload from "antd/es/upload/Upload";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";

const Images = ({ selectedProduct, getData, setShowProductForm }) => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const upLoad = () => {
    try {
      dispatch(SetLoader(true));
      // Upload Image Logic
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
        }}
      >
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
