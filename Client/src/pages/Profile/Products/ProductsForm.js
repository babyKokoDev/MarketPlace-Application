import Modal from 'antd/es/modal/Modal'
import React from 'react'

const ProductsForm = ({
    showProductsForm,
    setShowProductsForm
}) => {

  return (
    <Modal 
    title = ''
    open = {showProductsForm}
    onCancel={()=>setShowProductsForm(false)}
    centered
    >      
    </Modal>
  )
}

export default ProductsForm