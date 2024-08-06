/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react'

const FirstTimeModal = ({ firstTime }) => {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (firstTime) {
			setIsOpen(true)
		}
	}, [firstTime])

	return (
		<div>
			{isOpen && (
				<dialog id='first_time_modal' className='modal h-[100dvh]' open>
					<div className='flex flex-col text-center justify-center modal-box min-h-[50dvh] min-w-[50dvw]'>
						<h3 className='font-bold text-5xl capitalize text-center'>
							Welcome To Pokemon Catch
						</h3>
						<p className='py-4 text-2xl'>
							Catch your first Pokémon instantly! Make a wise choice, because
							this one will be your trusty battle companion!
						</p>
						<form method='dialog'>
							<button className='btn btn-outline'>Let's Play</button>
						</form>
					</div>
					<form method='dialog' className='modal-backdrop'>
						<button onClick={() => setIsOpen(false)}>close</button>
					</form>
				</dialog>
			)}
		</div>
	)
}

export default FirstTimeModal
