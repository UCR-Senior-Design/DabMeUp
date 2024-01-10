import whitelogo from '../images/logo.png'
import colorLogo from '../images/colorlogo.png'



const Nav = ({minimal, authToken}) => {

    return (
        <nav>
            <div className = "logo-container">
            <img className="logo" src={minimal ? colorLogo : whitelogo} alt="" />
            </div>
            {!authToken && <button className='nav-button'>Log in</button>}

        </nav>
    )
}

export default Nav 