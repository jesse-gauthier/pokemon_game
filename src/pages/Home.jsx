import { useState, useEffect, useRef, useCallback } from 'react'
import { Fireworks } from 'fireworks-js'
import WildPokemon from '../components/WildPokemon'
import FirstTimeModal from '../components/Tutorial/FirstTimeModal'

const isCountDownExpired = () => {
	const storedTimestamp = localStorage.getItem('pokemonTimestamp')
	const twelveHours = 12 * 60 * 60 * 1000
	const currentTime = Date.now()
	const expirationTime = parseInt(storedTimestamp, 10) + twelveHours

	return currentTime >= expirationTime
}

const checksForWildPokemon = () => {
	const wildPokemon = localStorage.getItem('wildPokemon')
	return wildPokemon ? wildPokemon : false
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
	const [firstTime, setFirstTime] = useState(false)
	const fireworksContainerRef = useRef(null)
	const dialogRef = useRef(null)

	useEffect(() => {
		const caughtPokemon = localStorage.getItem('caughtPokemon')
		if (!caughtPokemon) {
			setFirstTime(true)
		} else {
			const parsedCaughtPokemon = JSON.parse(caughtPokemon)
			if (parsedCaughtPokemon.length === 1) {
				setFirstTime(false)
			}
		}
	}, [])

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

	const startFireworks = useCallback(() => {
		if (fireworksContainerRef.current) {
			const fireworks = new Fireworks(fireworksContainerRef.current, {
				autoresize: true,
				opacity: 0.5,
				acceleration: 1.05,
				friction: 0.97,
				gravity: 1.5,
				particles: 50,
				trace: 3,
				explosion: 5,
				boundaries: {
					x: 0,
					y: 0,
					width: window.innerWidth,
					height: window.innerHeight,
				},
				sound: {
					enable: true,
					files: [
						'https://fireworks.js.org/sounds/explosion0.mp3',
						'https://fireworks.js.org/sounds/explosion1.mp3',
						'https://fireworks.js.org/sounds/explosion2.mp3',
					],
					volume: {
						min: 4,
						max: 8,
					},
				},
			})

			fireworks.start()
			setTimeout(() => fireworks.stop(), 5000) // Stop fireworks after 5 seconds
		}
	}, [])

	useEffect(() => {
		const dialog = dialogRef.current
		if (dialog) {
			dialog.addEventListener('open', startFireworks)
			return () => dialog.removeEventListener('open', startFireworks)
		}
	}, [startFireworks])

	return (
		<div className='relative pb-4'>
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
				startFireworks={startFireworks}
			/>

			<div
				ref={fireworksContainerRef}
				className='fixed inset-0 pointer-events-none z-0'
			></div>
			{/* Catch Card */}
			<dialog ref={dialogRef} id='success' className='modal z-10'>
				<div className='modal-box border-[#ffcc5c] border-8'>
					<div className='modal-action m-0'>
						<form method='dialog'>
							<button className='btn bg-[#2b0a1e] text-white'>Close</button>
						</form>
					</div>
					<img className='mx-auto my-2' src={pokemonCatch.img} alt='' />
					<p className='py-4 capitalize text-center text-2xl'>
						Congrats, you caught a wild{' '}
						<span className='font-bold text-[#fe6f61]'>
							{pokemonCatch.name}!
						</span>
					</p>
				</div>
				<form method='dialog' className='modal-backdrop'>
					<button>close</button>
				</form>
			</dialog>

			{/* First Time */}
			<FirstTimeModal firstTime={firstTime} />
		</div>
	)
}

export default Home
