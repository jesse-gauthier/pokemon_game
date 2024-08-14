import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import pokemonFetch from '../utilities/PokemonFetch'
import BattleCard from '../components/Battle_System/BattleCard'
import VerticalCarousel from '../components/Battle_System/VerticalCarousel'
import { Link } from 'react-router-dom'

const BattleStagging = () => {
	const { id } = useParams()
	const [AttackPokemon, setPokemon] = useState(null)
	const [DefendPokemon, setDefendPokemon] = useState([])
	const [ChoosenPokemon, setChoosenPokemon] = useState({})

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

	const assignChoosenPokemon = (pokemon) => {
		console.log('Selected Pokemon:', pokemon)
		setChoosenPokemon(pokemon)
	}

	useEffect(() => {
		const fetchCaughtPokemon = () => {
			const caughtPokemon = localStorage.getItem('caughtPokemon')
			return caughtPokemon ? JSON.parse(caughtPokemon) : []
		}
		setDefendPokemon(fetchCaughtPokemon())
	}, [])

	if (!AttackPokemon) {
		return <div>Loading...</div>
	}

	return (
		<div className='pt-5 flex flex-col gap-4'>
			<h2 className='text-6xl font-bold text-center mt-5'>Prepare to Battle</h2>
			<div className='flex flex-col justify-center'>
				<div className='flex justify-evenly'>
					{/* Staging Section */}
					<div className='my-auto'>
						<div className='flex gap-4'>
							{/* Attack Pokemon */}
							<BattleCard pokemon={AttackPokemon} xp={AttackPokemon.xp} />
							{/* Start Button */}
							{Object.keys(ChoosenPokemon).length >= 1 && (
								<Link
									to={`/battlegrounds/${AttackPokemon.id}/${ChoosenPokemon.id}`}
									className='btn btn-lg btn-warning min-w-[200px] self-center'
								>
									Battle
								</Link>
							)}
						</div>
					</div>
					{/* List of Pokemon to choose from (caught) */}
					<div className=''>
						<h3 className='text-4xl font-bold text-center'>
							Choose Your Pokemon
						</h3>
						<VerticalCarousel
							DefendPokemon={DefendPokemon}
							assignPokemon={assignChoosenPokemon}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BattleStagging
