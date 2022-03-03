import "./App.css";
import { Switch, Route } from "react-router-dom";

// import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import CreateEvent from "./components/CreateEvent";
import Events from "./components/Events";
// import ViewEvent from "./components/ViewEvent";

function App() {
  return (
    <>
      <div className='App'>
        <Navbar className='Navbar' />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/register' component={Register} />
          <Route path='/createevent' component={CreateEvent} />
          <Route path='/events' component={Events} />
          {/* ^^ Switch both event routes to PrivateRoute when endpoints are made and functional */}
        </Switch>
      </div>
    </>
  );
}

export default App;
