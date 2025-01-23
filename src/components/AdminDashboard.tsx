'use client';
import React, { useState } from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { Product, Discount, Coupon } from  './type';
import { Chart } from "react-chartjs-2"; 
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Registering the necessary chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

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

  const chartOptions = {
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

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <form onSubmit={handleSubmit(onSubmitProduct)}>
        <div>
          <label>Name</label>
          <input type="text" {...register("name", { required: true })} />
          {errors.name && <span>Name is required</span>}
        </div>
        <div>
          <label>Price</label>
          <input type="number" {...register("price", { required: true })} />
          {errors.price && <span>Price is required</span>}
        </div>
        <div>
          <label>Stock</label>
          <input type="number" {...register("stock", { required: true })} />
          {errors.stock && <span>Stock is required</span>}
        </div>
        <button type="submit">Submit Product</button>
      </form>

      <form onSubmit={handleSubmit(onSubmitDiscount)}>
        <div>
          <label>Discount</label>
          <input type="text" {...register("discount", { required: true })} />
          {errors.discount && <span>Discount is required</span>}
        </div>
        <button type="submit">Submit Discount</button>
      </form>

      <form onSubmit={handleSubmit(onSubmitCoupon)}>
        <div>
          <label>Coupon Code</label>
          <input type="text" {...register("code", { required: true })} />
          {errors.code && <span>Coupon code is required</span>}
        </div>
        <div>
          <label>Discount Value</label>
          <input type="number" {...register("discountValue", { required: true })} />
          {errors.discountValue && <span>Discount value is required</span>}
        </div>
        <div>
          <label>Expiry Date</label>
          <input type="date" {...register("expiryDate", { required: true })} />
          {errors.expiryDate && <span>Expiry date is required</span>}
        </div>
        <button type="submit">Submit Coupon</button>
      </form>

      <div>
        <h2>Products</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index}>{product.name} - ${product.price}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Discounts</h2>
        <ul>
          {discounts.map((discount, index) => (
            <li key={index}>{discount.discount}% off</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Coupons</h2>
        <ul>
          {coupons.map((coupon, index) => (
            <li key={index}>{coupon.code} - {coupon.discountValue}% off</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Dashboard Chart</h2>
        <Chart type="bar" data={processData(products)} options={chartOptions} />
      </div>
    </div>
  );
};

export default AdminDashboard;
