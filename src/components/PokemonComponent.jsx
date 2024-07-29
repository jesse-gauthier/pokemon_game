/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import pokemonFetch from '../utilities/PokemonFetch'
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

const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const fetchRandomPokemon = async () => {
	const randomId = getRandomNumber(1, 500)
	const data = await pokemonFetch(randomId)
	return new Pokemon(
		data.name,
		data.sprites.other.dream_world.front_default,
		data.id,
		data.base_experience
	)
}

const PokemonComponent = ({ saveToLocal }) => {
	const [listOfPokemon, setListOfPokemon] = useState([])

	const fetchMultiplePokemon = async () => {
		const numberOfFetches = getRandomNumber(1, 10)
		try {
			const fetchedPokemon = await Promise.all(
				Array.from({ length: numberOfFetches }, () => fetchRandomPokemon())
			)

			if (saveToLocal) {
				const timestamp = Date.now()
				localStorage.setItem('pokemonData', JSON.stringify(fetchedPokemon))
				localStorage.setItem('pokemonTimestamp', timestamp)
			}
			setListOfPokemon(fetchedPokemon)
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
				await fetchMultiplePokemon()
				console.log('Pokemon fetched')
			} else {
				console.log('Loaded from localStorage')
			}
		}

		main()
	}, [])

	const handleCatchRelease = (pokemonId) => {
		setListOfPokemon((prevList) =>
			prevList.filter((pokemon) => pokemon.id !== pokemonId)
		)

		// Also update local storage to remove the Pokémon from "pokemonData"
		const storedPokemon = JSON.parse(localStorage.getItem('pokemonData')) || []
		const updatedPokemon = storedPokemon.filter(
			(pokemon) => pokemon.id !== pokemonId
		)
		localStorage.setItem('pokemonData', JSON.stringify(updatedPokemon))
	}

	return (
		<div
			className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 py-4'
			id='pokemon-container'
		>
			{listOfPokemon.map((pokemon) => (
				<PokemonCard
					key={pokemon.id}
					pokemon={pokemon}
					onCatchRelease={handleCatchRelease}
				/>
			))}
		</div>
	)
}

export default PokemonComponent
