import { faImage, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { IconButton } from './icon-button';

type ImagePreviewProps = {
  src: string;
  alt?: string;
  onRemove?: () => void;
  fileName?: string;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const ImagePreview = ({ ref, className, src, alt = '预览图片', onRemove, fileName = '图片.jpg', disabled = false, ...props }: ImagePreviewProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <div
      ref={ref}
      className={cn('relative inline-block', className)}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className="h-24 w-auto rounded-lg border border-gray-200 object-cover shadow-sm"
      />
      {onRemove && (
        <IconButton
          onClick={onRemove}
          variant="destructive"
          size="sm"
          disabled={disabled}
          className="absolute -right-2 -top-2 size-5 shadow-sm"
          aria-label="移除图片"
        >
          <FontAwesomeIcon icon={faTimes} className="text-xs" />
        </IconButton>
      )}
      <div className="absolute inset-x-0 bottom-0 truncate rounded-b-lg bg-black bg-opacity-50 px-2 py-1 text-xs text-white">
        <FontAwesomeIcon icon={faImage} className="mr-1" />
        <span>{fileName}</span>
      </div>
    </div>
  );
};
ImagePreview.displayName = 'ImagePreview';

export { ImagePreview };
