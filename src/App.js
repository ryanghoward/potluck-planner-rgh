import "./App.css";
import { Switch, Route } from "react-router-dom";

//Components
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

function App() {
  return (
    <>
      <div className='App'>
        <Navbar className='Navbar' />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/login' component={Login} />
        </Switch>
      </div>
    </>
  );
}

export default App;
