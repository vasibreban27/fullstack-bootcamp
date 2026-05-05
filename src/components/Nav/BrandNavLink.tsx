import styles from "./Nav.module.css";
import { NavLink, type NavLinkProps } from "react-router";
import clsx from "clsx";

export function BrandNavLink({ className, ...props }: NavLinkProps) {
    return (
        <NavLink
            {...props}
            className={({ isActive }) =>
                clsx(
                    styles.link,
                    isActive && styles.active,
                    typeof className === "function"
                        ? className({isPending: false, isTransitioning: false, isActive })
                        : className
                )
            }
        />
    );
}