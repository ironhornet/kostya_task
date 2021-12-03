import React from "react";
import { rankingListData } from './rankingList.data';

const RankingList = (props) => {
  const { onCheck, companyList } = props
    
  const mapRankingList = () => {
    return rankingListData.map((item) => (
        <li 
            key={item.id} 
            style={{
                display: "flex", 
                justifyContent: "space-between",
            }}
        >
            {item.companyName} 
            <input 
                type="checkbox" 
                id={item.id} 
                value={item.companyName} 
                onChange={(event) => onCheck(event, item)}
                disabled={(companyList.length === 5 && !companyList.find((company) => company.id === item.id))}
            />
        </li>
    ));
  };

  return  <section>
            <ul>{mapRankingList()}</ul>
          </section> 
};
export default RankingList;
