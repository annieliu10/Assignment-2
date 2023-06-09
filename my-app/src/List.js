import React, { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { deleteItem } from "./actions";
import { useDispatch } from "react-redux";
import { sortItems } from "./actions";
import "./App.css";

function List({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemList, setItemList] = useState([]);
  const dispatch = useDispatch();
  const [filterName, setFilterName] = useState("");

  const handleFilterChange = (e) => {
    setFilterName(e.target.value);
  };

  const handleFilterBlur = () => {
    setFilterName("");
  };

  const filteredItems = filterName
    ? items.filter((item) =>
        item.itemName.toLowerCase().includes(filterName.toLowerCase())
      )
    : items;

  const itemNames = [...new Set(items.map((item) => item.itemName))];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  const handleDelete = (existingItem) => {
    dispatch(deleteItem(existingItem));
  };

  const handleSort = () => {
    dispatch(sortItems());
  };

  useEffect(() => {
    setItemList(items);
  }, [items]);

  return (
    <div>
      <label>
        Filter by Name:
        <input
          type="text"
          value={filterName}
          onChange={handleFilterChange}
          onBlur={handleFilterBlur}
        />
      </label>
      <br />
      <button class="button" onClick={handleSort}>
        Sort Cheapest to Expensive
      </button>
      {filteredItems.map((item) => (
        <div
          //   classname="item-card"
          key={item.id}
          onClick={(event) => {
            // if it's the delete button then return immediately/early (a bit hacky)
            if (event.target.matches("button")) {
              return;
            }
            handleItemClick(item);
          }}
        >
          <h4>{item.itemName}</h4>

          <img class="image" src={item.image} alt={item.itemName} />

          <br />
          <button class="button" onClick={() => handleDelete(item.id)}>
            Delete
          </button>
        </div>
      ))}

      {selectedItem && <ItemDetail item={selectedItem} onClose={handleClose} />}
    </div>
  );
}

export default List;
