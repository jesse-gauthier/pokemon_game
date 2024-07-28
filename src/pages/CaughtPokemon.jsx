import { useState, useEffect } from 'react'
import PokemonCard from '../components/PokemonCard'

const CaughtPokemon = () => {
	const [countdown, setCountdown] = useState('')
	const [caughtPokemon, setCaughtPokemon] = useState([])

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

	useEffect(() => {
		const storedCaughtPokemon =
			JSON.parse(localStorage.getItem('caughtPokemon')) || []
		setCaughtPokemon(storedCaughtPokemon)
	}, [])

	return (
		<div className='py-4'>
			<div className='flex justify-between border-b-4 border-[#d2432e40] py-6'>
				<h2 className='text-center text-4xl my-2'>Caught Pokemon</h2>
				<span className='block text-lg text-gray-500 self-center'>
					New Pokemon Appear In {countdown}
				</span>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4'>
				{caughtPokemon.length > 0 ? (
					caughtPokemon.map((pokemon) => (
						<PokemonCard key={pokemon.id} pokemon={pokemon} />
					))
				) : (
					<p className='text-center text-xl col-span-full'>
						No Pokemon caught yet.
					</p>
				)}
			</div>
		</div>
	)
}

export default CaughtPokemon
