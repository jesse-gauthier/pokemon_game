import { useState, useEffect } from 'react'
import PokemonComponent from '../components/PokemonComponent'

const getNumberOfWildPokemon = () => {
	const storedTimestamp = localStorage.getItem('pokemonTimestamp')
	const twelveHours = 12 * 60 * 60 * 1000

	if (storedTimestamp) {
		const currentTime = Date.now()
		const expirationTime = parseInt(storedTimestamp, 10) + twelveHours

		if (currentTime < expirationTime) {
			const storedPokemon = localStorage.getItem('pokemonData')
			if (storedPokemon) {
				const pokemonList = JSON.parse(storedPokemon)
				if (pokemonList.length > 0) {
					return pokemonList.length
				}
			}
		}
	}

	return '...'
}

const Home = () => {
	const maxPokemon = getNumberOfWildPokemon()
	const [countdown, setCountdown] = useState('')

	useEffect(() => {
		const calculateCountdown = () => {
			const storedTimestamp = localStorage.getItem('pokemonTimestamp')
			if (storedTimestamp) {
				const currentTime = Date.now()
				const twelveHours = 12 * 60 * 60 * 1000
				const expirationTime = parseInt(storedTimestamp, 10) + twelveHours
				const timeRemaining = expirationTime - currentTime

				if (timeRemaining > 0) {
					const hours = Math.floor(timeRemaining / (1000 * 60 * 60))
					const minutes = Math.floor(
						(timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
					)
					const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)
					setCountdown(`${hours}h ${minutes}m ${seconds}s`)
				} else {
					setCountdown('Refreshing soon...')
				}
			} else {
				setCountdown('No countdown available')
			}
		}

		calculateCountdown()
		const intervalId = setInterval(calculateCountdown, 1000)

		return () => clearInterval(intervalId)
	}, [])

	return (
		<div className='pb-4'>
			<div className='border-b-4 border-[#d2432e40] py-6'>
				<div className='my-3 md:flex justify-between'>
					<h2 className='text-center text-2xl md:text-4xl'>
						{maxPokemon} Wild Pokemon Appeared
					</h2>
					<span className='block text-lg text-gray-500 self-center'>
						New Pokemon Appear In {countdown}
					</span>
				</div>
			</div>
			<PokemonComponent saveToLocal='true' />
		</div>
	)
}

export default Home
