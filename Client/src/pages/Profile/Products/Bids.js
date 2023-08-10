import { Modal } from "antd";
import React, { useState } from "react";

const Bids = ({ showBidsModal, setShowBidsModal, selectedProduct }) => {
    const [bidsData, showBidsData] = useState([])
  return (
    <Modal
      title="Bids"
      open={showBidsModal}
      onCancel={() => setShowBidsModal(false)}
      centered
    ></Modal>
  );
};

export default Bids;
