/* eslint-disable react/prop-types */
const BattleCard = ({ pokemon }) => {
	return (
		<div className='card border-[#FFCC5C] border-[13px] w-96 shadow-xl py-4'>
			<figure className='p-4'>
				<img
					src={pokemon.img || pokemon.sprites.other.dream_world.front_default}
					alt={pokemon.name}
				/>
			</figure>
			<div className='card-body mx-auto'>
				<h2 className='text-3xl card-title text-center capitalize'>
					{pokemon.name}
				</h2>
			</div>
			<div className='flex justify-evenly'>
				<button className='btn btn-outline w-1/3'>Select</button>
				<button className='btn btn-warning w-1/3'>View</button>
			</div>
		</div>
	)
}

export default BattleCard
