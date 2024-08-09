// New function that accepts a URL as a parameter
export default async function fetchFromUrl(url) {
	try {
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`)
		}
		const data = await response.json()
		console.log(data)
		return data
	} catch (error) {
		console.error(error.message)
	}
}
