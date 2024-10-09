import { useForm } from 'react-hook-form';
import styles from './Login.module.css'
import React, { useState } from 'react';
import { useAddUserMutation, useGetUsersQuery } from '../../../store/API/APIgetUsers';
import { useActions } from '../../../hooks/useActions';
import { useSelector } from 'react-redux';



function Login() {

    const {data: users} = useGetUsersQuery()
    const user = useSelector(state => state.user)
    const {getUser} = useActions()
    const [addUser] = useAddUserMutation()

    const [form, setForm] = useState('Log In')

    const { register, reset, handleSubmit, formState: { isSubmitSuccessful, errors } } = useForm({
        mode: 'onChange'
    });

    const { register: registerOne, reset: resetOne, handleSubmit: handleSubmitOne, formState: { isSubmitSuccessful: isSubmitSuccessfulOne } } = useForm({
        mode: 'onChange'
    });

    function addNewUser(data) {
        if (users.find(element =>
            element.name === data.name)) {
                reset();
                throw Error.message = 'This name is already used. Please, enter a different name'
            } else {
                addUser(data);
                reset()
            }
    }

    function checkUser(data) {
        const user = users.find(element => element.name === data.name && element.password === data.password)
            if (user) {
                getUser(user);
                resetOne()
            } else {
                throw Error.message ='Name or password is invalid';
            }
    }

    return (

        <div className={styles.container}>
            <h1>Welcome to the best service of searching movies</h1>

            <div className={styles.header}>
                <button className={form === 'Sign Up' ? styles.chooseForm : styles.chooseFormSelected} type='button' onClick={() => setForm('Log In')}>Log In</button>
                <button className={form === 'Log In' ? styles.chooseForm : styles.chooseFormSelected} type='button' onClick={() => setForm('Sign Up')}>Sign Up</button>
            </div>

           {form === 'Sign Up' ?
           ( <form className={styles.form} onSubmit={handleSubmit(addNewUser)}>
                <input className={styles.input} placeholder="name" type="text"
                    {...register('name', { required: 'Name is required.' })} />
                {errors.name?.type === "required" && (
                    <p style={{color: 'red'}}>{errors.name.message}</p>
                )}
                <input className={styles.input} placeholder="password" type="password"
                    {...register('password', { required: 'Password is required.', 
                        pattern: {
                            value: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/,
                            message: 'Password should contain at least one uppercase letter, lowercase letter and digit.'
                        }, 
                        minLength:{ 
                            value: 8,
                            message: 'Password should be at-least 8 characters.'
                        } 
                    })} />
                {errors.password && errors.password.type === "required" && (
                    <p style={{color: 'red'}}>{errors.password.message}</p>
                )}
                {errors.password?.type === "minLength" && (
                    <p style={{color: 'yellow'}}>
                        {errors.password.message}
                    </p>
                )}
                {errors.password?.type === "pattern" && (
                    <p style={{color: 'orange'}}>
                        {errors.password.message}
                    </p>
                )}
                <button className={styles.button}>Sign Up</button>
                {Error && Error.message === 'This name is already used. Please, enter a different name' ? <p  style={{ color: 'red' }}>{Error.message}</p> : isSubmitSuccessful && <p style={{ color: 'lightgreen' }}>You are successfuly registrated. Restart the page and log in.</p>}
            </form>)
            :
            (<form className={styles.form} onSubmit={handleSubmitOne(checkUser)}>
                <input className={styles.input} placeholder="name" type="text"
                    {...registerOne('name', { required: "Name is requared" })} />
                <input className={styles.input} placeholder="password" type="password"
                    {...registerOne('password', { required: "Password is requared" })} />
                <button className={styles.button}>Log In</button>
                {Error && Error.message === 'Name or password is invalid' ? <p  style={{ color: 'red' }}>{Error.message}</p> : isSubmitSuccessfulOne && <p style={{ color: 'lightgreen' }}>Welcome, {user.name}</p>}
            </form>)}

        </div>

    );
}

export default Login;
