import { DateTime } from '../node_modules/luxon/src/luxon.js';

export const now = DateTime.now();
export const today = now.toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS, {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});
