import React, { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { useSelector, useDispatch } from "react-redux";

import { deleteItem } from "./actions";
import "./App.css";
import axios from "axios";

import {
  getItemsAsync,
  updateItemAsync,
} from "./redux/thunks";

function List() {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = useSelector((state) => state.items.list);
  const dispatch = useDispatch();
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  const handleSearch = async (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  
    try {
      const response = await axios.get(`http://localhost:3000/items/${searchTerm}`);
      const filteredItems = response.data;
      // Update the state or perform any additional actions with the filtered items
      console.log("Filtered Items:", filteredItems);
    } catch (error) {
      console.error("Error filtering items:", error);
    }
  };

  const handleDelete = (item) => {
    axios
      .delete(`http://localhost:3000/items/${item.name}`)
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
    setUpdatedPrice(updatedPrice);
    window.location.reload();
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(getItemsAsync());
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search item..."
        value={searchTerm}
        onChange={handleSearch}
      />
    {filteredItems.map((item) => (
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
          <h4>{item.name}</h4>

          <img class="image" src={item.image_url} alt={item.name} />
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