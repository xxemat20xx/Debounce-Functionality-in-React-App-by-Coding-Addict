import React from 'react'
import { AppProvider } from './Context'
import CocktailList from './components/CocktailList'
import SearchForm from './components/SearchForm'
export default function App() {
  return (
    <div>
      <SearchForm />
      <CocktailList />
    </div>
  )
}
