/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ActionButton from './Battle_System/ActionButton'

const PokemonCard = ({ pokemon, isCaught }) => {
	const [caughtStatus, setCaughtStatus] = useState(isCaught)

	useEffect(() => {
		setCaughtStatus(isCaught)
	}, [isCaught])
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
				<ActionButton pokemon={pokemon} isCaught={caughtStatus} />
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
