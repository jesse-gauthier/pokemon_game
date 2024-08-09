import PokemonClass from './PokemonClass'

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

		// Extracting moves, abilities, held items, and types
		const moves = data.moves.map((move) => move.move)
		const abilities = data.abilities.map((ability) => ability.ability)
		const held_items = data.held_items.map((item) => item.item.name)
		const types = data.types.map((type) => type.type.name)

		return new PokemonClass(
			data.name,
			data.sprites.other.dream_world.front_default,
			data.id,
			data.base_experience,
			moves,
			abilities,
			held_items,
			types
		)
	} catch (error) {
		console.error(error.message)
	}
}
