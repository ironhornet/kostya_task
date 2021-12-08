import React, { useEffect, useState } from "react";

import style from "./main.style.css";
import ItemList from "../components/itemList/ItemList";
import RankingList from "../components/rankingList/RankingList";
import { HEX_COLORS_ARRAY, fetchUrl } from "./main.const";
import { useFetch } from "../hooks/useFetch.hook";
import Company from "./main.classes";

const Main = () => {
  const [companyList, setCompanyList] = useState([]);
  const [freeHexColors, setfreeHexColors] = useState(HEX_COLORS_ARRAY); //use ref
  const [dataFromServer, setDataFromServer] = useState(null);

  const { data, loading, error } = useFetch(fetchUrl);


  useEffect(() => {
    const dataFromServerAdapter = (data) => {
      if (!data) return;
      return data.map((rawCompany) => new Company(rawCompany));
    };
    setDataFromServer(dataFromServerAdapter(data));
  }, [data]);

  const handleCheckBoxChange = (event, item) => {
    if (!event || !event.target) return;
    const { checked } = event.target;

    if (checked && companyList.length <= 5 && freeHexColors.length) {
      addColor(item);
      return;
    }
    removeColor(item)
    removeFromCompareList(item.id);

  };

  const addColor = (item) => {
    setCompanyList([...companyList, { ...item, color: freeHexColors[0] }]);  
    item.addColor(freeHexColors[0])
    

    const filteredHexArray = freeHexColors.filter(
      (color) => color !== freeHexColors[0]
    );
    setfreeHexColors(filteredHexArray);
  };

  const removeColor = (item) => {
    const foundCompany = companyList.find((company) => company.id === item.id);
    if (foundCompany) {
      setfreeHexColors([...freeHexColors, foundCompany.color]);
      item.deleteColor()
    }
  }

  const removeFromCompareList = (id) => {
    const filteredList = companyList.filter((company) => company.id !== id);
    setCompanyList(filteredList);
    
  };

  const disable = (item) => {
    if (
      companyList.length === 5 &&
      !companyList.find((company) => company.id === item.id)
    ) {
      return true;
    }
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <main className="main-container">
      <ItemList data={companyList}/>
      <RankingList
        onCheck={handleCheckBoxChange}
        dataFromServer={dataFromServer}
        disable={disable}
      />
    </main>
  );
};

export default Main;
