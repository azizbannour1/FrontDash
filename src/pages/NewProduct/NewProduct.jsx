import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar'
import './newproduct.css';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import avatar from '../../assets/avatar.png';

function NewProduct() {

  const navigate = useNavigate();
  const [postImage, setPostImage] = useState( { image : ""})

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const handleProductNameChange = event => {
    setName(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = event => {
    setCategory(event.target.value);
  };

  const handlePriceChange = event => {
    setPrice(parseFloat(event.target.value));
  };

  const handleStockChange = event => {
    setStock(parseInt(event.target.value));
  };

  const handleFormSubmit = event => {
    event.preventDefault();
  
    const formData = {
      name,
      description,
      category,
      price,
      stock,
      image: postImage.image 

    };
  
    createPost(postImage);
  
    axios.post('http://localhost:5000/api/products', formData)
      .then(response => {
        console.log(response);
        navigate('/products');
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  // start here: 

  const createPost = async (newImage) => {
    try{
      await axios.post(url, newImage)
    }catch(error){
      console.log(error)
    }
  }

 
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setPostImage({ ...postImage, image : base64 })
  }

  function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }
  


  

  return (
    <>
    <Sidebar/>
    <div className='Title-new-product'>New Product</div>
    <div className='container-prod'>
    <form onSubmit={handleFormSubmit}>
       <div className='box-one-product'>
        <div className='box-one-input'>
        <div className='box-one-input-adjust'>
          <label>
            Product Name:
            <input type="text" value={name} placeholder='Name' onChange={handleProductNameChange} />
          </label>
          </div>
          <br />
             <textarea value={description} placeholder='Description'   onChange={handleDescriptionChange} />
           </div>
        </div>
        <div className='box-two-product'>
        <div className='box-two-input-adjust'>
        <div className='box-input-margin'>
          <label>
            Category:
            <input type="text" value={category} onChange={handleCategoryChange} />
          </label>
          </div>
          <br />
          <div className='box-input-margin'>
          <label>
            Price:
            <input type="number" value={price} onChange={handlePriceChange} />
          </label>
          </div>
          <br />
          <div className='box-input-margin'>
          <label>
            Stock:
            <input type="number" value={stock} onChange={handleStockChange} />
          </label>
          </div>
          </div>
        </div>
        <div className="box-img">
        <label htmlFor="file-upload" className='custom-file-upload'>
          <img src={postImage.image || avatar} alt="" />
        </label>

        <input 
          type="file"
          lable="Image"
          name="image"
          id='file-upload'
          accept='.jpeg, .png, .jpg'
          onChange={(e) => handleFileUpload(e)}
         />
         </div>
       <br />
        <Button
        variant="contained"
        style={{
        background: "linear-gradient(90deg, rgba(223, 199, 41, 0.8) 0%, rgba(223, 199, 41, 0.8) 100%)",
        opacity: 0.6,
        border: "1px solid rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(25px)",
        width: 250,
        top: 530,
        left: 650
       }}
       type="submit"
       >
         Add Product
      </Button >   
        </form>
    </div>
    </>
  );
  
      }
export default NewProduct;

