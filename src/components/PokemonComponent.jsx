import { useState, useEffect } from 'react'
import PokemonCard from './PokemonCard'

class Pokemon {
	constructor(name, img, id, base_experience) {
		this.name = name
		this.img = img
		this.type = {}
		this.id = id
		this.xp = base_experience
	}
}

const getRandomOffset = () => {
	return Math.floor(Math.random() * 100) + 1
}

const PokemonComponent = ({ maxPokemon, saveToLocal }) => {
	const [listOfPokemon, setListOfPokemon] = useState([])

	const fetchesPokemon = async (offset) => {
		const url = `https://pokeapi.co/api/v2/pokemon/?limit=${maxPokemon}&offset=${offset}`
		try {
			const response = await fetch(url)
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`)
			}

			const data = await response.json()
			const fetchedPokemon = await Promise.all(
				data.results.map(async (pokemon) => {
					const pokemonDetailResponse = await fetch(pokemon.url)
					const pokemonDetail = await pokemonDetailResponse.json()
					return new Pokemon(
						pokemon.name,
						pokemonDetail.sprites.other.dream_world.front_default,
						pokemonDetail.id,
						pokemonDetail.base_experience
					)
				})
			)

			setListOfPokemon(fetchedPokemon)

			if (saveToLocal) {
				const timestamp = Date.now()
				localStorage.setItem('pokemonData', JSON.stringify(fetchedPokemon))
				localStorage.setItem('pokemonTimestamp', timestamp)
			}
		} catch (error) {
			console.error(error.message)
		}
	}

	useEffect(() => {
		const checkLocalStorage = () => {
			const storedPokemon = localStorage.getItem('pokemonData')
			const storedTimestamp = localStorage.getItem('pokemonTimestamp')

			if (storedPokemon && storedTimestamp) {
				const currentTime = Date.now()
				const twelveHours = 12 * 60 * 60 * 1000

				if (currentTime - storedTimestamp < twelveHours) {
					setListOfPokemon(JSON.parse(storedPokemon))
					return true
				} else {
					localStorage.removeItem('pokemonData')
					localStorage.removeItem('pokemonTimestamp')
				}
			}

			return false
		}

		const main = async () => {
			if (!checkLocalStorage()) {
				const randomOffset = getRandomOffset()
				await fetchesPokemon(randomOffset)
				console.log('Pokemon fetched')
				console.log(listOfPokemon)
			} else {
				console.log('Loaded from localStorage')
				console.log(listOfPokemon)
			}
		}

		main()
	}, [])

	return (
		<div
			className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 py-4'
			id='pokemon-container'
		>
			{listOfPokemon.map((pokemon) => (
				<PokemonCard key={pokemon.id} pokemon={pokemon} />
			))}
		</div>
	)
}

export default PokemonComponent
