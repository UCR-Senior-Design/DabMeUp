import Nav from '../components/Nav'
import { useNavigate } from "react-router-dom"; 

const Home = () => {
    let navigate = useNavigate();
    const authToken = false
    const handeClick = () => {
        if (authToken) {
            navigate('/Dashboard'); // If user is authenticated, navigate to Dashboard
        } else {
            navigate('/Login'); // If not authenticated, navigate to Login
        }
    }
    
    return (
        <div className= "overlay">
        <Nav minimal={false} authToken = {authToken}/>
        <div className = "home">
            <h1>Click Right</h1>
            <button className = "primary-button" onClick={handeClick}>
                {authToken ? 'Signout' : 'Create Account'}
            </button>

        </div>
        </div>

    )
    /*
    return (
        <div className= "overlay">
          <Nav minimal={false} authToken={authToken}/>
          <div className="home">
            <h1>Click Right</h1>
            {authToken ? (
              <button className="primary-button" onClick={(handeClick) => navigate('/Dashboard')}>
                Go to Dashboard
              </button>
            ) : (
              <>
                <button className="primary-button" onClick={() => navigate('/CreateAccount')}>
                  Create Account
                </button>

              </>
            )}
          </div>
        </div>
      )*/
}

export default Home 