'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { FaSearch, FaShoppingCart, FaHeart, FaUser, FaUserPlus, FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
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
          <div className="text-2xl font-bold">Shoezshop</div>

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

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white focus:outline-none">
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          <nav className="hidden lg:flex space-x-6">
            <Link href="/">{translate('home')}</Link>
            <Link href="/product">{translate('products')}</Link>
            <Link href="#about">{translate('about')}</Link>
            <Link href="#contact">{translate('contact')}</Link>
          </nav>

          <div className="flex space-x-6 items-center">
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

            <Link href="/cart">
              <FaShoppingCart size={20} className="hidden lg:block text-white hover:text-gray-300 transition" />
            </Link>

            <Link href="/wishlist">
              <FaHeart size={20} className="hidden lg:block text-white hover:text-gray-300 transition" />
            </Link>

            <Link href="/admin">
              <FaUser size={20} className="text-white hover:text-gray-300 transition" />
            </Link>

            <Link href="/register">
              <FaUserPlus size={20} className="text-white hover:text-gray-300 transition" />
            </Link>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20">
          {/* Menu items here */}
        </div>
      )}

      {isSearchOpen && (
        <div className="absolute bg-white shadow-lg w-full max-w-sm mt-2 z-40">
          {filteredProducts.length > 0 ? (
            <ul>
              {filteredProducts.map((product, index) => (
                <li key={index} className="px-4 py-2 border-b">
                  <Image src={product.image} alt={product.productName} width={50} height={50} />
                  <p>{product.productName}</p>
                  <p>{product.category}</p>
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
