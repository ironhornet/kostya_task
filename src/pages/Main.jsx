import React, { useEffect, useState, useRef } from "react";

import style from "./main.style.css";
import ItemList from "../components/itemList/ItemList";
import RankingList from "../components/rankingList/RankingList";
import { HEX_COLORS_ARRAY, fetchUrl } from "./main.const";
import { useFetch } from "../hooks/useFetch.hook";
import Company from "./main.classes";

const Main = () => {
  const [companyList, setCompanyList] = useState([]);
  const [dataFromServer, setDataFromServer] = useState(null);
  const colorsArray = useRef(HEX_COLORS_ARRAY);

  const { data, loading, error } = useFetch(fetchUrl);

  useEffect(() => {
    setDataFromServer(data);
  }, [data]);

  const replaceItemInDataFromServer = (item) => {
    const index = dataFromServer.indexOf(item);
    if (index !== -1) {
      const temp = [...dataFromServer];
      temp[index] = item;
      setDataFromServer(temp);
    }

    const tempCompanyList = dataFromServer.reduce((acc, item) => {
      if (item.isActive) {
        return [...acc, item];
      }
      return acc;
    }, []);
    setCompanyList(tempCompanyList);
  };

  const handleCheckBoxChange = (checked, id) => {
    const item = dataFromServer.find((item) => item.id === +id);
    if (checked && companyList.length <= 5) {
      addToCompareList(item);
      return;
    }
    removeColor(item);
    removeFromCompareList(item);
  };

  const addToCompareList = (item) => {
    addColor(item);
    item.undisable();
    replaceItemInDataFromServer(item);
  };

  const addColor = (item) => item.addColor(colorsArray.current.pop());
  const removeColor = (item) => {
    const foundCompany = companyList.find((company) => company.id === item.id);
    if (foundCompany) {
      colorsArray.current = [...colorsArray.current, foundCompany.color];
      item.deleteColor(foundCompany.color);
    }
  };

  const removeFromCompareList = (item) => {
    item.disable();
    replaceItemInDataFromServer(item);
  };

  const disableCheckbox = (itemId) => {
    if (
      companyList.length === 5 &&
      !companyList.find((company) => company.id === itemId)
    ) {
      return true;
    }
  };
  if (loading) return <h1>Loading...</h1>;

  return (
    <main className="main-container">
      <ItemList data={companyList} />
      <RankingList
        onCheck={handleCheckBoxChange}
        dataFromServer={dataFromServer}
        disableCheckbox={disableCheckbox}
      />
    </main>
  );
};

export default Main;
