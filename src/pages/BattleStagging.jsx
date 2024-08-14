import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import pokemonFetch from '../utilities/PokemonFetch'
import BattleCard from '../components/Battle_System/BattleCard'
import { Link } from 'react-router-dom'

const BattleStagging = () => {
	const { id } = useParams()
	const [AttackPokemon, setPokemon] = useState(null)
	const [DefendPokemon, setDefendPokemon] = useState([])
	const [ChoosenPokemon, setChoosenPokemon] = useState([])

	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				const fetchedPokemon = await pokemonFetch(id)
				setPokemon(fetchedPokemon)
			} catch (error) {
				console.error('Failed to fetch pokemon:', error)
			}
		}
		fetchPokemon()
	}, [id])

	useEffect(() => {
		const fetchCaughtPokemon = () => {
			const caughtPokemon = localStorage.getItem('caughtPokemon')
			return caughtPokemon ? JSON.parse(caughtPokemon) : []
		}
		setDefendPokemon(fetchCaughtPokemon())
	}, [])

	const assignChoosenPokemon = (pokemon) => {
		setChoosenPokemon(pokemon)
	}
	if (!AttackPokemon) {
		return <div>Loading...</div>
	}

	return (
		<div className='pt-5 flex flex-col gap-16'>
			<h2 className='text-6xl font-bold text-center mt-5'>Prepare to Battle</h2>
			<div className='flex flex-col justify-center'>
				<div className='flex md:flex-col flex-wrap justify-center'>
					<div className='flex justify-between'>
						{/* Attack Pokemon */}
						<BattleCard pokemon={AttackPokemon} xp={AttackPokemon.xp} />
						<div className='self-center flex flex-wrap gap-5 justify-center'>
							{/* <p className='font-bold text-8xl w-[100%] text-center'>VS</p> */}
							{Object.keys(ChoosenPokemon).length >= 1 && (
								<Link
									to={`/battlegrounds/${AttackPokemon.id}/${ChoosenPokemon.id}`}
									className='btn btn-lg btn-warning mt-auto min-w-[200px]'
								>
									Battle
								</Link>
							)}
						</div>
						{Object.keys(ChoosenPokemon).length >= 1 && (
							<BattleCard pokemon={ChoosenPokemon} xp={ChoosenPokemon.xp} />
						)}
					</div>
					<div className='mt-14 border-4 p-3 border-red-50'>
						<h3 className='text-4xl font-bold text-center'>Your Pokemon</h3>
						<div className='flex flex-wrap justify-evenly mt-4 gap-y-4'>
							{DefendPokemon.map((pokemon, index) => (
								<BattleCard
									xp={pokemon.xp}
									key={index}
									pokemon={pokemon}
									attack={true}
									assignChoosenPokemon={assignChoosenPokemon}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BattleStagging
