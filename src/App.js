import "./App.css";
import { Switch, Route } from "react-router-dom";

//Components
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <div className='App'>
        <Switch>
          <Route path='/' component={HomePage} />
        </Switch>
      </div>
    </>
  );
}

export default App;
