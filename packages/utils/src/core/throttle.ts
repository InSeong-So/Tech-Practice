import { OptionProps } from '../@types';

export function throttle(delay: number, callback: (...args: unknown[]) => unknown, options: OptionProps) {
  const { noTrailing = false, noLeading = false, debounceMode = undefined } = options || {};

  let timeoutID: NodeJS.Timeout | undefined;
  let cancelled = false;

  let lastExec = 0;

  const clearExistingTimeout = () => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  };

  const cancel = (cancleOption: Pick<OptionProps, 'upcomingOnly'>) => {
    const { upcomingOnly = false } = cancleOption || {};
    clearExistingTimeout();
    cancelled = !upcomingOnly;
  };

  const wrapper = (...arguments_: unknown[]) => {
    const elapsed = Date.now() - lastExec;

    if (cancelled) {
      return;
    }

    const exec = () => {
      lastExec = Date.now();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      callback.apply(this, arguments_);
    };

    const clear = () => {
      timeoutID = undefined;
    };

    if (!noLeading && debounceMode && !timeoutID) exec();

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      if (noLeading) {
        lastExec = Date.now();
        if (!noTrailing) {
          timeoutID = setTimeout(debounceMode ? clear : exec, delay);
        }
      } else {
        exec();
      }
    } else if (noTrailing !== true) {
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  };

  wrapper.cancel = cancel;

  return wrapper;
}
