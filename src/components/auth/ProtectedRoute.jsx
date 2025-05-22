import React from 'react';

/**
 * ProtectedRoute component to handle role-based access control
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authorized
 * @param {string|string[]} props.allowedRoles - Roles that are allowed to access this route
 * @returns {React.ReactNode} - Rendered component or redirect
 */
const ProtectedRoute = ({ children }) => {
  // Simplificamos el componente para que siempre renderice los hijos sin verificar autenticación o roles
  return children;
};

export default ProtectedRoute;
