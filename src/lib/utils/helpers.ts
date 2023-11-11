import { readable } from 'svelte/store';

/**
 * Determines if the current timezone is between 0 and +3 hours UTC.
 * @returns {boolean} True if the timezone is between 0 and +3 hours UTC, false otherwise.
 */
export const isEurope = () => {
	const offset = new Date().getTimezoneOffset();
	return offset <= 0 && offset >= -180; // Returns true if the timezone is between 0 and +3 hours UTC, false otherwise
};
/**
 * Takes a string and returns a beautified version of it.
 * @param str The input string to be beautified.
 * @returns The beautified string.
 */
export const stringToBeautifiedFragment = (str = '') =>
	(str || '').toLocaleLowerCase().replace(/\s/g, '-').replace(/\?/g, '').replace(/,/g, '');
/**
 * Toggles the 'overflow-y-hidden' class on the 'html' element of the document.
 * @param bool A boolean value indicating whether to show or hide the overflow-y scrollbar.
 */
export const showHideOverflowY = (bool: boolean) => {
	const html = document.querySelector('html');
	if (html) {
		if (bool) {
			html.classList.add('overflow-y-hidden');
		} else {
			html.classList.remove('overflow-y-hidden');
		}
	}
};

/**
 * Formats a date string into a human-readable format.
 * @param date - The date string to format.
 * @returns A string representing the formatted date, or an empty string if the input is invalid.
 */
export const formatDate = (date: string) => {
	try {
		const d = new Date(date);
		return `${d.toLocaleString('default', {
			month: 'long'
		})} ${d.getDate()}, ${d.getFullYear()}`;
	} catch (e) {
		return '';
	}
};

/**
 * Scrolls to the first element that matches the given selector within the provided element.
 * @param element The element to search within.
 * @param selector The selector to match against.
 */
export const scrollToElement = async (element: HTMLElement, selector: string) => {
	const firstElement: HTMLElement | null = element.querySelector(selector);
	if (!firstElement) {
		return;
	}
	firstElement.scrollIntoView({
		behavior: 'smooth'
	});
};

/**
 * Checks if a given URL is an external link.
 * @param href - The URL to check.
 * @returns True if the URL is an external link, false otherwise.
 */
export const isAnExternalLink = (href: string) => href.startsWith('http');

/**
 * Checks if the user agent is running on a Mac or iPad.
 * @returns {boolean} Returns true if the user agent is running on a Mac or iPad, false otherwise.
 */
export const isMac = () =>
	navigator.userAgent.includes('Macintosh') || navigator.userAgent.includes('iPad');

/**
 * Removes the trailing slash from a given string.
 * @param site - The string to remove the trailing slash from.
 * @returns The string without the trailing slash.
 */
export const removeTrailingSlash = (site: string) => {
	return site.replace(/\/$/, '');
};

/**
 * Returns a readable store that tracks whether the media query string matches the current viewport.
 * @param mediaQueryString - The media query string to match against the viewport.
 * @returns A readable store that tracks whether the media query string matches the current viewport.
 */
export const useMediaQuery = (mediaQueryString: string) => {
	const matches = readable<boolean | undefined>(undefined, (set) => {
		if (typeof globalThis['window'] === 'undefined') return;

		const match = window.matchMedia(mediaQueryString);
		set(match.matches);
		const element = (event: MediaQueryListEvent) => set(event.matches);
		match.addEventListener('change', element);
		return () => {
			match.removeEventListener('change', element);
		};
	});
	return matches;
};

/**
 * Scrolls the page to the nearest element matching the given selector.
 * @param selector - The CSS selector of the element to scroll to.
 */
export const scrollIntoView = (selector: string) => {
	const scrollToElement = document.querySelector(selector);

	if (!scrollToElement) return;

	const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

	scrollToElement.scrollIntoView({
		block: 'nearest',
		inline: 'start',
		behavior: mediaQuery.matches ? 'auto' : 'smooth'
	});
};
