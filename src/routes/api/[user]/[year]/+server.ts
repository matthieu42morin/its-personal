import { parseHTML } from 'linkedom';
import type { RouteParams } from './$types';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const html = await getContributions(params);
	return json(parseContributions(html));
}
/** 
 * Scrape function that fetches the HTML response from GitHub.
 * The response contains a table with all the contributions for the given year.
 */
async function getContributions({ user, year }: RouteParams) {
	const api = `https://github.com/users/${user}/contributions?from=${year}-12-01&to=${year}-12-31`;
	const response = await fetch(api);

	if (!response.ok) {
		throw new Error(`Failed to fetch: ${response.status}`);
	}

	return await response.text();
}
/**  
 * This function parses the HTML response from a GitHub account page and returns an array of a user's contributions.
 ** Each contribution is an object with a date and a level.
 ** This function may stop working if GitHub changes the HTML structure, like they did in somewhen in October 2023. 
 */ 
function parseContributions(html: string) {
	const { document } = parseHTML(html);
	const rows = document.querySelectorAll<HTMLTableRowElement>('tbody > tr');
	const contributions: any[] = [];

	for (const row of rows) {
		const days = row.querySelectorAll<HTMLTableCellElement>('td.ContributionCalendar-day');
		const currentRow: any[] = [];

		for (const day of days) {
			const date = day.getAttribute('data-date');
			const level = day.getAttribute('data-level');

			if (date && level) {
				const contribution = {
					date,
					level: parseInt(level, 10)
				};
				currentRow.push(contribution);
			} else {
				currentRow.push(null);
			}
		}
		contributions.push(currentRow);
	}

	return contributions;
}
