import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./MovieDetail.module.css";
import { useContext, useEffect, useState } from "react";
import { MovieService } from "../../../Services/movie.service";
import Login from "../Login/Login";
import { AuthContext } from "../../Providers/AuthProvider";
import { useSelector } from "react-redux";

function MovieDetail() {
  
  const navigate = useNavigate()
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const user = useSelector(state => state.user)

  // const {user} = useContext(AuthContext)

  useEffect(() => {
    if (!id) return;
    async function fetchData() {
      const data = await MovieService.getById(id);
      setMovie(data);
    }
    fetchData();
  }, [id]);

  return (
    <>
     {user ? 
      
      <div className={styles.item}>
        <img src={movie.Poster} alt="/" />
        <div className={styles.detail}>
          <div>
            <h3>
              {movie.Title} ({movie.Year})
            </h3>
          </div>
          <div style={{ display: "flex", gap: "20px", marginTop: "auto" }}>
            <div className={styles.info}>
              <p>Actors:</p>
              <strong>{movie.Actors}</strong>
              <p>Runtime:</p>
              <strong>{movie.Runtime}</strong>
              <p>Genre:</p>
              <strong>{movie.Genre}</strong>
              <p>Language:</p>
              <strong>{movie.Language}</strong>
              <p>Rating:</p>
              <strong>{movie.imdbRating}</strong>
              <p>BoxOffice:</p>
              <strong>{movie.BoxOffice}</strong>
            </div>
            <div className={styles.descriprionWrapper}>
                <p className={styles.description}>Description:</p>
                <strong>{movie.Plot}</strong>
                <button className={styles.link} onClick={() => navigate("/")}>back</button>
            </div>
          </div>
        </div>
      </div>
      
      : <Login/>
      
    }
      
    </>
   
  );
}

export default MovieDetail;
