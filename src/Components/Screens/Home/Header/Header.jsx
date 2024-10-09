import styles from './Header.module.css'
import { Link, useNavigate } from "react-router-dom";
import { FaUserCheck } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useActions } from '../../../../hooks/useActions';

function Header() {
    const user = useSelector(state => state.user)
    const {getUser} = useActions()

    const navigate = useNavigate()

    return (
        <Link className={styles.link} to={ `/${user?.name}`}>
            <div className={styles.user}>
                <button onClick={() => {getUser(null); navigate('/')}}>Logout</button>
                <span>{user?.name}</span> <FaUserCheck color="#FF4C2B" size="40px" />
            </div>
        </Link>  
    )

}

export default Header