export const $ = <T extends HTMLElement>(selector: string) => {
  const $element = document.querySelector<T>(selector);
  if ($element === null) throw new ReferenceError(`${selector} 엘리먼트가 존재하지 않습니다.`);
  return $element;
};

export const $all = <T extends HTMLElement>(selector: string) => document.querySelectorAll<T>(selector);
