import { Form, Input, Modal, message } from "antd";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";
import { PlaceNewBid } from "../../apicalls/products";

const BidModal = ({
  showAddNewBid,
  setShowAddNewBid,
  products,
  reloadData,
}) => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const { user } = useSelector((state) => state.users);
  const rules = [{ required: true, message: "Required" }];
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await PlaceNewBid({
        ...values,
        product: products._id,
        seller: products.seller._id,
        buyer: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        reloadData();
        setShowAddNewBid(false);
      }else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoader(false));
    }
  };
  return (
    <Modal
      onCancel={() => setShowAddNewBid(false)}
      open={showAddNewBid}
      centered
      width={600}
      onOk={() => formRef.current.submit()}
    >
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-2xl font-semibold text-orange-900 text-center">
          New Bid
        </h1>
        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
          <Form.Item label="Bid Amount" name="bidAmount" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label="Message" name="message" rules={rules}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Mobile" name="mobile" rules={rules}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default BidModal;
