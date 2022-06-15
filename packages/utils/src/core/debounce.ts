import { OptionProps } from '../@types';
import { throttle } from './throttle';

export const debounce = (
  delay: number,
  callback: (...args: unknown[]) => unknown,
  options: Pick<OptionProps, 'atBegin'>,
) => {
  const { atBegin = false } = options || {};
  return throttle(delay, callback, { debounceMode: atBegin !== false });
};
