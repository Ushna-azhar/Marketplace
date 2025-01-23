'use client';
import React, { useState } from 'react';
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form';
import { Product, Discount, Coupon } from './type'; 
import { Chart } from 'react-chartjs-2'; 
import { ChartOptions } from 'chart.js'; 
import Papa from 'papaparse'; 
import * as XLSX from 'xlsx';

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const { register, handleSubmit } = useForm();

  const onSubmitProduct: SubmitHandler<FieldValues> = (data) => {
    const productData = data as Product;
    setProducts((prevProducts) => [...prevProducts, productData]);
    console.log('Product Submitted', productData);
  };

  const onSubmitDiscount: SubmitHandler<FieldValues> = (data) => {
    const discountData = data as Discount;
    setDiscounts((prevDiscounts) => [...prevDiscounts, discountData]);
    console.log('Discount Submitted', discountData);
  };

  const onSubmitCoupon: SubmitHandler<FieldValues> = (data) => {
    const couponData = data as Coupon;
    setCoupons((prevCoupons) => [...prevCoupons, couponData]);
    console.log('Coupon Submitted', couponData);
  };

  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Admin Dashboard Chart',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#000',
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
  };

  const processData = (products: Product[]) => {
    const labels = products.map((product) => product.name);
    const stockData = products.map((product) => product.stock);

    return {
      labels, // Array of product names
      datasets: [
        {
          label: 'Product Stock', // Label for the chart
          data: stockData, // Stock values for each product
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
  };

  // Handle CSV file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (fileExtension === 'csv') {
      // Parse CSV file
      Papa.parse(file, {
        complete: (result) => {
          const uploadedProducts = result.data as Product[];
          setProducts((prevProducts) => [...prevProducts, ...uploadedProducts]);
        },
        header: true, // Assuming the first row contains headers
        skipEmptyLines: true,
      });
    } else if (fileExtension === 'xlsx') {
      // Parse Excel file
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as ArrayBuffer;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
        const sheet = workbook.Sheets[sheetName];
        const uploadedProducts = XLSX.utils.sheet_to_json<Product>(sheet);
        setProducts((prevProducts) => [...prevProducts, ...uploadedProducts]);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Unsupported file format. Please upload a CSV or Excel file.');
    }
  };

  return (
    <div className="admin-dashboard max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Product Management Form */}
      <form onSubmit={handleSubmit(onSubmitProduct)} className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label>Name</label>
            <input
              type="text"
              {...register('name', { required: true })}
              className="p-2 border border-gray-300 rounded mt-2 w-full"
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              {...register('price', { required: true })}
              className="p-2 border border-gray-300 rounded mt-2 w-full"
            />
          </div>
          <div>
            <label>Stock</label>
            <input
              type="number"
              {...register('stock', { required: true })}
              className="p-2 border border-gray-300 rounded mt-2 w-full"
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Submit Product</button>
      </form>

      {/* Bulk Upload Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Bulk Upload</h2>
        <input
          type="file"
          accept=".csv, .xlsx"
          onChange={handleFileUpload}
          className="p-2 border border-gray-300 rounded mt-2 w-full sm:w-auto"
        />
      </div>

      {/* Discount Management Form */}
      <form onSubmit={handleSubmit(onSubmitDiscount)} className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Discount</h2>
        <div className="mb-4">
          <label>Discount Percentage</label>
          <input
            type="number"
            {...register('discount', { required: true })}
            className="p-2 border border-gray-300 rounded mt-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Submit Discount</button>
      </form>

      {/* Coupon Management Form */}
      <form onSubmit={handleSubmit(onSubmitCoupon)} className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Coupon</h2>
        <div className="mb-4">
          <label>Coupon Code</label>
          <input
            type="text"
            {...register('code', { required: true })}
            className="p-2 border border-gray-300 rounded mt-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label>Discount Value</label>
          <input
            type="number"
            {...register('discountValue', { required: true })}
            className="p-2 border border-gray-300 rounded mt-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label>Expiry Date</label>
          <input
            type="date"
            {...register('expiryDate', { required: true })}
            className="p-2 border border-gray-300 rounded mt-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Submit Coupon</button>
      </form>

      {/* Products List */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <ul className="list-disc pl-6">
          {products.map((product, index) => (
            <li key={index}>{product.name} - ${product.price}</li>
          ))}
        </ul>
      </div>

      {/* Dashboard Chart */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Dashboard Chart</h2>
        <Chart type="bar" data={processData(products)} options={chartOptions} />
      </div>
    </div>
  );
};

export default AdminDashboard;
