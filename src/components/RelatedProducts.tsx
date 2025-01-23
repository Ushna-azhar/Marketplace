'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Image from next/image

// Define the type for a product
interface Product {
  id: number;
  productName: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const RelatedProducts = ({ currentProductCategory }: { currentProductCategory: string }) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch('https://template-03-api.vercel.app/api/products');
        
        // Check if response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch related products');
        }

        // Parse the response JSON data
        const data = await response.json();
        
        // Log the data to inspect its structure
        console.log(data);
        
        if (data && Array.isArray(data)) {
          // Filter related products based on category
          const related = data.filter((product: Product) => product.category === currentProductCategory);
          setRelatedProducts(related);
        }
      } catch (error: unknown) { // Explicitly type `error` as `unknown`
        if (error instanceof Error) {
          setError(error.message); // Now you can safely access `message`
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductCategory]);

  if (loading) return <div className="text-black">Loading related products...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="related-products container mx-auto p-6 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div key={`${product.price}-${product.productName}`} className="border border-gray-200 rounded-md p-4 bg-white shadow-lg hover:shadow-xl">
            <Image
              src={product.image}
              alt={product.productName}
              width={500} // Set width for image
              height={400} // Set height for image
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <h3 className="text-lg text-gray-800 font-semibold">{product.productName}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-xl text-green-600 font-bold">{product.price} PKR</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
