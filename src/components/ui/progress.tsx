import * as React from 'react';

import { cn } from '@/lib/utils';

type ProgressProps = {
  value: number;
  color?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Progress = ({ ref, className, value, color = 'primary', ...props }: ProgressProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <div
      ref={ref}
      className={cn('flex-1 bg-gray-200 rounded-full h-2', className)}
      {...props}
    >
      <div
        className={`bg-${color}-500 h-2 rounded-full`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
Progress.displayName = 'Progress';

export { Progress };
