import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../features/Auth/AuthContext';
import { BrandNavLink } from './BrandNavLink';

import styles from './Nav.module.css';

export function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        DigitalStack
      </Link>
      <menu className={styles.mainMenu}>
        <li>
          <BrandNavLink to="/">Home</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="todos">Todos</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="counter">Counter</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="weather">Weather</BrandNavLink>
        </li>
        {user && (
          <li className={styles.pushRight}>
            Welcome, {user.firstName}!{' '}
            <a href="/" onClick={(e) => {
              e.preventDefault();
              logout();
              navigate('/');
            }}>Logout</a>
          </li>
        )}
        {!user && (
          <>
            <li className={styles.pushRight}>
              <BrandNavLink to="login">Login</BrandNavLink>
            </li>
            <li>
              <BrandNavLink to="register">Register</BrandNavLink>
            </li>
          </>
        )}
      </menu>
    </nav>
  );
}
