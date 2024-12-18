import React from 'react';
import pnf from"../../images/pnf.jpg";
// import "./PageNotFound.scss";
import { Link } from 'react-router-dom';
import { PnfPage } from './PageNotFound.styles';

const PageNotFound=()=>{
    return(
        <PnfPage>
            <Link to="/">Click here to go back </Link>
            <img src={pnf} alt={"Invalid url"}/>
        </PnfPage>
    )
}

export default PageNotFound;