import React from "react";

import style from "./itemList.style.css";

const ItemList = (props) => {
  const { data } = props;

  const mapCompanyList = () =>
    data.map((company) => (
      <tr key={company.id}>
        <td className="table__title">
          {company.title}
          <span
            className="colored__circle"
            style={{
              backgroundColor: `${company.color}`,
            }}
          ></span>
        </td>
      </tr>
    ));

  return (
    <table>
      <thead>
        <tr className="table__title">
          <th>Company name</th>
          <th>Compare</th>
        </tr>
      </thead>
      <tbody className="table__body">{mapCompanyList()}</tbody>
    </table>
  );
};

export default ItemList;
