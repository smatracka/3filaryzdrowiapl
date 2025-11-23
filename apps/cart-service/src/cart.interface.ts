export interface CartItem {
  sku: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  attributes?: Record<string, any>;
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}

export interface AddToCartDto {
  sku: string;
  quantity: number;
}

export interface UpdateCartItemDto {
  sku: string;
  quantity: number;
}

export interface ApplyCouponDto {
  couponCode: string;
}
