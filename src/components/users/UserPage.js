import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './UserPage.css';
import { Client, Databases } from 'appwrite';
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID } from '../../appwrite/config';

const UserPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const client = new Client();
    client
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    const databases = new Databases(client);
    databases.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID)
      .then(response => {
        setProducts(response.documents);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="user-page-container">
      <header className="banner">
        <h1>Welcome to Our Shop</h1>
        <p>Find the best products here</p>
      </header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
      <div className="product-list">
        {products.map(product => (
          <div key={product.$id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
      {/* ...additional content... */}
    </div>
  );
};

export default UserPage;
