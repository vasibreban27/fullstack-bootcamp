import {Link} from "react-router";
import styles from './Nav.module.css';
import {BrandNavLink} from "./BrandNavLink.tsx";

export function Nav(){
return (
    <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>DigitalStack</Link>
        <menu className={styles.menu}>
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
            <li className={styles.right}>
                <BrandNavLink to="login">Login</BrandNavLink>
            </li>
            <li>
                <BrandNavLink to="register">Register</BrandNavLink>
            </li>
        </menu>
    </nav>
)
}