/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import pokemonFetch from '../utilities/PokemonFetch'
import PokemonCard from './PokemonCard'

// Class representing a Pokemon with basic attributes
class Pokemon {
	constructor(name, img, id, base_experience) {
		this.name = name
		this.img = img
		this.type = {} // Currently not used
		this.id = id
		this.xp = base_experience
	}
}

// Function to get a random number between min and max (inclusive)
const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

// Function to fetch a random Pokemon using the random ID
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

// Main component for fetching and displaying Pokemon
const PokemonComponent = ({ saveToLocal }) => {
	const [listOfWildPokemon, setListOfWildPokemon] = useState([])

	// Function to fetch multiple Pokemon and update the state and localStorage if needed
	const fetchMultiplePokemon = async () => {
		const numberOfFetches = getRandomNumber(1, 10)
		try {
			const fetchedPokemon = await Promise.all(
				Array.from({ length: numberOfFetches }, () => fetchRandomPokemon())
			)

			// Save to localStorage if saveToLocal prop is true
			if (saveToLocal) {
				const timestamp = Date.now()
				localStorage.setItem('wildPokemon', JSON.stringify(fetchedPokemon))
				localStorage.setItem('pokemonTimestamp', timestamp)
			}
			setListOfWildPokemon(fetchedPokemon)
			console.log(listOfWildPokemon)
		} catch (error) {
			console.error(error.message)
		}
	}

	useEffect(() => {
		// Function to check localStorage for stored Pokemon data
		const checkLocalStorage = () => {
			const storedPokemon = localStorage.getItem('wildPokemon')
			const storedTimestamp = localStorage.getItem('pokemonTimestamp')

			if (storedPokemon && storedTimestamp) {
				const currentTime = Date.now()
				const twelveHours = 12 * 60 * 60 * 1000

				// Check if the stored data is within the last 12 hours
				if (currentTime - storedTimestamp < twelveHours) {
					setListOfWildPokemon(JSON.parse(storedPokemon))
					return true
				} else {
					localStorage.removeItem('wildPokemon')
					localStorage.removeItem('pokemonTimestamp')
				}
			}

			return false
		}

		// Main function to fetch or load Pokemon
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

	// Function to handle the release of a caught Pokemon
	const handlesRelease = (pokemonId) => {
		console.log(pokemonId)
		// Remove the Pokemon from the list in the state
		setListOfWildPokemon((prevList) =>
			prevList.filter((pokemon) => pokemon.id !== pokemonId)
		)

		// Update the localStorage to remove the Pokemon
		const storedPokemon = JSON.parse(localStorage.getItem('wildPokemon')) || []
		const updatedPokemon = storedPokemon.filter(
			(pokemon) => pokemon.id !== pokemonId
		)
		localStorage.setItem('wildPokemon', JSON.stringify(updatedPokemon))
	}

	return (
		<div
			className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 py-4'
			id='pokemon-container'
		>
			{listOfWildPokemon.map((pokemon) => (
				<PokemonCard
					key={pokemon.id}
					pokemon={pokemon}
					onCatchRelease={handlesRelease}
				/>
			))}
		</div>
	)
}

export default PokemonComponent
