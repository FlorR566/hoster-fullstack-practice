import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-white text-slate-900 selection:bg-indigo-500/20 ${className}`}>
      {children}
    </div>
  );
};

export default Layout;
