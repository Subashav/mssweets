import React from "react";
import { useLocation } from "react-router-dom";

/**
 * PageTransition wrapper
 * Uses the route pathname as key to trigger a graceful fade-in & upward drift
 * whenever the route changes.
 */
export default function PageTransition({ children, className = "" }) {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      className={`page-enter-transition w-full flex-1 flex flex-col ${className}`}
    >
      {children}
    </div>
  );
}
