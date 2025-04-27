# Debounce Functionality in React App by Coding Addict


with UseEffect:
//javascript
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../Context';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeoutId, setTimeoutId] = useState(null); // w/ useEffect
  const {fetchDrinks} = useGlobalContext();
 
  const handleSubmit = (e) => {
    e.preventDefault();

  }
//   WITH USE EFFECT
  const searchCocktail = e => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    clearTimeout(timeoutId);
    setTimeoutId(
        setTimeout(() => {
            fetchDrinks(searchTerm)
        }, 1000)
    );
  }
  useEffect(() => {
    return () => {
        clearTimeout(timeoutId)
    }
  },[timeoutId])

  return (
    <div>
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-control">
               
                <br />
                <input
                type='text'
                name='name'
                id='name'
                onChange={searchCocktail}
                value={searchTerm}
                placeholder='Search your favorite drinks'
                />
            </div>
            <div>
            <button type='submit'>Submit</button>
            </div>
            
        </form>
    </div>
  )
}

export default SearchForm
<br />
//javascript

//WITH USE MEMO
import React, { useMemo, useEffect, useState } from 'react'
import { useGlobalContext } from '../Context';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeoutId, setTimeoutId] = useState(null); // w/ useEffect
  const {fetchDrinks} = useGlobalContext();
 
  const handleSubmit = (e) => {
    e.preventDefault();

  }
// with useMemo
  const searchCocktail = () => {
    let timeoutId;
    return (e) => {
        const searchInput = e.target.value;
        setSearchTerm(searchInput);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
                fetchDrinks(searchInput);
        }, 1000);
    }
  }
  const debounceSearchCocktail = useMemo(() => searchCocktail(),[]);
  return (
    <div>
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-control">
               
                <br />
                <input
                type='text'
                name='name'
                id='name'
                onChange={debounceSearchCocktail}
                value={searchTerm}
                placeholder='Search your favorite drinks'
                />
            </div>
            <div>
            <button type='submit'>Submit</button>
            </div>
            
        </form>
    </div>
  )
}

export default SearchForm
