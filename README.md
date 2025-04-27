# Debounce Search Form in React

This is an example of how to implement a **debounce functionality** in a React app for searching cocktails.

✅ **Using `useEffect` (Simple Version)**

```javascript
import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../Context';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { fetchDrinks } = useGlobalContext();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchDrinks(searchTerm);
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, fetchDrinks]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDrinks(searchTerm);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={searchTerm}
            placeholder="Search your favorite drinks"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SearchForm;


✅ **Using `MEMO` (Simple Version)**

import React, { useState, useMemo } from 'react';
import { useGlobalContext } from '../Context';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { fetchDrinks } = useGlobalContext();

  const debounce = (func, delay = 800) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedFetchDrinks = useMemo(() => debounce(fetchDrinks), [fetchDrinks]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedFetchDrinks(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDrinks(searchTerm);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={searchTerm}
            placeholder="Search your favorite drinks"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SearchForm;
