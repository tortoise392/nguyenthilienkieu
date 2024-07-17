import data from './assets/db/db.json'

export function getDummyData() {
	let filtered = {};

	for (const item of data.currencies) {
		filtered[item.currency] = item;
	}

	return Object.values(filtered).sort((a,b) => a.currency.toLocaleLowerCase().localeCompare(b.currency.toLocaleLowerCase()));
}