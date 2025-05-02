// types/schema.d.ts
export interface Customer {
    Id: number;
    Name: string;
    Email: string;
    Phone: string;
  }
  
  export interface Product {
    Id: number;
    Name: string;
    Price: number;
    Stock: number;
  }
  
  export interface Order {
    Id: number;
    CustomerId: number;
    OrderDate: string;
  }
  
  export interface OrderDetail {
    Id: number;
    OrderId: number;
    ProductId: number;
    Quantity: number;
  }
  