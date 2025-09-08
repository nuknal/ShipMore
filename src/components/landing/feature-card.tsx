import React from 'react';

import { cn } from '@/lib/utils';

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
  className?: string;
};

export function FeatureCard({
  icon,
  title,
  description,
  className,
  ...props
}: FeatureCardProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'feature-card bg-white p-6 rounded-xl shadow-sm hover:shadow-lg',
        className,
      )}
      {...props}
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
        <i className={`${icon} text-xl`}></i>
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
