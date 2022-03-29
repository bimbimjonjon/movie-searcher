import React from 'react'
import {img_300, unavailable} from '../config/Config'
import "./SingleContent.css"
import {Badge} from  '@material-ui/core';
import ContentModal from '../ContentModal/ContentModal';

const SingleContent = ({id , poster , title , vote_average , date , media_type }) => {
    return (
        <ContentModal media_type={media_type} id={id}>
            <Badge badgeContent = {vote_average} color = {vote_average > 6 ? "primary" : "secondary"}/>
            <img className ="poster" src = {poster ? `${img_300}/${poster}` : unavailable} alt = {title} />
            <b className ="title" >{title}</b>
            <span className ="subTitle">
                {media_type === 'tv' ? "TV Series" : "Movie"}
                <span className ="subTitle">{date}</span>
            </span>

            
        </ContentModal>
    )
}

export default SingleContent;
