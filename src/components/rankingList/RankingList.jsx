import React from "react";

const RankingList = (props) => {
  const { 
      onCheck, 
      dataFromServer, 
      disable,
    } = props;

  const mapRankingList = () => {
    return dataFromServer?.map((item) => (
      <tr key={item.id}>
        <td
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {item.title}
          <input
            type="checkbox"
            id={item.id}
            onChange={(event) => onCheck(event, item)}
            disabled={disable(item)}
          />
        </td>
        <td style={{ 
            width: "20px", 
            height: "20px", 
            backgroundColor:`${item.color}` 
        }}>

        </td>
      </tr>
    ));
  };

  return (
    <table>
      <thead>
        <tr style={{display: "flex", justifyContent: "space-between"}}>
          <th>Company name</th>
          <th>Compare</th>
        </tr>
      </thead>
      <tbody>{mapRankingList()}</tbody>
    </table>
  );
};
export default RankingList;
