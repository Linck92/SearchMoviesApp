import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './MovieItem.module.css'
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useContext, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MovieService } from '../../../../Services/movie.service';
import { useSelector } from 'react-redux';
import { useActions } from '../../../../hooks/useActions';
import { useUpdateUserMutation } from '../../../../store/API/APIgetUsers';
import { useGetMovieByIdQuery } from '../../../../store/API/APIgetMovies';

function MovieItem({ data }) {
  const user = useSelector(state => state.user)
  const {toggleFavourites} = useActions()
  const [updateUser] = useUpdateUserMutation()
  const {data: fullInfo} = useGetMovieByIdQuery(data.imdbID)
  const [icon, setIcon] = useState(false);
  const navigate = useNavigate();

 useEffect(() => {
  updateUser(user)
  if(user.favourites.find(element => element.imdbID === data.imdbID)) {
    setIcon(true)
  } else { setIcon(false)
  }}, [user.favourites, data])


  return (
    <div className={styles.item}>
      {fullInfo ? <span className={styles.rating}>{fullInfo.imdbRating}</span> : <span></span>}
      {icon === false
        ? <MdFavoriteBorder onClick={() => {toggleFavourites(data)}} className={styles.icon} color='#FF4C2B' size='30px' />
        : <MdFavorite onClick={() => {toggleFavourites(data)}} className={styles.icon} color='#FF4C2B' size='30px' />
      }
      <Link to={`/movie/${data.imdbID}`}><img src={data.Poster} alt="/"/></Link>
      <h3 onClick={() => navigate(`/movie/${data.imdbID}`)} className={styles.title}>{data.Title} ({data.Year})</h3>
    </div>
  );
}

export default MovieItem;
