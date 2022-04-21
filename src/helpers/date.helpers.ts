import { format } from 'date-fns';

const dateFormat = 'hh:mm - dd LLL yyy';
export const getDate = (date: string) => format(new Date(date), dateFormat);
