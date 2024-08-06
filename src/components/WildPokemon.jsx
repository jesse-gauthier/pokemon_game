/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import RandomPasswordGenerator from '../utilities/RandomPasswordGenerator'
import pokemonFetch from '../utilities/PokemonFetch'
import PokemonCard from './PokemonCard'

// Class representing a Pokemon with basic attributes
class Pokemon {
	constructor(name, img, id, base_experience) {
		this.name = name
		this.img = img
		this.id = id
		this.xp = base_experience
	}
}

// Function to fetch a random Pokemon using the random ID
const fetchRandomPokemon = async () => {
	const randomId = RandomPasswordGenerator(1, 500)
	const data = await pokemonFetch(randomId)
	return new Pokemon(
		data.name,
		data.sprites.other.dream_world.front_default,
		data.id,
		data.base_experience
	)
}

// Main component for fetching and displaying Pokemon
const PokemonComponent = ({
	saveToLocal,
	checksForWildPokemon,
	isCountDownExpired,
	setPokemonCatch,
	startFireworks,
}) => {
	const [listOfWildPokemon, setListOfWildPokemon] = useState([])

	// Function to fetch multiple Pokemon and update the state and localStorage if needed
	const fetchMultiplePokemon = async () => {
		const numberOfFetches = RandomPasswordGenerator(1, 10)
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
		const isSavedWildPokemon = () => {
			if (checksForWildPokemon && isCountDownExpired) {
				localStorage.removeItem('wildPokemon')
				localStorage.removeItem('pokemonTimestamp')
				return false
			}

			if (checksForWildPokemon && !isCountDownExpired) {
				setListOfWildPokemon(JSON.parse(checksForWildPokemon))
				return true
			} else {
				return false
			}
		}

		// Main function to fetch or load Pokemon
		const main = async () => {
			if (!isSavedWildPokemon()) {
				await fetchMultiplePokemon()
				console.log('Pokemon fetched')
			} else {
				return
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

	// Function to handle the first catch of a Pokemon
	const handlesFirstCatch = (pokemon) => {
		// Retrieve the caughtPokemon array from local storage or initialize it
		let caughtPokemon = JSON.parse(localStorage.getItem('caughtPokemon')) || []

		// Add the new Pokemon to the caughtPokemon array
		caughtPokemon.push(pokemon)

		// Save the updated array back to local storage
		localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon))

		// Update the state with the new caught Pokemon
		setPokemonCatch(caughtPokemon)
		startFireworks()
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
					onFirstCatch={handlesFirstCatch}
					setPokemonCatch={setPokemonCatch}
					startFireworks={startFireworks}
					isCaught={false}
				/>
			))}
		</div>
	)
}

export default PokemonComponent
