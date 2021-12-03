import React, { useState } from "react";
import style from "./main.style.css";
import ItemList from "../components/itemList/ItemList";
import RankingList from "../components/rankingList/RankingList";

const HEX_COLORS_ARRAY = [
  "#FF0000",
  "#FFFB00",
  "#2EFF00",
  "#0027FF",
  "#FF00EC",
];
const Main = () => {
  const [companyList, setCompanyList] = useState([]);
  const [freeHexColors, setfreeHexColors] = useState(HEX_COLORS_ARRAY);

  const handleCheckBoxChange = (event, item) => {
    if (!event || !event.target) return;

    const { checked } = event.target;

    if (checked && companyList.length <= 5 && freeHexColors.length) {
      setCompanyList([...companyList, { ...item, color: freeHexColors[0] }]);
      console.log({ item });

      const filteredHexArray = freeHexColors.filter(
        (color) => color !== freeHexColors[0]
      );
      setfreeHexColors(filteredHexArray);
      console.log(freeHexColors);
      return;
    }

    const foundCompany = companyList.find((company) => company.id === item.id);
    if (foundCompany) {
      setfreeHexColors([...freeHexColors, foundCompany.color]);
    }

    const filteredList = companyList.filter(
      (company) => company.id !== item.id
    );
    setCompanyList(filteredList);
  };

  return (
    <main className="main-container">
      <ItemList data={companyList} />
      <RankingList 
        onCheck={handleCheckBoxChange} 
        companyList={companyList} 
      />
    </main>
  );
};

export default Main;
