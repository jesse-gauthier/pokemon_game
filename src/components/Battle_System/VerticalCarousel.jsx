/* eslint-disable react/prop-types */
import BattleCard from './BattleCard'
import { useState, useEffect } from 'react'

const VerticalCarousel = ({ DefendPokemon, assignPokemon }) => {
	/* Destructure props correctly */
	const [pokemon, setPokemon] = useState([])
	const [displayPokemon, setDisplayPokemon] = useState(0)

	useEffect(() => {
		setPokemon(DefendPokemon)
	}, [DefendPokemon])

	function handlesDisplayIncreaseIndex() {
		const pokemonLength = pokemon.length - 1

		if (displayPokemon < pokemonLength) {
			setDisplayPokemon(displayPokemon + 1)
		}
	}

	function handlesDisplayDecreaseIndex() {
		if (displayPokemon > 0) {
			setDisplayPokemon(displayPokemon - 1)
		}
	}

	function handlesSelect() {
		assignPokemon(pokemon[displayPokemon])
	}

	return (
		<div className='grid grid-cols-1 mt-4 gap-4'>
			<button onClick={handlesDisplayIncreaseIndex}>
				<svg
					className='w-[50px] mx-auto'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<svg
						className='w-[50px] mx-auto'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
						<g
							id='SVGRepo_tracerCarrier'
							strokeLinecap='round'
							strokeLinejoin='round'
						></g>
						<g id='SVGRepo_iconCarrier'>
							{' '}
							<path
								d='M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z'
								stroke='#292D32'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							></path>{' '}
							<path
								opacity='0.4'
								d='M8.4707 13.4599L12.0007 9.93994L15.5307 13.4599'
								stroke='#292D32'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							></path>{' '}
						</g>
					</svg>
				</svg>
			</button>
			{pokemon[displayPokemon] && (
				<BattleCard
					className='col-span-2'
					xp={pokemon[displayPokemon].xp}
					key={displayPokemon}
					pokemon={pokemon[displayPokemon]}
					attack={true}
					handlesSelect={handlesSelect}
				/>
			)}
			<button onClick={handlesDisplayDecreaseIndex}>
				<svg
					className='w-[50px] mx-auto'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<svg
						className='w-[50px] mx-auto'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
						<g
							id='SVGRepo_tracerCarrier'
							strokeLinecap='round'
							strokeLinejoin='round'
						></g>
						<g id='SVGRepo_iconCarrier'>
							{' '}
							<path
								d='M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z'
								stroke='#292D32'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							></path>{' '}
							<path
								opacity='0.4'
								d='M8.4707 10.6401L12.0007 14.1601L15.5307 10.6401'
								stroke='#292D32'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							></path>{' '}
						</g>
					</svg>
				</svg>
			</button>
		</div>
	)
}

export default VerticalCarousel
