import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import BattleCard from '../components/Battle_System/BattleCard'
// import fetchFromUrl from '../utilities/MovesFetch'
import wasAttackSuccess from '../utilities/AttackLogic'

const ActiveBattle = () => {
	const [attack, setAttack] = useState(null)
	const [defend, setDefend] = useState(null)
	const [attackXp, setAttackXp] = useState(null)
	const [defendXp, setDefendXp] = useState(null)
	const [attackResult, setAttackResult] = useState('')
	const [defeat, setDefeat] = useState(false)
	const [win, setWin] = useState(false)

	let { attackid, defendid } = useParams()

	// fetches local storage wildPokemon, filters to find matching pokemon by id
	const attackPokemon = (attackid) => {
		const wildPokemon = JSON.parse(localStorage.getItem('wildPokemon'))
		if (wildPokemon && Array.isArray(wildPokemon)) {
			const matchedPokemon = wildPokemon.find(
				(pokemon) => pokemon.id == attackid
			)
			if (matchedPokemon) {
				setAttack(matchedPokemon)
				setAttackXp(matchedPokemon.xp)
			} else {
				console.log('No attack Pokemon found with the given attackId')
			}
		} else {
			console.log('No wildPokemon found or the data is not an array')
		}
	}

	// fetches local storage caughtPokemon, filters to find matching pokemon by id
	const defendPokemon = (defendid) => {
		const caughtPokemon = JSON.parse(localStorage.getItem('caughtPokemon'))
		if (caughtPokemon && Array.isArray(caughtPokemon)) {
			const matchedPokemon = caughtPokemon.find(
				(pokemon) => pokemon.id == defendid
			)
			if (matchedPokemon) {
				setDefend(matchedPokemon)
				setDefendXp(matchedPokemon.xp)
			} else {
				console.log('No defend Pokemon found with the given defendId')
			}
		} else {
			console.log('No caughtPokemon found or the data is not an array')
		}
	}

	// Function to shuffle an array
	const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	// useEffect to call the functions when attackid and defendid change
	useEffect(() => {
		if (attackid) {
			attackPokemon(attackid)
		}
		if (defendid) {
			defendPokemon(defendid)
		}
	}, [attackid, defendid])

	const playerAttackMove = (move) => {
		const result = wasAttackSuccess(move)

		if (result) {
			let hitPointsLost = move.power
			const remainingXp = attackXp - hitPointsLost
			setAttackXp(remainingXp)

			if (remainingXp < 1) {
				console.log('pokemon caught')
				setAttackXp('0')
				setAttackResult(`Pokemon Caught`)
				setWin(true)

				// Check local storage for caughtPokemon
				let caughtPokemon =
					JSON.parse(localStorage.getItem('caughtPokemon')) || []

				// Add the caught Pokémon to the array
				caughtPokemon.push(attack)

				// Resave the updated array back to local storage
				localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon))

				// Check local storage for wildPokemon
				let wildPokemon = JSON.parse(localStorage.getItem('wildPokemon')) || []

				// Remove the caught Pokémon from wildPokemon array
				wildPokemon = wildPokemon.filter(
					(pokemon) => pokemon.name !== attack.name
				)

				// Resave the updated wildPokemon array back to local storage
				localStorage.setItem('wildPokemon', JSON.stringify(wildPokemon))
			} else {
				setAttackResult(`SUCCESS HIT`)
				computerAttackMove() // Trigger computer attack after player move
			}
		} else {
			setAttackResult(`MOVE MISSED`)
			computerAttackMove() // Trigger computer attack even if player misses
		}
	}

	const computerAttackMove = () => {
		if (attack && attack.moves && attack.moves.length > 0) {
			// Randomly select one of the first 5 moves
			const computerMove = shuffleArray(attack.moves).slice(0, 5)[0]

			const result = wasAttackSuccess(computerMove)

			if (result) {
				let hitPointsLost = computerMove.power
				const remainingXp = defendXp - hitPointsLost
				setDefendXp(remainingXp)
				if (remainingXp < 1) {
					setDefendXp('0')
					setAttackResult(`${attack.name} ${computerMove.name}: SUCCESS HIT`)
					setTimeout(() => setAttackResult(`Your Pokemon Fainted`), 800)
					setDefeat(true)
				} else {
					setAttackResult(`${attack.name} ${computerMove.name}: SUCCESS HIT`)
				}
			} else {
				setAttackResult(`${attack.name} ${computerMove.name}: MISSED`)
			}
		}
	}

	return (
		<div>
			<h1 className='text-6xl font-bold text-center mt-5'>Active Battle</h1>
			<div className='flex justify-between'>
				<div>{attack && <BattleCard pokemon={attack} xp={attackXp} />}</div>
				<div className='flex flex-col self-center capitalize text-5xl font-bold'>
					{attackResult}
					{defeat && (
						<Link to='/' className='btn btn-error w-fit mx-auto mt-5'>
							Run Away
						</Link>
					)}
				</div>
				<div>
					{defend && <BattleCard pokemon={defend} xp={defendXp} />}
					<div className='sidebar'>
						<h3 className='text-center my-4 text-2xl'>Select Your Move</h3>
						<div className='grid grid-cols-4 gap-3'>
							{defend && defend.moves && defend.moves.length > 0 ? (
								shuffleArray(defend.moves)
									.slice(0, 5)
									.map((move, index) => (
										<button
											disabled={defeat || win}
											onClick={() => playerAttackMove(move)}
											key={index}
											className='col-span-2 btn btn-success text-white'
										>
											{move.name}
										</button>
									))
							) : (
								<p>No moves available</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ActiveBattle
