class Move {
	constructor(name, power, accuracy, type) {
		this.name = name
		this.power = power
		this.accuracy = accuracy
		this.type = type
	}
}

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

		this.moves = moves.map(
			(move) =>
				new Move(
					move.name,
					Math.floor(Math.random() * 101), // Random power between 0-100
					Math.floor(Math.random() * 101), // Random accuracy between 0-100
					move.type || 'normal' // Default type if not provided
				)
		)

		this.abilities = abilities // Array of ability names
		this.held_items = held_items // Array of held item names
		this.types = types // Array of type names
	}
}
