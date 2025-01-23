
export interface Product {
    name: string;
    price: number;
    stock: number;
  }
  
  export interface Discount {
    discount: number;
  }
  
  export interface Coupon {
    code: string;
    discountValue: number;
    expiryDate: string;
  }
  