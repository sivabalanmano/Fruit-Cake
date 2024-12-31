import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../components/context";
import ResipeItem from "../../components/resipe-list";
import HomeData from "../../components/resipe-list/HomeData";

const Home = () => {
  const {
    resipeList,
    loading,
    homeData,
    setHomeData,
    setLoading,
    setSearchParam,
  } = useContext(GlobalContext);

  const rantHomeData = [
    "Apple",
    "Pizza",
    "Mango",
    "Strawberry",
    "Orange",
    "Pineapple",
    "Pomegranate",
    "Coconut",
    "Watermelon",
    "Dragon fruit",
    "Blueberry",
    "Blackberry",
    "Cherry",
    "Peach",
    "Banana"
  ];
  const setRantData = Math.floor(Math.random() * rantHomeData.length);
  const finalData = rantHomeData[setRantData];

  useEffect(() => {
    async function handleHomeData() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes?search=${finalData}`
        );
        const data = await res.json();
        if (data?.data?.recipes) {
          setHomeData(data?.data?.recipes);
          setLoading(false);
          setSearchParam("");
        }
      } catch (e) {
        console.log(e.message);
        setLoading(false);
        setSearchParam("");
      }
    }
    handleHomeData();
  }, []);

  if (loading) {
    return <div>Loading.......</div>;
  }

  return (
    <div className="py-8 grid-cols-3 container mx-auto flex flex-wrap justify-center gap-10">
      {resipeList && resipeList.length > 0 ? (
        resipeList.map((item) => <ResipeItem key={item.id} item={item} />)
      ) : (
        <>
          {homeData && homeData.length > 0 ? (
            homeData.map((e) => <HomeData key={e.id} e={e} />)
          ) : (
            <div>Please Search Some Thing</div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
