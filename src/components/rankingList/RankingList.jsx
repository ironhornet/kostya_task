import React from "react";
import style from "./rankingList.style.css"

const RankingList = (props) => {
  const { onCheck, dataFromServer, disableCheckbox } = props;

  const mapRankingList = () => {
    const handleChange = (event) => {
      const { value, checked } = event.target;
      onCheck(checked, value);
    };
    
    return dataFromServer?.map((item) => {
      return (
        <tr key={item.id}>
          <td className="table__title">
            {item.title}
            <label>
              <input
                className="filled-in"
                type="checkbox"
                checked={item.isActive}
                id={item.id}
                value={item.id}
                onChange={handleChange}
                disabled={disableCheckbox(item.id)}
              />
              <span></span>
            </label>
          </td>
          <td>
            <span
              className="collored__circle"
              style={{
                backgroundColor: `${item.color}`,
              }}
            ></span>
          </td>
        </tr>
      );
    });
  };

  return (
    <table>
      <thead>
        <tr className="table__title">
          <th>Company name</th>
          <th>Compare</th>
        </tr>
      </thead>
      <tbody>{mapRankingList()}</tbody>
    </table>
  );
};
export default RankingList;
