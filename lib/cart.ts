export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

export function addToCart(item: CartItem) {
    const savedCart = localStorage.getItem("miras-cart");

    const cart: CartItem[] = savedCart
        ? JSON.parse(savedCart)
        : [];

    const existingItem = cart.find(
        (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cart.push(item);
    }

    localStorage.setItem("miras-cart", JSON.stringify(cart));
}
export function removeFromCart(id: string) {
  const savedCart = localStorage.getItem("miras-cart");

  if (!savedCart) return;

  const cart: CartItem[] = JSON.parse(savedCart);

  const newCart = cart.filter((item) => item.id !== id);

  localStorage.setItem("miras-cart", JSON.stringify(newCart));
}
export function updateCartQuantity(id: string, quantity: number) {
  const savedCart = localStorage.getItem("miras-cart");

  if (!savedCart) return;

  const cart: CartItem[] = JSON.parse(savedCart);

  const item = cart.find((cartItem) => cartItem.id === id);

  if (!item) return;

  if (quantity <= 0) {
    const newCart = cart.filter((cartItem) => cartItem.id !== id);
    localStorage.setItem("miras-cart", JSON.stringify(newCart));
    return;
  }

  item.quantity = quantity;

  localStorage.setItem("miras-cart", JSON.stringify(cart));
}