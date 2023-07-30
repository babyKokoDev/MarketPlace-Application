import { Col, Form, Row, Tabs, message } from "antd";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import Modal from "antd/es/modal/Modal";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";
import { addProducts } from "../../../apicalls/products";

const additionalThings = [
  {
    label: "Bill Available",
    name: "billAvailable",
  },
  {
    label: "Warranty Available",
    name: "warrantyAvailable",
  },
  {
    label: "Accessories Available",
    name: "accessoriesAvailable",
  },
  {
    label: "Box Available",
    name: "boxAvailable",
  },
];

const rules = [
  {
    required: true,
    message: "Required",
  },
];

const ProductsForm = ({
  showProductsForm,
  setShowProductsForm,
  selectedProduct,
  getData,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const onFinish = async (values) => {
    try {
      values.seller = user._id;
      values.status = "pending";
      dispatch(SetLoader(true));
      const response = await addProducts(values);
      if (response.success) {
        message.success(response.message);
        getData();
        setShowProductsForm(false);
        dispatch(SetLoader(false));
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const formRef = useRef(null);

  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);

  return (
    <Modal
      title=""
      open={showProductsForm}
      onCancel={() => setShowProductsForm(false)}
      centered
      width={1000}
      okText="Save"
      onOk={() => formRef.current.submit()}
    >
      <div>
        <h1 className="text-2xl text-primary text-center font-semibold uppercase">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </h1>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="General" key="1">
            <Form layout="vertical" ref={formRef} onFinish={onFinish}>
              <Form.Item label="Name" name="name" rules={rules}>
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Description" name="description" rules={rules}>
                <TextArea type="text" />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Price" name="price" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Category" name="category" rules={rules}>
                    <select>
                      <option value="">Select</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="home">Home</option>
                      <option value="sports">Sports</option>
                    </select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Age" name="age" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex gap-10">
                {additionalThings.map((item) => {
                  return (
                    <Form.Item
                      label={item.label}
                      name={item.name}
                      key={item.name}
                      valuePropName="checked"
                    >
                      <Input
                        type="checkbox"
                        value={item.name}
                        onChange={(e) => {
                          formRef.current.setFieldsValue({
                            [item.name]: e.target.checked,
                          });
                        }}
                        checked={formRef.current?.getFieldValue(item.name)}
                      />
                    </Form.Item>
                  );
                })}
              </div>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Images" key="2">
            <h1>Images</h1>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
};

export default ProductsForm;
