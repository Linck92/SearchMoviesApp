import { MovieService } from '../../../Services/movie.service';
import styles from './Home.module.css'
import { QueryCache, useMutation, useQueries, useQuery } from '@tanstack/react-query';
import MovieItem from './MovieItem/MovieItem';
import React, { useEffect, useMemo, useState } from 'react';
import Header from './Header/Header';
import Login from '../Login/Login';
import Select from './Select/Select';
import { useUpdateUserMutation } from '../../../store/API/APIgetUsers';
import { useSelector } from 'react-redux';
import { useActions } from '../../../hooks/useActions';
import { useGetMoviesQuery } from '../../../store/API/APIgetMovies';


function Home() {
  const user = useSelector(state => state.user)
  const [updateUser] = useUpdateUserMutation()
  const {getValue} = useActions()
  const {data} = useGetMoviesQuery(user?.inputValue, {
    skip: !user?.inputValue, // делаем это для того, чтобы этот запрос не выполнялся, если условие не требуется, то пишем просто useGetRecipesQuery()
  })
  const [sort, setSort] = useState('sort');
  const [sortedData, setSortedData] = useState('');

  useEffect(() => {
    if(user && user.inputValue) getValue(user.inputValue)
  },[user])

 useEffect(() => { if(sort === "new") {
    setSortedData([...data.Search].sort((a, b) => parseInt(b['Year']) - parseInt(a['Year'])))
  } else if(sort === "old") {
    setSortedData([...data.Search].sort((a, b) => parseInt(a['Year']) - parseInt(b['Year'])))
  } else if(sort === "sort") {
    setSortedData('')
  }
}, [sort])

  const handleChange = (e) => {
    getValue(e.target.value)
    updateUser(user)
    setSortedData('')
    setSort('sort')  
  };

  return (

    <div className={styles.home}>
      {user ? (
        <>
          <Header />
          <h1>Лучший сервис по поиску фильмов</h1>
          <div className={styles.select}>
            <input className={styles.search} placeholder='enter name' onChange={event => handleChange(event)} value={user.inputValue} type="text" />
            <Select sort = {sort} setSort = {setSort}/>
          </div>
          <div className={styles.list}>
            {sortedData
              ? sortedData.map(movie => <MovieItem key={data.Search.indexOf(movie)} data={movie} />)
              : data && data.Search && sortedData === ''
              ? data.Search.map(movie => <MovieItem key={data.Search.indexOf(movie)} data={movie} />) 
              : data && data.Error
                ? <span>{data.Error}</span>
                : <span>Loading...</span>} 
          </div> 
        </>
      ) : (
        <Login />
      )} 

    </div>
  )
}

export default Home