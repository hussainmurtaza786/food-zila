import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types/user";

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const loadCartFromStorage = (): CartState => {
  if (typeof window === "undefined") return { items: [], totalItems: 0, totalPrice: 0 };
  try {
    const stored = localStorage.getItem("foodzilla-cart");
    if (stored) return JSON.parse(stored);
  } catch {}
  return { items: [], totalItems: 0, totalPrice: 0 };
};

const saveCartToStorage = (state: CartState) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("foodzilla-cart", JSON.stringify(state));
  } catch {}
};

const calcTotals = (items: CartItem[]) => ({
  totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
});

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      const totals = calcTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
      saveCartToStorage(state);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      const totals = calcTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
      saveCartToStorage(state);
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
      const totals = calcTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
      saveCartToStorage(state);
    },
    clearCart(state) {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      saveCartToStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
