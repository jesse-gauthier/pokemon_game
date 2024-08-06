/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const ActionButton = ({ pokemon, isCaught }) => {
	return isCaught ? (
		<button className='bg-[#70c1b3] text-black btn self-center btn-outline capitalize md:w-[43%] w-[100%] text-lg font-normal'>
			Release
		</button>
	) : (
		<Link
			to={`/battle/${pokemon.id}`}
			className='bg-[#70c1b3] text-black btn self-center btn-outline capitalize md:w-[43%] w-[100%] text-lg font-normal'
		>
			Catch
		</Link>
	)
}

export default ActionButton
