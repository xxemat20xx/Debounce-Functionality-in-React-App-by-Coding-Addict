import React, { useEffect, useState, useContext } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const AppContext = React.createContext();

    const AppProvider = ({ children }) => {
        const [cocktails, setCocktails] = useState([]);
        const [loading, setLoading] = useState(true);

        const fetchDrinks = async (searchTerm) => {
            setLoading(true);
            try {
                const response = await fetch(`${url}${searchTerm || 'a'}`);
                const data = await response.json();
                const {drinks} = data;
                if (drinks) {
                    const newCocktails = drinks.map((item) => {
                        const { idDrink, strDrink, strDrinkThumb, strAlcoholic } = item;
                        return { id: idDrink, name: strDrink, image: strDrinkThumb, info: strAlcoholic };
                    });
                    setCocktails(newCocktails);
                } else {
                    setCocktails([]);
                }
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }

        useEffect(() => {
            fetchDrinks();
        }, []);

        return (
            <AppContext.Provider value={{ cocktails, loading, fetchDrinks }}>
                {children}
            </AppContext.Provider>
        )
    }
 
export const useGlobalContext = () => {
    return useContext(AppContext);
}
export { AppContext, AppProvider };

