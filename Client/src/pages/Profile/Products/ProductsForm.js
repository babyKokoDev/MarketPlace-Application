import { Col, Form, Row, Tabs } from "antd";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import Modal from "antd/es/modal/Modal";
import React, { useRef } from "react";

const additionalThings = [
  {
    label: "Bill Available",
    name: "billAvailable",
    check : false
  },
  {
    label: "Warranty Available",
    name: "warrantyAvailable",
    check : false
  },
  {
    label: "Accessories Available",
    name: "accessoriesAvailable",
    check : false
  },
  {
    label: "Box Available",
    name: "boxAvailable",
    check : false
  },
];

const rules = [
  {
    required: true,
    message: "Required",
  },
];

const ProductsForm = ({ showProductsForm, setShowProductsForm }) => {
  const onFinish = (values) => {
    console.log(values);
  };
  const formRef = useRef(null);
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
                  <Form.Item label={item.label} name={item.name} key={item.name}>
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
    </Modal>
  );
};

export default ProductsForm;
