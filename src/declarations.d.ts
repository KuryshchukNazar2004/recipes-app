declare module 'lodash.debounce' {
    import { DebouncedFunc } from 'lodash';
    export default function debounce<T extends (...args: any[]) => any>(
      func: T,
      wait?: number,
      options?: {
        leading?: boolean;
        trailing?: boolean;
      }
    ): DebouncedFunc<T>;
  }
  