import React from 'react';
import pnf from"../../images/pnf.jpg";
import "./PageNotFound.scss";
import { Link } from 'react-router-dom';

const PageNotFound=()=>{
    return(
        <div className='pnf-page'>
            <Link to="/">Click here to go back </Link>
            <img src={pnf} alt={"Invalid url"}/>
        </div>
    )
}

export default PageNotFound;