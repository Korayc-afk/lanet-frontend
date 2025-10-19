// src/components/ui/Card.tsx
import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => (
  <div
    className={`rounded-2xl shadow-lg border bg-white p-4 ${className}`}
  >
    {children}
  </div>
);

type CardContentProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardContent = ({ children, className = "" }: CardContentProps) => (
  <div className={`p-2 ${className}`}>{children}</div>
);
