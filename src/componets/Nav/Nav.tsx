import { Link, NavLink } from "react-router";
import { BrandNavLink } from "./BrandNavLink";

import styles from './Nav.module.css';

export function Nav() {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>DigitalStack</Link>
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
          <BrandNavLink to="weather/">Weather</BrandNavLink>
        </li>
        <li className={styles.pushRight}>
          <BrandNavLink to="login">Login</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="register">Register</BrandNavLink>
        </li>
      </menu>
    </nav>
  )
}
