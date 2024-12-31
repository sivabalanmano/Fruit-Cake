import React, { useContext, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { GlobalContext } from "../../components/context";

const Details = () => {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    favorites,
    status,
    handleAddFavorites,
  } = useContext(GlobalContext);
  useEffect(() => {
    async function getRecipeDetails() {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await res.json();
      console.log(data);
      if (data?.data) {
        setRecipeDetailsData(data?.data);
      }
    }
    getRecipeDetails();
  }, []);
  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10"> 
      <div className="row-start-2 lg:row-start-auto ">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetailsData?.recipe?.image_url}
            alt=""
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetailsData?.recipe?.publisher}
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {recipeDetailsData?.recipe?.title}
        </h3>
        <div>
          <button
            onClick={() => handleAddFavorites(recipeDetailsData?.recipe)}
            className="text-sm mt-5 p-3 px-8 rounded-lg uppercase font-medium tracking-wider inline-block shadow-md bg-black text-white"
          >
            {favorites &&
              favorites.length > 0 &&
              favorites.findIndex(
                (item) => item.id === recipeDetailsData?.recipe?.id
              ) !== -1 ? "Remove From Favorites" :"Add From Favorites"}
          </button>
        </div>
        <div>
          <span className="text-2xl font-semibold text-black">Ingredints:</span>
          <ul>
            {recipeDetailsData?.recipe?.ingredients.map((Ingredints, index) => (
              <li key={index}>
                <span className="text-2xl font-semibold text-black">
                  {Ingredints.quantity} {Ingredints.unit}
                </span>
                <span className="text-2xl font-semibold text-black">
                  {Ingredints.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;
