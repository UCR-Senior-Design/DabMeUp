import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import CreateAccount from "./pages/CreateAccount"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"
import { BrowserRouter, Routes, Route} from 'react-router-dom'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = {""} element = {<Home/>}/>
        <Route path = {"/Dashboard"} element = {<Dashboard/>}/>
        <Route path = {"/CreateAccount"} element = {<CreateAccount/>}/>
        <Route path = {"/Login"} element = {<Login/>}/>
        <Route path = {"/Profile"} element = {<Profile/>}/>
        <Route path = {"/Settings"} element = {<Settings/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App 