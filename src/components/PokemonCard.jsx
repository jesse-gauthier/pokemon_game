/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const PokemonCard = ({ pokemon }) => {
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
		if (!caughtPokemon.some((p) => p.id === pokemon.id)) {
			caughtPokemon.push(pokemon)
			localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon))
			setIsCaught(true)
		}
	}

	return (
		<div className='border-[#FFCC5C] border-[13px] p-2 rounded-xl flex flex-col'>
			<div className='flex justify-between'>
				<h3 className='capitalize text-2xl font-bold self-center'>
					{pokemon.name}
				</h3>
				<p className='text-[#FF6F61] font-bold self-center'>{pokemon.xp} HP</p>
			</div>
			<img
				className='w-[80%] h-[80%] object-contain my-3 mx-auto'
				src={pokemon.img}
				alt={pokemon.name}
			/>
			<div className='flex justify-evenly'>
				<button
					onClick={handleCatch}
					className={`btn self-center btn-outline uppercase ${
						isCaught ? 'bg-[#E6A0C4]  text-black' : 'bg-[#5E1743] text-white'
					}`}
				>
					{isCaught ? 'release' : 'catch'}
				</button>
				<Link
					to={`/pokemon/${pokemon.id}`}
					className='btn self-center btn-outline bg-[#70c1b3] uppercase'
				>
					View
				</Link>
			</div>
		</div>
	)
}

export default PokemonCard
