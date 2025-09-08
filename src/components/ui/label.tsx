import * as React from 'react';

import { cn } from '@/lib/utils';

export type LabelProps = {} & React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ ref, className, ...props }: LabelProps & { ref?: React.RefObject<HTMLLabelElement | null> }) => {
  return (
    <label
      className={cn(
        'block text-sm font-medium text-gray-700 mb-1',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
};
Label.displayName = 'Label';

export { Label };
