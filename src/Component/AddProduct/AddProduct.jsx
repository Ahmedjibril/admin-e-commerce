import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
   
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    setProductDetails({ ...productDetails, image: e.target.files[0] });
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const AddProduct = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product',image);

    await fetch('http://localhost:4001/upload',{
     method:'POST',
     headers:{
      Accept:'application/json',
     },
     body:formData,
      
    })
      .then((resp)=>resp.json()).then((data)=>{responseData=data})
        
       if(responseData.success) {
        product.image = responseData.image_url;
        console.log(product);
       
        await fetch('http://localhost:4001/addproduct',{
          method:'POST',
          headers:{
           Accept:'application/json',
          'Content-Type':'application/json',
          },
        body:JSON.stringify(product),
       }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert("Failed")
       
       })
      }
    };
  return (
    <div className='add-product'>
      <div className="addproduct-itemfields">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name='name'
          placeholder='Type here'
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemsfields">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name='old_price'
            placeholder='Type here'
          />
        </div>
        <div className="addproduct-itemsfields">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name='new_price'
            placeholder='Type here'
          />
        </div>
      </div>
      <div className="addproduct-itemsfields">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name='category'
          className='add-product-selector'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfields">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
            className='addproduct-thumbnail-img'
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={AddProduct} className='add-product-btn'>
        ADD
      </button>
    </div>
  );
}
  
export default AddProduct;