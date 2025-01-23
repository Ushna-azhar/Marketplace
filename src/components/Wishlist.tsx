'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Image from next/image

// Define the Product type
interface Product {
  productName: string;
  price: number;
  image: string;
}

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(savedWishlist);
  }, []);

  // Remove item from wishlist
  const removeFromWishlist = (product: Product) => {
    const updatedWishlist = wishlist.filter((item) => item.price !== product.price);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    alert(`${product.productName} removed from wishlist!`);
  };

  // Add item to cart from wishlist
  const addToCartFromWishlist = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.productName} added to cart!`);
  };

  if (wishlist.length === 0) return <p className="text-center text-gray-500">Your wishlist is empty!</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8 text-indigo-600">Wishlist</h1>

      <ul className="space-y-6">
        {wishlist.map((product, index) => (
          <li key={index} className="flex flex-col sm:flex-row justify-between border-b py-4">
            <div className="flex items-center sm:w-2/3">
              <Image
                src={product.image}
                alt={product.productName}
                width={64} // Set width for image
                height={64} // Set height for image
                className="object-cover mr-4 mb-4 sm:mb-0"
              />
              <div>
                <h2 className="text-lg font-semibold">{product.productName}</h2>
                <p className="text-gray-500">${product.price}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:w-1/3 space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => addToCartFromWishlist(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(product)}
                className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishlistPage;