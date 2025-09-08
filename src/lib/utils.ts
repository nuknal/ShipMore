import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function localTime(timestamp: string) {
  return new Date(timestamp).toLocaleString();
}

export function localDate(timestamp: Date) {
  return timestamp.toLocaleString();
}

export const decodeImageUrl = (url: string) => {
  let decoded = url;
  while (decoded.includes('%')) {
    const next = decodeURIComponent(decoded);
    if (next === decoded) {
      break;
    }
    decoded = next;
  }
  return decoded;
};
