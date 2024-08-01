import { useState, useEffect } from 'react'
import WildPokemon from '../components/WildPokemon'

const isCountDownExpired = () => {
	const storedTimestamp = localStorage.getItem('pokemonTimestamp')
	const twelveHours = 12 * 60 * 60 * 1000
	const currentTime = Date.now()
	const expirationTime = parseInt(storedTimestamp, 10) + twelveHours

	if (currentTime < expirationTime) {
		return false
	} else {
		return true
	}
}

const checksForWildPokemon = () => {
	const wildPokemon = localStorage.getItem('wildPokemon')
	if (!wildPokemon) {
		return false
	} else {
		return wildPokemon
	}
}

const getNumberOfWildPokemon = () => {
	const isCountDown = isCountDownExpired()
	const wildFetchedPokemon = checksForWildPokemon()

	if (!isCountDown && wildFetchedPokemon) {
		return JSON.parse(wildFetchedPokemon).length
	} else {
		return '0'
	}
}

const Home = () => {
	const maxPokemon = getNumberOfWildPokemon()
	const [countdown, setCountdown] = useState('')
	const [pokemonCatch, setPokemonCatch] = useState({})

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
						{maxPokemon} Wild Pokemon
					</h2>
					<span className='block text-lg text-gray-500 self-center'>
						New Pokemon Appear In {countdown}
					</span>
				</div>
			</div>
			<WildPokemon
				saveToLocal='true'
				checksForWildPokemon={checksForWildPokemon()}
				isCountDownExpired={isCountDownExpired()}
				setPokemonCatch={setPokemonCatch}
			/>

			<dialog id='success' className='modal'>
				<div className='modal-box'>
					<div className='modal-action m-0'>
						<form method='dialog'>
							<button className='btn bg-[#2b0a1e] text-white'>Close</button>
						</form>
					</div>
					<img className='mx-auto my-2' src={pokemonCatch.img} alt='' />

					<p className='py-4 capitalize text-center text-2xl'>
						Congrats, you caught{' '}
						<span className='font-bold'>{pokemonCatch.name}!</span>
					</p>
				</div>
			</dialog>
		</div>
	)
}

export default Home
