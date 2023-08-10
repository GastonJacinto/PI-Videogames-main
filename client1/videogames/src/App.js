/* eslint-disable no-unused-vars */
import style from './App.module.css';
import { Route, Switch, useLocation } from "react-router-dom";
import Home from './views/Home/Home';
import Details from './views/Details/Details';
import Create from './views/Create/Create';
import Landing from './views/Landing/Landing';
import NavBar from './components/NavBar/NavBar';

function App() {

const location = useLocation();
  return (
    <div className={style.appContainer}>
        {location.pathname!=="/"? <NavBar/>:null}
      <Switch>
        <Route exact path={"/"} component={Landing}/>
        <Route path={"/home"} component={Home}/>
        <Route path={"/create"} component={Create}/>
        <Route path={"/details/:id"} component={Details}/>
      </Switch>
    </div>
  );
}
export default App;
