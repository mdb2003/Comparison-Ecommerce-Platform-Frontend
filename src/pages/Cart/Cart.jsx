import { useState } from 'react';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: 299.99,
      store: 'Amazon',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 199.99,
      store: 'eBay',
      quantity: 1,
    },
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <FiShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-gray-600">Start adding some items to your cart!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="card flex gap-4"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-lg shrink-0"></div>
                <div className="flex-grow">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{item.name}</h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                  <p className="text-gray-600 mb-2">Sold by {item.store}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <label htmlFor={`quantity-${item.id}`} className="text-sm text-gray-600">
                        Qty:
                      </label>
                      <select
                        id={`quantity-${item.id}`}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        className="input w-20"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="card h-fit">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <button className="btn-primary w-full">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
