import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
      <h1 className='logo' style={{ color: '#ff6b35', fontSize: '45px', fontWeight: 'bold', margin: 0 }}>XFood</h1>
      <img className='profile' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar
