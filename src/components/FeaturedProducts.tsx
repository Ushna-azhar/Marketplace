'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Image from next/image

// Define the type for the product
interface Product {
  id: string;
  productName: string;
  image: string;
  price: string;
}

const FeaturedProducts = () => {
  // Use the Product type instead of any[]
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch featured products data from the API
    fetch('https://template-03-api.vercel.app/api/products')
      .then((response) => response.json())
      .then((data) => {
        // Set the products state with the fetched data
        setProducts(data.data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-4">
          {products.length === 0 ? (
            <p className="text-xl text-gray-500">Loading featured products...</p>
          ) : (
            products.slice(0, 4).map((product) => (
              <div
                key={product.id || product.productName}
                className="bg-gray-200 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={product.image}
                  alt={product.productName}
                  width={400} // Set a fixed width for optimization
                  height={300} // Set a fixed height for optimization
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.productName}</h3>
                <p className="text-gray-600 mb-4">{product.price} PKR</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
