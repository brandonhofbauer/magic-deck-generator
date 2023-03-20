import React from 'react';

//needs a handler for the button, microservice for later

const Search = () => {
    return (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Card Search </span>
        </label>
        <input type="text" id="header-search" placeholder="Card Name" name="s" />
        <button type="submit">Search</button>
    </form>
    );
}

export default Search;