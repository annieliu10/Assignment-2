import React from "react";

function ItemDetail({ item, onClose }) {
  return (
    <div className="popup">
      <div className="popup-box">
        <h2>{item.itemName}</h2>
        <p>Description: {item.description}</p>
        <p>Price: {item.price}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ItemDetail;
