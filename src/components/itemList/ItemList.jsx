import React from "react";

const ItemList = (props) => {
  const { data } = props;

  const mapItemList = () =>
    data.map((company) => (
      <li key={company.id}>
        {company.title}
        <div
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: `${company.color}`,
            borderRadius: "50%",
          }}
        ></div>
      </li>
    ));

  return <ul style={{ height: "200px" }}>
            {mapItemList()}
         </ul>;
};

export default ItemList;
