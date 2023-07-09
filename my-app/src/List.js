import React, { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { useSelector, useDispatch } from "react-redux";

import { deleteItem } from "./actions";
import "./App.css";
import axios from "axios";

import {
  getItemsAsync,
  sortItemsAsync,
  getItemAsync,
  updateItemAsync,
} from "./redux/thunks";

function List() {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = useSelector((state) => state.items.list);
  const filteredItems = useSelector((state) => state.items.filteredItems);
  const dispatch = useDispatch();
  const [updatedPrice, setUpdatedPrice] = useState("");

  const handleItemClick = (item) => {
    dispatch(getItemAsync(item.id));
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  const handleDelete = (item) => {
    axios
      .delete(`http://localhost:3000/items/${item.itemName}`)
      .then((response) => {
        // Item deleted successfully
        // You can perform any additional actions or update the state as needed
        console.log("Item deleted:", response.data);
        dispatch(deleteItem(item));
      })
      .catch((error) => {
        // Error occurred while deleting item
        // You can handle the error and display an error message if necessary
        console.error("Error deleting item:", error);
      });

    window.location.reload();
  };

  const handlePriceChange = (event) => {
    setUpdatedPrice(event.target.value);
  };

  const handleSubmitPrice = (item) => {
    const updatedItem = { ...item, price: Number(updatedPrice) };
    dispatch(updateItemAsync(updatedItem));
    setUpdatedPrice(0);
    // window.location.reload();
  };

  const handleSort = () => {
    dispatch(sortItemsAsync());
    window.location.reload();
  };

  useEffect(() => {
    console.log("Load items");
    dispatch(getItemsAsync());
  }, []);

  return (
    <div>
      <button class="button" onClick={handleSort}>
        Sort Cheapest to Expensive
      </button>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={(event) => {
            // if it's the delete button then return immediately/early (a bit hacky)
            if (event.target.matches("button")) {
              return;
            }
            if (event.target.matches("input")) {
              return;
            }

            handleItemClick(item);
          }}
        >
          <h4>{item.itemName}</h4>

          <img class="image" src={item.image} alt={item.itemName} />
          <div className="price-input">
            <input
              type="number"
              value={updatedPrice}
              onChange={handlePriceChange}
            />
            <button className="button" onClick={() => handleSubmitPrice(item)}>
              Submit
            </button>
          </div>
          <br />
          <button class="button" onClick={() => handleDelete(item)}>
            Delete
          </button>
        </div>
      ))}
      {selectedItem && <ItemDetail item={selectedItem} onClose={handleClose} />}
    </div>
  );
}

export default List;
