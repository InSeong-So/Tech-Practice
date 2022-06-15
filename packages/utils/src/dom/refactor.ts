import { $ } from './selector';

export const classToggle = (selector: string, className: string) => $(selector).classList.toggle(className);
