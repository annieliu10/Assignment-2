import React from "react";

function ItemDetail({ item, onClose }) {
  return (
    <div className="popup">
      <div className="popup-box">
        <h2>{item.name}</h2>
        <p>Description: {item.description}</p>
        <p>Price: {item.price}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Supplier: {item.supplier}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ItemDetail;
