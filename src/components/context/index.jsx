import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [resipeList, setResipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [homeData,setHomeData]=useState('')
  const [status,setStatus]=useState(true)
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();
      if (data?.data?.recipes) {
        setResipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
      }
    } catch (e) {
      console.log(e.message);
      setLoading(false);
      setSearchParam("");
    }
  }
  function handleAddFavorites(getCurrentId){
    console.log(getCurrentId)
    let cpyFavoritesList = [...favorites]
    const index=cpyFavoritesList.findIndex(item=> item.id  === getCurrentId.id)

    if(index === -1){
      cpyFavoritesList.push(getCurrentId)
    }else{
      cpyFavoritesList.splice(index)
    }
    setFavorites(cpyFavoritesList)
    if(status){
      setStatus(false)
    }else{
      setStatus(true)
    }
    console.log(status)
    
  }
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        setLoading,
        resipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        favorites,
        setFavorites,
        handleAddFavorites,
        homeData,setHomeData,
        status
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
