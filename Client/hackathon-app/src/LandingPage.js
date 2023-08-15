import { Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap'
import Register from "./Components/Register";
import Home from "./Components/Home";
import MyQuote from "./Components/MyQuote";
import ProtectedRoute from "./ProtectedRoute";
import QuoteAdd from "./Components/QuoteAdd";
import Profile from "./Components/Profile";

function LandingPage() {
    return (<>
        <Switch>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/register' exact component={Register}></Route>
            <ProtectedRoute path='/myquotes' exact component={MyQuote}></ProtectedRoute>
            <ProtectedRoute path='/home' exact component={Home}></ProtectedRoute>
            <ProtectedRoute path='/addquote' exact component={QuoteAdd}></ProtectedRoute>
            <ProtectedRoute path='/profile' exact component={Profile}></ProtectedRoute>
            <Route path='*' exact component={Login}></Route>
        </Switch>
    </>);
}

export default LandingPage;