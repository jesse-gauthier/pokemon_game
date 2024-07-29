export default async function pokemonFetch(id) {
	const maxPokemonId = 500

	if (id > maxPokemonId) {
		return console.error(404)
	}

	const url = `https://pokeapi.co/api/v2/pokemon/${id}`

	try {
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`)
		}
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error.message)
	}
}
