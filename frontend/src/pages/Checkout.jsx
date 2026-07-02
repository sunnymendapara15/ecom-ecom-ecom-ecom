import { useMemo, useState } from 'react';

const Checkout = ({ cartItems, updateQuantity, clearCart }) => {
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = useMemo(
    () =>
      cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cartItems.length) {
      setStatusMessage('Add something to the cart before checking out.');
      return;
    }

    const form = event.target;
    const payload = {
      customerName: form.customerName.value,
      email: form.email.value,
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity
      }))
    };

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message ?? 'Order failed.');
      }

      setStatusMessage(data.message ?? `Order received (${data.orderId}).`);
      clearCart();
      form.reset();
    } catch (err) {
      setStatusMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <div className="page-header">
        <h1>Checkout</h1>
        <p>Confirm your order and we’ll send a confirmation.</p>
      </div>
      <div className="checkout-grid">
        <div className="checkout-card">
          <h2>Cart summary</h2>
          {!cartItems.length && <p>Your cart is waiting for you.</p>}
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="checkout-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button
            type="button"
            className="ghost"
            onClick={clearCart}
            disabled={!cartItems.length}
          >
            Clear cart
          </button>
        </div>
        <form className="checkout-card" onSubmit={handleSubmit}>
          <h2>Contact & delivery</h2>
          <label>
            Name
            <input name="customerName" type="text" placeholder="Jordan Lee" required />
          </label>
          <label>
            Email
            <input name="email" type="email" placeholder="you@example.com" required />
          </label>
          <label>
            Notes
            <textarea
              name="notes"
              placeholder="Tell us about gift wrapping or delivery."
              rows="3"
            />
          </label>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending order...' : 'Place order'}
          </button>
          {statusMessage && <p className="status-message">{statusMessage}</p>}
        </form>
      </div>
    </section>
  );
};

export default Checkout;
