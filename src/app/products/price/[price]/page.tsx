'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // For dynamic route params
import RelatedProducts from '@/components/RelatedProducts';
import Image from 'next/image'; // Import Image for optimization

// Define the Product type
type Product = {
  productName: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  image: string;
};

const ProductByPrice = () => {
  const [products, setProducts] = useState<Product[]>([]); // Product state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [cart, setCart] = useState<Product[]>([]); // Local cart state
  const [wishlist, setWishlist] = useState<Product[]>([]); // Local wishlist state
  const [message, setMessage] = useState<string | null>(null); // Success message state
  const [currentProductCategory, setCurrentProductCategory] = useState<string | null>(null); // State for product category

  const params = useParams(); // Get dynamic route params
  const price = Array.isArray(params.price) ? params.price[0] : params.price; // Extract price from URL params

  // Log the price parameter for debugging
  console.log("Price parameter:", price);

  // Fetch products based on price
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://template-03-api.vercel.app/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products. Status: ' + response.status);
        }
        const data = await response.json();

        // Log the response data for debugging
        console.log("API Response:", data);

        if (data && Array.isArray(data.data)) {
          // Filter products by price from the URL parameter
          const filteredProducts = data.data.filter((product: Product) => product.price === parseInt(price || '0'));
          console.log("Filtered Products:", filteredProducts); // Log filtered products for debugging
          
          setProducts(filteredProducts);
          if (filteredProducts.length > 0) {
            // Set the category for related products from the first product
            setCurrentProductCategory(filteredProducts[0].category);
          }
        } else {
          throw new Error('Invalid API response structure');
        }
      } catch (error) {
        console.error("Error occurred during fetch:", error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (price) {
      fetchProducts();
    } else {
      setLoading(false); // If no price, stop loading
    }
  }, [price]); // Dependency array ensures it only runs when the price changes

  // Load cart and wishlist from local storage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      console.log("No cart data found in localStorage"); // Log if cart is empty
    }

    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    } else {
      console.log("No wishlist data found in localStorage"); // Log if wishlist is empty
    }
  }, []);

  // Save cart and wishlist to local storage whenever they change
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    if (wishlist.length > 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [cart, wishlist]);

  // Add product to cart
  const handleAddToCart = (product: Product) => {
    console.log("Adding to cart:", product); // Log the product being added to cart
    // Check if the product is already in the cart based on price, productName, and category
    setCart((prevCart) => {
      const productExists = prevCart.some((item) =>
        item.price === product.price && item.productName === product.productName && item.category === product.category
      );
      console.log("Product Exists in Cart:", productExists); // Log if the product already exists in cart
      if (productExists) {
        return prevCart; // Don't add the product again if already in cart
      }
      // Add the product to the cart
      return [...prevCart, product];
    });
    setMessage('Product added to cart!'); // Show success message
    setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
  };

  // Add or remove product from wishlist
  const handleWishlistToggle = (product: Product) => {
    console.log("Toggling wishlist for product:", product); // Log the product being toggled in the wishlist
    const isProductInWishlist = wishlist.some((item) =>
      item.price === product.price && item.productName === product.productName && item.category === product.category
    ); // Check if the product is in the wishlist
    
    setWishlist((prevWishlist) => {
      if (isProductInWishlist) {
        return prevWishlist.filter((item) =>
          item.price !== product.price || item.productName !== product.productName || item.category !== product.category
        ); // Remove from wishlist
      }
      return [...prevWishlist, product]; // Add to wishlist
    });

    setMessage(isProductInWishlist ? 'Product removed from wishlist!' : 'Product added to wishlist!');
    setTimeout(() => setMessage(null), 3000);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Details</h1>
      {message && <div className="alert bg-green-500 text-white p-4 mb-4">{message}</div>} {/* Success message */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <div>No products found for this price.</div>
        ) : (
          products.map((product, index) => (
            <div
              key={`${product.productName}-${product.price}-${product.category}-${index}`} // Added index to ensure uniqueness
              className="border rounded-md p-4"
            >
              <Image 
                src={product.image} 
                alt={product.productName} 
                className="w-full h-48 object-cover mb-4" 
                width={500}  // Specify the width of the image
                height={300}  // Specify the height of the image
              />
              <h2 className="text-lg font-semibold">{product.productName}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-xl font-bold">{product.price} PKR</p>
              <p className="text-sm text-gray-500">Category: {product.category}</p>
              <p className="text-sm text-gray-500">Inventory: {product.inventory}</p>

              {/* Add to Cart Button */}
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleAddToCart(product)} // Add to cart
              >
                Add to Cart
              </button>

              {/* Add to Wishlist Button */}
              <button
                className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={() => handleWishlistToggle(product)} // Toggle wishlist
              >
                {wishlist.some((item) =>
                  item.price === product.price && item.productName === product.productName && item.category === product.category
                ) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          ))
        )}
      </div>
      {currentProductCategory && <RelatedProducts currentProductCategory={currentProductCategory} />}
    </div>
  );
};

export default ProductByPrice;
