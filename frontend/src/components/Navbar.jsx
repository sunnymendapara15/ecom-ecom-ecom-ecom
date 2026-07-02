import { Link } from 'react-router-dom';

const Navbar = ({ cartSize }) => (
  <header className="navbar">
    <div className="logo">
      <Link to="/">Ecom Ecom</Link>
    </div>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/checkout">Checkout</Link>
    </nav>
    <div className="cart-pill">{cartSize} item{cartSize === 1 ? '' : 's'}</div>
  </header>
);

export default Navbar;
