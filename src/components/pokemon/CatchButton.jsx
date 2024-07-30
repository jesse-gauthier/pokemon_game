/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

const CatchButton = ({ pokemon, onCatchRelease }) => {
	const [isCaught, setIsCaught] = useState(false)

	useEffect(() => {
		const caughtPokemon =
			JSON.parse(localStorage.getItem('caughtPokemon')) || []
		if (caughtPokemon.some((p) => p.id === pokemon.id)) {
			setIsCaught(true)
		}
	}, [pokemon.id])

	const handleCatch = () => {
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

	return (
		<button
			onClick={handleCatch}
			className={`btn self-center btn-outline capitalize w-[100%] md:w-[43%] text-lg font-normal ${
				isCaught ? 'bg-[#f3701b] text-black' : 'bg-[white] text-black'
			}`}
		>
			{isCaught ? 'release' : 'catch'}
		</button>
	)
}

export default CatchButton
