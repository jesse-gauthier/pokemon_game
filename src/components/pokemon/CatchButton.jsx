/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react'

const CatchButton = ({ pokemon, onCatchRelease }) => {
	const [isCaught, setIsCaught] = useState(false)
	const [isHolding, setIsHolding] = useState(false)
	const [progress, setProgress] = useState(0)
	const holdTimeout = useRef(null)
	const progressInterval = useRef(null)

	useEffect(() => {
		const caughtPokemon =
			JSON.parse(localStorage.getItem('caughtPokemon')) || []
		if (caughtPokemon.some((p) => p.id === pokemon.id)) {
			setIsCaught(true)
		}
	}, [pokemon.id])

	const handleCatchRelease = () => {
		const caughtPokemon =
			JSON.parse(localStorage.getItem('caughtPokemon')) || []

		if (isCaught) {
			// Remove the Pokémon from caughtPokemon array
			const updatedCaughtPokemon = caughtPokemon.filter(
				(p) => p.id !== pokemon.id
			)
			localStorage.setItem(
				'caughtPokemon',
				JSON.stringify(updatedCaughtPokemon)
			)
			setIsCaught(false)
			onCatchRelease(updatedCaughtPokemon)
		} else {
			// Add the Pokémon to caughtPokemon array
			if (!caughtPokemon.some((p) => p.id === pokemon.id)) {
				caughtPokemon.push(pokemon)
				localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon))
				setIsCaught(true)
				onCatchRelease(caughtPokemon)
			}
		}
	}

	const startHold = () => {
		setIsHolding(true)
		setProgress(0)

		progressInterval.current = setInterval(() => {
			setProgress((prev) => {
				if (prev < 100) {
					return prev + 2 // Progress bar increases over 5 seconds (5000ms / 50ms = 100 steps)
				} else {
					clearInterval(progressInterval.current)
					return prev
				}
			})
		}, 55) // Progress updates every 100ms

		holdTimeout.current = setTimeout(() => {
			handleCatchRelease()
			clearInterval(progressInterval.current)
			setIsHolding(false)
		}, 2800)
	}

	const cancelHold = () => {
		clearTimeout(holdTimeout.current)
		clearInterval(progressInterval.current)
		setIsHolding(false)
		setProgress(0)
	}

	return (
		<button
			onMouseDown={startHold}
			onMouseUp={cancelHold}
			onMouseLeave={cancelHold}
			className={`relative btn self-center btn-outline capitalize w-1/2 text-lg font-normal ${
				isCaught ? 'bg-[#f3701b] text-black' : 'bg-white text-black'
			}`}
		>
			<span className='relative z-10'>{isCaught ? 'Release' : 'Catch'}</span>
			{isHolding && (
				<div
					className='absolute top-0 left-0 h-full bg-[#ff6f61] opacity-50'
					style={{ width: `${progress}%` }}
				/>
			)}
		</button>
	)
}

export default CatchButton
