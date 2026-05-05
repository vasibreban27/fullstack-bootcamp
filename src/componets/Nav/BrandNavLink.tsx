import { NavLink, type NavLinkProps } from "react-router";
import clsx from "clsx";

import styles from './Nav.module.css';

export function BrandNavLink({className, ...props}: Omit<NavLinkProps, 'className'> & {className?: string}) {
  return (
    <NavLink {...props} className={({isActive}) => clsx(className, { [styles.active]: isActive}) } />
  )
}


// createElement(NavLink, {...props, className: function() {}});
