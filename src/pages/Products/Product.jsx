import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Sidebar from "../../components/sidebar/Sidebar";
import { Button, Menu, MenuItem } from '@mui/material';
import "./products.css";
import { Link,useParams } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
 

function Product() {

  const [products, setProducts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProductId,setselectedProductId] = useState ("");

  console.table (products);

  const handleClick = (e,productId) => {
    console.log(productId);
    setAnchorEl(e.currentTarget);
    setselectedProductId(productId);
  
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      setAnchorEl(null);

    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <>
    <Sidebar/>
    <div className='btn-product-n-style'>
      <Link  to="/newProduct" style={{ textDecoration: 'none'}}>
       <Button
        variant="contained"
        style={{
        background: "#F2D500",
        opacity: 0.6,
        border: "1px solid rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(25px)",
        width: 250,
       }}
       type="button"
       >
         +New Product 
      </Button>  
      </Link> 
      </div>

    <TableContainer component={Paper} sx={{ height: 300, width: '80%' ,marginLeft: '18%', marginTop: '20px' }}>
      <Table>
      <TableHead  style={{backgroundColor:'#809FB8'}}>
          <TableRow >  
            <TableCell style={{color: 'white'}}>Name</TableCell>
            <TableCell style={{color: 'white'}} >Description</TableCell>
            <TableCell style={{color: 'white'}}>Price</TableCell>
            <TableCell style={{color: 'white'}}>Inventory</TableCell>
            <TableCell style={{color: 'white'}}>Category</TableCell>
            <TableCell style={{color: 'white'}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product. _id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <MoreVertIcon  className="more-icon"  onClick={(e) => handleClick(e,product._id)} />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Boost product</MenuItem>
                  <MenuItem >
                  <Link to={`/editProduct/${selectedProductId}` } className="no-decoration">Edit</Link>
                  </MenuItem>
                  <MenuItem onClick={() => deleteProduct(selectedProductId)}>Delete</MenuItem>
                </Menu>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default Product;
