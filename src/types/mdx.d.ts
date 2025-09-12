declare module '*.mdx' {
  import type { ComponentType, DetailedHTMLProps, HTMLAttributes } from 'react';

  const MDXComponent: ComponentType<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
  export default MDXComponent;
}