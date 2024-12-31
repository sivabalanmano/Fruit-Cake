import React, { useContext } from "react";
import { GlobalContext } from "../../components/context";
import ResipeItem from "../../components/resipe-list";

const Favorites = () => {
  const { favorites } = useContext(GlobalContext);

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favorites && favorites.length > 0 ? (
        favorites.map((item) => <ResipeItem key={item.id} item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing to Add . Please Add
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
