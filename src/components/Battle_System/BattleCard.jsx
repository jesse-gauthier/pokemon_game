import { useState, useEffect } from 'react'

/* eslint-disable react/prop-types */
const BattleCard = ({ pokemon, attack, handlesSelect, xp }) => {
	const [displayedXp, setDisplayedXp] = useState(xp)
	const [selected, setSelected] = useState(false)

	useEffect(() => {
		const start = displayedXp
		const end = Math.max(0, xp) // Ensure end value is not below 0
		const duration = 500 // Duration of the animation in milliseconds
		const increment = (end - start) / (duration / 16) // 16ms is roughly one frame at 60fps

		if (start !== end) {
			const animate = () => {
				setDisplayedXp((prevXp) => {
					const nextXp = prevXp + increment
					if (
						(increment > 0 && nextXp >= end) ||
						(increment < 0 && nextXp <= end)
					) {
						return end
					}
					requestAnimationFrame(animate)
					return Math.max(0, nextXp) // Ensure nextXp is not below 0
				})
			}

			requestAnimationFrame(animate)
		}
	}, [xp, displayedXp])

	function selectPokemon() {
		handlesSelect(pokemon)
		setSelected(true)
	}

	return (
		<div className='card border-[#FFCC5C] border-[13px] shadow-xl py-4'>
			<figure className='p-4'>
				<img
					src={pokemon.img || pokemon.sprites.other.dream_world.front_default}
					alt={pokemon.name}
				/>
			</figure>
			<div className='flex justify-evenly px-3 mt-auto'>
				<h2 className='self-center text-3xl card-title text-center capitalize'>
					{pokemon.name}
				</h2>
				<h3 className='self-center text-xl card-title text-center capitalize'>
					Health:<span> {Math.round(displayedXp)}</span>
				</h3>
			</div>
			<div className='flex justify-evenly'>
				{attack && (
					<button
						onClick={selectPokemon}
						className={`btn w-1/3 ${
							selected ? 'bg-blue-900 text-white' : 'btn-outline'
						}`}
					>
						Select
					</button>
				)}
			</div>
		</div>
	)
}

export default BattleCard
