import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Providers/AuthProvider"
import { useNavigate } from "react-router-dom"
import MovieItem from "../Home/MovieItem/MovieItem"
import styles from '../UserAccount/UserAccount.module.css'
import Header from "../Home/Header/Header"
import Login from "../Login/Login"
import { useSelector } from "react-redux"

function UserAccount() {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    
    return (
        <div className={styles.account}>
            {user ? (
                <div >
                    <Header/>
                    <p>{user.name}, это Ваш аккаунт. Здесь будут отображаться сохраненные фильмы.</p>
                    <div className={styles.list}>
                        {user.favourites.map(movie => <MovieItem key={movie.Title} data={movie}/>)}
                    </div> 
                    <button onClick={() => navigate('/')}>Back</button>
                </div>
            )
            : <Login/>
            }
        </div> )
}
export default UserAccount