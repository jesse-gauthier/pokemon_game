import { NavLink } from 'react-router-dom'

const SideHeader = () => {
	return (
		<div className='w-[40dvw] md:w-[15%] h-screen bg-red-200'>
			<header>
				<h1 className='text-center text-3xl font-bold my-8'>Pokemon App</h1>
				<nav>
					<ul className='flex flex-col'>
						<li className='flex flex-wrap gap-y-3 justify-end py-2'>
							<NavLink
								className='btn w-[90%] rounded-r-none'
								to='/'
								activeClassName='bg-[#5E1743]'
								exact
							>
								<span className='flex overflow-hidden gap-3 justify-between'>
									<img className='w-[30px]' src='./public/grass.svg' alt='' />
									<span className='self-center'>Wild Pokemon</span>
								</span>
							</NavLink>
							<NavLink
								className='btn w-[90%] rounded-r-none'
								to='/caught_pokemon'
								activeClassName='bg-[#5E1743]'
							>
								<span className='flex overflow-hidden gap-3 justify-between'>
									<img
										className='w-[30px]'
										src='./public/backpack.svg'
										alt=''
									/>
									<span className='self-center'>Caught Pokemon</span>
								</span>
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>
		</div>
	)
}

export default SideHeader
