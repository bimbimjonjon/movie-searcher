import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import Genres from '../../components/Genres'
import useGenres from "../../hooks/useGenre";



const Movies = () => {

    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numbleOfPages, setnumbleOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genresforURL = useGenres(selectedGenres);

    const fetchMovie = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresforURL}`);
        setContent(data.results);
        setnumbleOfPages(data.total_pages);
    }

    useEffect(() => {
        window.scroll(0, 0);
        fetchMovie();
         // eslint-disable-next-line react-hooks/exhaustive-deps
        
    }, [page ,genresforURL]);

   

    return (
        <div>
            <span className ="pageTitle">Movies</span>
            <Genres
                type = 'movie'
                selectedGenres = {selectedGenres}
                setSelectedGenres = {setSelectedGenres}
                genres = {genres}
                setGenres = {setGenres}
                setPage={setPage}

            
            />
            <div className ="trending">
                {
                    content && content.map((c) => 
                       <SingleContent
                        key={c.id} 
                       id={c.id}
                       poster = {c.poster_path}
                       title = {c.title || c.name}
                       date = {c.first_air_date || c.release_date}
                       media_type = {c.media_type}
                       vote_average = {c.vote_average}
                       />
                    )
                }
            </div>
            {numbleOfPages > 1 && (
                <CustomPagination setPage={setPage} numbleOfPages={numbleOfPages} />
            )}
        </div>
    )
}

export default Movies
