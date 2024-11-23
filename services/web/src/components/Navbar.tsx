import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import doctor from '../assets/doctor-bg.png'

function Navbar() {
    return (
        <div className={`fixed top-0 z-10 w-full px-32 pt-5 bg-white`}>
            <div className='p-5 flex items-center justify-between w-full rounded-full bg-blue-100 shadow-md'>
                <div className='flex items-center gap-2'>
                    <img src={logo} className='w-12' alt="" />
                    <p className='text-2xl font-bold text-blue-950'>MediBook</p>
                </div>
                <div className='flex gap-10 -translate-x-2'>
                    <Link className='font-semibold text-blue-950' to={'/home'}>Home</Link>
                    <Link className='font-semibold text-blue-950' to={'/about'}>About</Link>
                    <Link className='font-semibold text-blue-950' to={'/contact'}>Contact</Link>
                </div>
                <div className='p-1 w-[140px] rounded-full bg-blue-950 flex items-center gap-2'>
                    <img className='w-10 rounded-full' src={doctor} alt="" />
                    <p className='font-semibold text-white'>Signup</p>
                </div>
            </div>
        </div>
    )
}

export default Navbar
