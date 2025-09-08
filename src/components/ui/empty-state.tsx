import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Card } from './card';

type EmptyStateProps = {
  isLoading?: boolean;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const EmptyState = ({ ref, className, isLoading = false, icon, title, description, action, children, ...props }: EmptyStateProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <Card className={cn('p-6 flex justify-center items-center', className)} ref={ref} {...props}>
      <div className="text-center">
        {isLoading
          ? (
              <>
                <div className="mb-2 inline-flex items-center justify-center">
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin text-2xl text-primary-600" />
                </div>
                <p className="text-gray-600">{description || '正在加载数据...'}</p>
              </>
            )
          : (
              <>
                {icon && <div className="mb-2">{icon}</div>}
                {title && <h3 className="mb-1 text-lg font-medium text-gray-900">{title}</h3>}
                {description && <p className="mb-4 text-gray-600">{description}</p>}
                {action && <div className="mt-4">{action}</div>}
                {children}
              </>
            )}
      </div>
    </Card>
  );
};
EmptyState.displayName = 'EmptyState';

export { EmptyState };
