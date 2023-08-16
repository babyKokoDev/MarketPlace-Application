import { Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";
import { GetAllBids } from "../../../apicalls/products";
import moment from "moment";
import Divider from '../../../components/Divider'

const Bids = ({ showBidsModal, setShowBidsModal, selectedProduct }) => {
  const [bidsData, setBidsData] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllBids({
        product: selectedProduct._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        setBidsData(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title : 'Bid Placed On',
      dataIndex : 'CreatedAt',
      render : (text, record) => {
         return moment(text).format('DD-MM-YYYY hh:mm a');
      }
    },
    {
      title : 'Name',
      dataIndex : 'name',
      render : (text, record) => {
        return record.buyer.name
      }
    },
    {
      title : 'Bid Amount',
      dataIndex : 'bidAmount',
    },
    {
      title : 'Bid Date',
      dataIndex : 'bidDate',
      render : (text, record) => {
        return moment(text).format('DD-MM-YY, h:mm:ss a')
      }
    },
    {
      title : 'Message',
      dataIndex : 'message',
    },
    {
      title : 'Contact Details',
      dataIndex : 'contactDetails',
      render : (text, record) => {
        return <div>
          <p>Phone : {record.mobile}</p>
          <p>Email : {record.buyer.email}</p>
        </div>
      }
    },
  ];

  useEffect(()=> {
       getData()
  }, [])
  
  return (
    <Modal
      open={showBidsModal}
      onCancel={() => setShowBidsModal(false)}
      centered
      width={1500}
      footer={null}
    >
      <div className="flex gap-3 flex-col">
      <h1 className=" text-primary">Bids</h1>
        <Divider />
      <h1 className="text-xl text-primary">Product Name : {selectedProduct.name}</h1>
      <Table columns={columns} dataSource={bidsData} />
      </div>
     
    </Modal>
  );
};

export default Bids;
