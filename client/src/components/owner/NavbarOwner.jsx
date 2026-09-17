import {Link} from 'react-router-dom'
import {assets} from '../../assets/assets'
import {useAppContext} from '../../context/AppContext'
const NavbarOwner = () => {

    const {user }=useAppContext() ;
  
    return (
        <div className='flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 h-15 py-4 text-gray-600 border-b border-borderColor relative transition-all'>
            <Link to='/'>
                <img src={assets.logo} alt=" " className="h-7" />
            </Link>
            <p>Welcome ,{user?.name ||  "Shubham"}</p>
        </div>
    )
}

export default NavbarOwner;