'use client';
import React, { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Product, Discount, Coupon } from './type'; // Ensure types are defined properly
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip);

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  // Separate form instances
  const productForm = useForm();
  const discountForm = useForm();
  const couponForm = useForm();

  // Handlers for form submissions
  const onSubmitProduct: SubmitHandler<FieldValues> = (data) => {
    const productData = data as Product;
    setProducts((prev) => [...prev, productData]);
    productForm.reset();
    console.log("Product Submitted:", productData);
  };

  const onSubmitDiscount: SubmitHandler<FieldValues> = (data) => {
    const discountData = data as Discount;
    setDiscounts((prev) => [...prev, discountData]);
    discountForm.reset();
    console.log("Discount Submitted:", discountData);
  };

  const onSubmitCoupon: SubmitHandler<FieldValues> = (data) => {
    const couponData = data as Coupon;
    setCoupons((prev) => [...prev, couponData]);
    couponForm.reset();
    console.log("Coupon Submitted:", couponData);
  };

  // Chart options and data processing
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Product Stock Levels",
      },
    },
  };

  const processData = (products: Product[]) => {
    const labels = products.map((product) => product.name);
    const data = products.map((product) => product.stock);

    return {
      labels,
      datasets: [
        {
          label: "Stock",
          data,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="admin-dashboard">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Product Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add Product</h2>
        <form onSubmit={productForm.handleSubmit(onSubmitProduct)} className="space-y-4">
          <div>
            <label className="block text-sm">Product Name</label>
            <input
              type="text"
              {...productForm.register("name", { required: "Product name is required" })}
              className="border p-2 w-full"
            />
            {productForm.formState.errors.name && (
              <span className="text-red-500 text-sm">{productForm.formState.errors.name.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm">Price</label>
            <input
              type="number"
              {...productForm.register("price", { required: "Price is required" })}
              className="border p-2 w-full"
            />
            {productForm.formState.errors.price && (
              <span className="text-red-500 text-sm">{productForm.formState.errors.price.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm">Stock</label>
            <input
              type="number"
              {...productForm.register("stock", { required: "Stock is required" })}
              className="border p-2 w-full"
            />
            {productForm.formState.errors.stock && (
              <span className="text-red-500 text-sm">{productForm.formState.errors.stock.message}</span>
            )}
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit Product
          </button>
        </form>
      </div>

      {/* Discount Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add Discount</h2>
        <form onSubmit={discountForm.handleSubmit(onSubmitDiscount)} className="space-y-4">
          <div>
            <label className="block text-sm">Discount Percentage</label>
            <input
              type="number"
              {...discountForm.register("discount", { required: "Discount is required" })}
              className="border p-2 w-full"
            />
            {discountForm.formState.errors.discount && (
              <span className="text-red-500 text-sm">{discountForm.formState.errors.discount.message}</span>
            )}
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit Discount
          </button>
        </form>
      </div>

      {/* Coupon Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add Coupon</h2>
        <form onSubmit={couponForm.handleSubmit(onSubmitCoupon)} className="space-y-4">
          <div>
            <label className="block text-sm">Coupon Code</label>
            <input
              type="text"
              {...couponForm.register("code", { required: "Coupon code is required" })}
              className="border p-2 w-full"
            />
            {couponForm.formState.errors.code && (
              <span className="text-red-500 text-sm">{couponForm.formState.errors.code.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm">Discount Value</label>
            <input
              type="number"
              {...couponForm.register("discountValue", { required: "Discount value is required" })}
              className="border p-2 w-full"
            />
            {couponForm.formState.errors.discountValue && (
              <span className="text-red-500 text-sm">{couponForm.formState.errors.discountValue.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm">Expiry Date</label>
            <input
              type="date"
              {...couponForm.register("expiryDate", { required: "Expiry date is required" })}
              className="border p-2 w-full"
            />
            {couponForm.formState.errors.expiryDate && (
              <span className="text-red-500 text-sm">{couponForm.formState.errors.expiryDate.message}</span>
            )}
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit Coupon
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Product List</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {product.name} - ${product.price} - {product.stock} in stock
            </li>
          ))}
        </ul>
      </div>

      {/* Chart */}
      <div>
        <h2 className="text-xl font-semibold">Product Stock Chart</h2>
        <Chart type="bar" data={processData(products)} options={chartOptions} />
      </div>
    </div>
  );
};

export default AdminDashboard;
