import * as React from 'react';

import { cn } from '@/lib/utils';

import { IconButton } from './icon-button';

type FileUploadProps = {
  icon?: React.ReactNode;
  buttonClassName?: string;
  buttonDisabled?: boolean;
  onFileSelected?: (file: File) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

const FileUpload = ({ ref, className, id, icon, buttonClassName, buttonDisabled, onFileSelected, onChange, ...props }: FileUploadProps & { ref?: React.RefObject<HTMLInputElement | null> }) => {
  const inputId = id || React.useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelected) {
      onFileSelected(file);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(inputId)?.click();
  };

  return (
    <div className={cn('inline-flex', className)}>
      <IconButton
        type="button"
        disabled={buttonDisabled}
        className={cn('cursor-pointer', buttonClassName)}
        onClick={handleButtonClick}
        {...(props.title ? { title: props.title } : {})}
        {...(props['aria-label'] ? { 'aria-label': props['aria-label'] } : {})}
      >
        {icon}
      </IconButton>
      <input
        id={inputId}
        ref={ref}
        type="file"
        className="hidden"
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};
FileUpload.displayName = 'FileUpload';

export { FileUpload };
