import axios from "axios";
import { useState , useEffect } from "react";
import Genres from "../../components/Genres";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenres from "../../hooks/useGenre";

const Series = () => {
    
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numbleOfPages, setnumbleOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genresforURL = useGenres(selectedGenres);

    const fetchMovie = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresforURL}`);
        setContent(data.results);
        // console.log(data);
        setnumbleOfPages(data.total_pages);
    }

    useEffect(() => {
        window.scroll(0, 0);
        fetchMovie();
          // eslint-disable-next-line react-hooks/exhaustive-deps
        
    }, [page ,genresforURL]);

    return (
        <div>
            <span className ="pageTitle">TV Series</span>
            <Genres
                type = 'tv'
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
                       media_type = "tv"
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

export default Series
