import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-3xl border border-brand/10 shadow-sm shadow-brand/5 p-6 ${className}`}>
      {children}
    </div>
  );
}