'use client';
import React, { useState } from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { Product, Discount, Coupon } from './type'; // Ensure this import is correct
import { Chart } from "react-chartjs-2"; // Importing Chart component from react-chartjs-2
import { ChartOptions } from "chart.js"; // Importing chart.js types if necessary

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmitProduct: SubmitHandler<FieldValues> = (data) => {
    const productData = data as Product;
    setProducts(prevProducts => [...prevProducts, productData]);
    console.log("Product Submitted", productData);
  };

  const onSubmitDiscount: SubmitHandler<FieldValues> = (data) => {
    const discountData = data as Discount;
    setDiscounts(prevDiscounts => [...prevDiscounts, discountData]);
    console.log("Discount Submitted", discountData);
  };

  const onSubmitCoupon: SubmitHandler<FieldValues> = (data) => {
    const couponData = data as Coupon;
    setCoupons(prevCoupons => [...prevCoupons, couponData]);
    console.log("Coupon Submitted", couponData);
  };

  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Admin Dashboard Chart",
        font: {
          size: 18,
          weight: "bold", 
        },
        color: "#000",
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
  };

  const processData = (products: Product[]) => {
    const labels = products.map(product => product.name);
    const stockData = products.map(product => product.stock);

    return {
      labels, 
      datasets: [
        {
          label: 'Product Stock', 
          data: stockData, 
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
  };

  return (
    <div className="admin-dashboard max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Product Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add Product</h2>
        <form onSubmit={handleSubmit(onSubmitProduct)} className="space-y-4">
          <div>
            <label className="block text-sm">Product Name</label>
            <input type="text" {...register("name", { required: true })} className="border p-2 w-full"/>
            {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
          </div>
          <div>
            <label className="block text-sm">Price</label>
            <input type="number" {...register("price", { required: true })} className="border p-2 w-full"/>
            {errors.price && <span className="text-red-500 text-sm">Price is required</span>}
          </div>
          <div>
            <label className="block text-sm">Stock</label>
            <input type="number" {...register("stock", { required: true })} className="border p-2 w-full"/>
            {errors.stock && <span className="text-red-500 text-sm">Stock is required</span>}
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full md:w-auto">Submit Product</button>
        </form>
      </div>

      {/* Discount Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add Discount</h2>
        <form onSubmit={handleSubmit(onSubmitDiscount)} className="space-y-4">
          <div>
            <label className="block text-sm">Discount Percentage</label>
            <input type="text" {...register("discount", { required: true })} className="border p-2 w-full"/>
            {errors.discount && <span className="text-red-500 text-sm">Discount is required</span>}
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full md:w-auto">Submit Discount</button>
        </form>
      </div>

      {/* Coupon Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add Coupon</h2>
        <form onSubmit={handleSubmit(onSubmitCoupon)} className="space-y-4">
          <div>
            <label className="block text-sm">Coupon Code</label>
            <input type="text" {...register("code", { required: true })} className="border p-2 w-full"/>
            {errors.code && <span className="text-red-500 text-sm">Coupon code is required</span>}
          </div>
          <div>
            <label className="block text-sm">Discount Value</label>
            <input type="number" {...register("discountValue", { required: true })} className="border p-2 w-full"/>
            {errors.discountValue && <span className="text-red-500 text-sm">Discount value is required</span>}
          </div>
          <div>
            <label className="block text-sm">Expiry Date</label>
            <input type="date" {...register("expiryDate", { required: true })} className="border p-2 w-full"/>
            {errors.expiryDate && <span className="text-red-500 text-sm">Expiry date is required</span>}
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full md:w-auto">Submit Coupon</button>
        </form>
      </div>

      {/* Product List */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Product List</h2>
        <ul className="space-y-2">
          {products.map((product, index) => (
            <li key={index} className="flex justify-between flex-wrap">
              <span>{product.name} - ${product.price}</span>
              <span>{product.stock} in stock</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Discount List */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Discounts</h2>
        <ul className="space-y-2">
          {discounts.map((discount, index) => (
            <li key={index} className="flex justify-between flex-wrap">
              <span>{discount.discount}% off</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Coupon List */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Coupons</h2>
        <ul className="space-y-2">
          {coupons.map((coupon, index) => (
            <li key={index} className="flex justify-between flex-wrap">
              <span>{coupon.code} - {coupon.discountValue}% off</span>
              <span>Expires on {coupon.expiryDate}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Dashboard Chart */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Dashboard Chart</h2>
        <div className="relative h-[300px] sm:h-[400px]">
          <Chart type="bar" data={processData(products)} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
