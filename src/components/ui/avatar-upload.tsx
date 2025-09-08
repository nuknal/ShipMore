import { faCamera, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Button } from './button';

type AvatarUploadProps = {
  preview: string | null;
  onUpload: (file: File) => void;
  size?: 'sm' | 'md' | 'lg';
} & React.HTMLAttributes<HTMLDivElement>;

const AvatarUpload = ({ ref, className, preview, onUpload, size = 'md', ...props }: AvatarUploadProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  };

  const buttonSizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div ref={ref} className={cn('flex flex-col items-center', className)} {...props}>
      <div className="relative mb-2">
        <div className={cn(
          'rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden',
          sizeClasses[size],
        )}
        >
          {!preview
            ? (
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-4xl text-gray-300"
                />
              )
            : (
                <img
                  src={preview}
                  alt="头像预览"
                  className="size-full object-cover"
                />
              )}
        </div>
        <Button
          type="button"
          size="icon"
          className={cn(
            'absolute bottom-0 right-0 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-primary-700',
            buttonSizeClasses[size],
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          <FontAwesomeIcon icon={faCamera} />
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};
AvatarUpload.displayName = 'AvatarUpload';

export { AvatarUpload };
