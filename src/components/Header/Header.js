import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import user from "../../images/user.png";
// import "./Header.scss";
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/slice';
import { useAppContext } from '../../common/AppContext/AppContext';
import {  HeaderContainer,
    Logo,
    UserImage,
    UserSection,
    SearchBar, } from './Header.styles';


const Header = () => {
    const navigate = useNavigate();
    const { currentUser } = useAppContext();
    const [term, setTerm] = useState("");
    const dispatch = useDispatch();

    const handleLogIn = () => {
        navigate("/login");
    };

    const handleUserImageClick = () => {
        navigate("/login");
    };

    const handleSignUp=()=>{
        navigate("/signup")
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (term === "") return alert("Please enter search term");
        dispatch(fetchAsyncMovies(term));
        dispatch(fetchAsyncShows(term));
        setTerm("");
    }

    return (
        <HeaderContainer>
            <Logo>
                <Link to="/">MovieApp</Link>
            </Logo>
            <SearchBar>
                <form onSubmit={submitHandler}>
                    <input type='text'
                        value={term}
                        placeholder='Search Movies Or Shows'
                        onChange={(e) => setTerm(e.target.value)}
                    />
                    <button type='submit' data-testid="search-button"><i className='fa fa-search'></i></button>
                </form>

            </SearchBar>
            <div className='user'>
                {!currentUser ? (
                    <UserSection>
                        <div className='user-signup'>
                            <a onClick={handleSignUp} >SignUp</a>
                        </div>
                        <div className='user-login'>
                            <a onClick={handleLogIn} >LogIn</a>
                        </div>
                    </UserSection>
                ) : (
                    <UserImage>
                        <img
                            src={user}
                            alt="user"
                            onClick={handleUserImageClick}
                        />
                    </UserImage>
                )}
            </div>
        </HeaderContainer>
    );
};

export default Header;