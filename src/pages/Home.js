import Nav from '../components/Nav'
const Home = () => {
    const authToken = false
    const handeClick = () => {
        console.log('clicked')
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
}

export default Home