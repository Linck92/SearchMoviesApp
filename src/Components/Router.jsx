import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Screens/Home/Home"
import Login from "./Screens/Login/Login"
import MovieDetail from "./Screens/MovieDetail/MovieDetail"
import UserAccount from "./Screens/UserAccount/UserAccount"

function Router() {
    return (
    <BrowserRouter>
        <Routes>
            <Route element={<Home/>} path="/"/>
            <Route element={<MovieDetail/>} path="/movie/:id"/>
            <Route element={<UserAccount/>} path="/:account"/>

            <Route path="*" element={<div>Not found</div>}/>
        </Routes>
    </BrowserRouter>
    )
}

export default Router