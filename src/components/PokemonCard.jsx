/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CatchButton from './pokemon/CatchButton'
import BattleButton from './Battle_System/BattleButton'

const PokemonCard = ({
	pokemon,
	onCatchRelease,
	setPokemonCatch,
	startFireworks,
	isCaught,
}) => {
	const [caughtPokemon, setCaughtPokemon] = useState(null)
	const [caughtStatus, setCaughtStatus] = useState(isCaught)

	useEffect(() => {
		const storedPokemon = JSON.parse(localStorage.getItem('caughtPokemon'))
		setCaughtPokemon(storedPokemon)
	}, [])

	useEffect(() => {
		setCaughtStatus(isCaught)
	}, [isCaught])

	console.log('caughtStatus:', caughtStatus) // Debugging line to verify caughtStatus value

	return (
		<div className='border-[#FFCC5C] border-[13px] p-2 rounded-xl flex flex-col'>
			<div className='flex justify-between flex-wrap'>
				<h3 className='capitalize text-3xl font-bold self-center'>
					{pokemon.name}
				</h3>
				<p className='text-[#FF6F61] font-black self-center text-2xl'>
					{pokemon.xp} HP
				</p>
			</div>
			<img
				className='w-[80%] h-[80%] object-contain my-3 mx-auto'
				src={pokemon.img}
				alt={pokemon.name}
			/>
			<div className='flex flex-wrap md:flex-nowrap justify-evenly gap-y-2'>
				{!caughtStatus && (!caughtPokemon || caughtPokemon.length === 0) && (
					<CatchButton
						pokemon={pokemon}
						onCatchRelease={onCatchRelease}
						setPokemonCatch={setPokemonCatch}
						startFireworks={startFireworks}
					/>
				)}
				{caughtPokemon && caughtPokemon.length > 1 && !caughtStatus && (
					<BattleButton pokemon={pokemon} />
				)}
				<Link
					to={`/pokemon/${pokemon.id}`}
					className='bg-[#70c1b3] text-black btn self-center btn-outline capitalize md:w-[43%] w-[100%] text-lg font-normal'
				>
					View
				</Link>
			</div>
		</div>
	)
}

export default PokemonCard
