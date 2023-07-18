import { Form, Tabs } from "antd";
import Input from "antd/es/input/Input";
import Modal from "antd/es/modal/Modal";
import React from "react";

const ProductsForm = ({ showProductsForm, setShowProductsForm }) => {
  return (
    <Modal
      title=""
      open={showProductsForm}
      onCancel={() => setShowProductsForm(false)}
      centered
      width={1000}
    >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="General" key="1">
          <Form layout="vertical">
             <Form.Item label="Name" name='name'>
                 <Input type="text" />
             </Form.Item>
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
