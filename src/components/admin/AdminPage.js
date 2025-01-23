import React, { useState, useEffect } from 'react';
import { Client, Databases } from 'appwrite';

const client = new Client();
client.setEndpoint('http://localhost/v1').setProject('your_project_id');

const databases = new Databases(client);

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch products and orders from Appwrite
    const fetchProducts = async () => {
      const response = await databases.listDocuments('products_collection_id');
      setProducts(response.documents);
    };

    const fetchOrders = async () => {
      const response = await databases.listDocuments('orders_collection_id');
      setOrders(response.documents);
    };

    fetchProducts();
    fetchOrders();
  }, []);

  const handleProductUpload = async (product) => {
    await databases.createDocument('products_collection_id', 'unique()', product);
    setProducts([...products, product]);
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <h2>Upload Product</h2>
        {/* Form to upload product */}
        <form onSubmit={handleProductUpload}>
          {/* Form fields */}
          <button type="submit">Upload</button>
        </form>
      </div>
      <div>
        <h2>Order Details</h2>
        <ul>
          {orders.map(order => (
            <li key={order.$id}>{order.details}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPage;
