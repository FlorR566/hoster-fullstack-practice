import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = 'flex-1' }) => {
  return (
    <div className={`max-h-[100vh] overflow-y-auto scroll-y-auto bg-[var(--light-bg)] text-[var(--light-text)] selection:bg-indigo-500/20 ${className}`}>
      {children}
    </div>
  );
};

export default Layout;
