import "./App.css";
import { Switch, Route } from "react-router-dom";

//Components
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar className='Navbar' />
      <div className='App'>
        <Switch>
          <Route path='/' component={HomePage} />
        </Switch>
      </div>
    </>
  );
}

export default App;
