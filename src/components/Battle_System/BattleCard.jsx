import { useState, useEffect } from 'react'

/* eslint-disable react/prop-types */
const BattleCard = ({ pokemon, attack, assignChoosenPokemon, xp }) => {
	const [displayedXp, setDisplayedXp] = useState(xp)

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

	return (
		<div className='card border-[#FFCC5C] border-[13px] w-96 shadow-xl py-4'>
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
						onClick={() => assignChoosenPokemon(pokemon)}
						className='btn btn-outline w-1/3'
					>
						Select
					</button>
				)}
			</div>
		</div>
	)
}

export default BattleCard
