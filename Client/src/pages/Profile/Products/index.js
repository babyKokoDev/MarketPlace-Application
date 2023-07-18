import { Button } from "antd";
import React, { useState } from "react";
import ProductsForm from "./ProductsForm";

const Products = () => {
  const [showProductsForm, setShowProductsForm] = useState(false);
  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="default"
          onClick={() => {
            setShowProductsForm(true);
          }}
        >
          Add product
        </Button>
      </div>
      {showProductsForm && (
        <ProductsForm
          showProductsForm={showProductsForm}
          setShowProductsForm={setShowProductsForm}
        />
      )}
    </div>
  );
};

export default Products;
