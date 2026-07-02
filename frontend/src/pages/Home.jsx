import { useEffect, useState } from 'react';

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setStatus('loading');
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Unable to load catalog.');
        }
        const catalog = await response.json();
        setProducts(catalog);
        setStatus('ready');
      } catch (err) {
        setError(err.message);
        setStatus('error');
      }
    };

    fetchProducts();
  }, []);

  return (
    <section>
      <div className="page-header">
        <h1>Hand curated collections</h1>
        <p>Discover limited drops and effortless staples.</p>
      </div>
      {status === 'loading' && <p>Loading products...</p>}
      {status === 'error' && <p className="status-error">{error}</p>}
      <div className="product-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} loading="lazy" />
            <div className="product-card__body">
              <p className="product-category">{product.category}</p>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="product-card__footer">
                <strong>${product.price.toFixed(2)}</strong>
                <button onClick={() => addToCart(product)}>Add to cart</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Home;
