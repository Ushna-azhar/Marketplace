'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { FaSearch, FaShoppingCart, FaHeart, FaUserPlus, FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
import { useTranslate } from '@/context/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  productName: string;
  category: string;
  image: string;
}

const fetchProducts = async () => {
  const response = await fetch('https://template-03-api.vercel.app/api/products');
  if (!response.ok) {
    console.error('Failed to fetch products');
    return [];
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

export default function Navbar() {
  const { language, setLanguage, translate } = useTranslate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'en' | 'ur' | 'ar');
  };

  const handleSearch = useCallback(() => {
    if (!debouncedSearchQuery) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.productName?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      product.category?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [debouncedSearchQuery, products]);

  useEffect(() => {
    handleSearch();
  }, [debouncedSearchQuery, products, handleSearch]);

  return (
    <div>
      <header className="bg-black text-white py-4 shadow-md relative z-30">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-2xl font-bold flex items-center gap-4">
            <div>Shoezshop</div>
          </div>

          {/* Hamburger Icon moved to the right */}
          <div className="flex items-center gap-4 lg:hidden mr-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

          {/* Centered Navbar Links on Large Screens */}
          <div className="hidden lg:flex justify-center flex-grow space-x-6">
            <Link href="/" className="text-white">{translate('home')}</Link>
            <Link href="/product" className="text-white">{translate('products')}</Link>
            <Link href="#about" className="text-white">{translate('about')}</Link>
            <Link href="#contact" className="text-white">{translate('contact')}</Link>
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="text-white focus:outline-none">
                <FaGlobe size={20} />
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 bg-gray-900 text-white rounded-lg shadow-md mt-2 w-40 z-40">
                  <select value={language} onChange={handleLanguageChange} className="w-full bg-gray-900 text-white p-2 rounded-lg">
                    <option value="en">English</option>
                    <option value="ur">اردو</option>
                    <option value="ar">عربى</option>
                  </select>
                </div>
              )}
            </div>

            {/* Search Icon */}
            <div className="relative">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-white">
                <FaSearch size={20} />
              </button>
              {isSearchOpen && (
                <form onSubmit={(e) => e.preventDefault()} className="absolute top-8 right-0 bg-white p-2 rounded-lg shadow-lg flex items-center z-40">
                  <input
                    type="text"
                    placeholder={translate('searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 text-gray-800 focus:outline-none"
                  />
                </form>
              )}
            </div>

            {/* Desktop Icons - Hidden on Mobile */}
            <div className="hidden lg:flex gap-4">
              <Link href="/register">
                <FaUserPlus size={20} className="text-white hover:text-gray-300 transition" />
              </Link>
              <Link href="/cart" className="text-white hover:text-gray-300 transition">
                <FaShoppingCart size={20} />
              </Link>
              <Link href="/wishlist" className="text-white hover:text-gray-300 transition">
                <FaHeart size={20} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hamburger Menu for Mobile */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-90 z-20 flex flex-col items-center pt-20">
          <Link href="/" className="text-white py-4">Home</Link>
          <Link href="/product" className="text-white py-4">Products</Link>
          <Link href="#about" className="text-white py-4">About</Link>
          <Link href="#contact" className="text-white py-4">Contact</Link>

          <div className="text-white py-4">
            <Link href="/cart" className="block py-2">Cart</Link>
            <Link href="/wishlist" className="block py-2">Wishlist</Link>
            <Link href="/register" className="block py-2">Register</Link>
          </div>
        </div>
      )}

      {/* Search Results */}
      {isSearchOpen && (
        <div className="absolute bg-white shadow-lg w-full max-w-sm mt-2 z-40">
          {filteredProducts.length > 0 ? (
            <ul>
              {filteredProducts.map((product, index) => (
                <li key={index} className="px-4 py-2 border-b flex items-center gap-2">
                  <Image src={product.image} alt={product.productName} width={50} height={50} />
                  <div>
                    <p>{product.productName}</p>
                    <p>{product.category}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-2">{translate('noResults')}</p>
          )}
        </div>
      )}
    </div>
  );
}

