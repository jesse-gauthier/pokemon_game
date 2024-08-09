// File: Pokemon.js

export default class PokemonClass {
	constructor(
		name,
		img,
		id,
		base_experience,
		moves,
		abilities,
		held_items,
		types
	) {
		this.name = name
		this.img = img
		this.id = id
		this.xp = base_experience
		this.moves = moves // Array of move names
		this.abilities = abilities // Array of ability names
		this.held_items = held_items // Array of held item names
		this.types = types // Array of type names
	}
}
