import { NavLink } from 'react-router-dom'
import DebugToggle from '../utilities/DebugToggle'

const SideHeader = () => {
	return (
		<div className='w-[40dvw] md:w-[15%] h-screen bg-red-200'>
			<header className='flex flex-col h-[100%]'>
				<NavLink className='noactivestyle' to='/'>
					<h1 className='text-center text-3xl font-bold my-8 '>Pokemon App</h1>
				</NavLink>
				<nav className='flex flex-col h-[85%]'>
					<ul className='flex flex-col'>
						<li className='flex flex-wrap gap-y-3 justify-end py-2'>
							<NavLink className='btn w-[90%] rounded-r-none' to='/'>
								<span className='flex overflow-hidden gap-3 justify-between'>
									<img className='w-[30px]' src='/grass.svg' alt='' />
									<span className='self-center'>Wild Pokemon</span>
								</span>
							</NavLink>
							<NavLink
								className='btn w-[90%] rounded-r-none'
								to='/caught_pokemon'
							>
								<span className='flex overflow-hidden gap-3 justify-between'>
									<img className='w-[30px]' src='/backpack.svg' alt='' />
									<span className='self-center'>Caught Pokemon</span>
								</span>
							</NavLink>
						</li>
					</ul>
					<div className='mt-auto mx-auto'>
						<DebugToggle />
					</div>
				</nav>
			</header>
		</div>
	)
}

export default SideHeader
