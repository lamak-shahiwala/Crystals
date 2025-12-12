'use client';
import React from 'react';

type CTAButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function CTAButton({
  children,
  onClick,
  className = '',
}: CTAButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={'Trade'}
      className={`inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-1 bg-primary text-white font-body ${className}`}
    >
      {children}
    </button>
  );
}
