import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar'
import './editproduct.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    image: ''

  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertToBase64(file);
    setProduct(prevState => ({
      ...prevState,
      image: base64
    }));
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:5000/api/products/${id}`, product)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
      navigate('/products');

  };

  return (
    <>
    <Sidebar/>
    <div className='Title-edit-product'>Edit Product</div>
    <form onSubmit={handleSubmit}>
      <div className='box-one-product'>
      <div className='box-one-input'>
      <div className='box-one-input-adjust'>
      <label>Name:</label>
      <input type="text" name="name" value={product.name} onChange={handleChange} />
      </div>
      <br />
      <textarea name="description" value={product.description} onChange={handleChange} />
      </div>
      </div>

      <div className='box-two-product'>
      <div className='box-two-input-adjust'>
      <div className='box-input-margin'>
      <label>Category:</label>
      <input type="text" name="category" value={product.category} onChange={handleChange} />
      </div>
      <br />
      <div className='box-input-margin'>

      <label>Price:</label>
      <input type="number" name="price" value={product.price} onChange={handleChange} />
      </div>
      <br />
      <div className='box-input-margin'>

      <label>Stock:</label>
      <input type="number" name="stock" value={product.stock} onChange={handleChange} />
      </div>
      </div>
      </div>


      <div className='box-img'>
      <label htmlFor="file-upload" className='custom-file-upload'>
      <img src={product.image} alt="" />
      </label>
      </div>
      <br />
      <input 
      type="file"
      label="Image"
      name="image"
      id='file-upload'
      accept='.jpeg, .jpg, .png'
      onChange={(e) => handleImageUpload(e)}
      style={{ display: 'none' }}
      />

      
      <div className='btn-product-style'>
      <Button
        variant="contained"
        style={{
        background: "linear-gradient(90deg, rgba(223, 199, 41, 0.8) 0%, rgba(223, 199, 41, 0.8) 100%)",
        opacity: 0.6,
        border: "1px solid rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(25px)",
        width: 250,
        top: 230,
        left: 28
       }}
       type="submit"
       > Edit Product </Button>

      </div>
    </form>
    </>
  );
}
export default EditProduct;

