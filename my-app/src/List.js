import React, { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { deleteItem } from "./actions";
import { useDispatch } from "react-redux";
import { sortItems } from "./actions";

function List({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemList, setItemList] = useState([]);
  const dispatch = useDispatch();
  const [filterName, setFilterName] = useState("");

  const handleFilterChange = (e) => {
    setFilterName(e.target.value);
  };

  const itemNames = [...new Set(items.map((item) => item.itemName))];

  const filteredItems = items.filter((item) =>
    filterName ? item.itemName.toLowerCase() === filterName.toLowerCase() : true
  );

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
        <select value={filterName} onChange={handleFilterChange}>
          <option value="">All</option>
          {itemNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            <h3>{item.itemName}</h3>
            <p>Description: {item.description}</p>
            <p>Price: {item.price}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleSort} className="sort-button">
        Sort Cheapest to Expensive
      </button>

      {itemList.map((item) => (
        <div
          key={item.id}
          onClick={(event) => {
            // if it's the delete button then return immediately/early (a bit hacky)
            if (event.target.matches("button")) {
              return;
            }
            handleItemClick(item);
          }}
        >
          <h3>{item.itemName}</h3>
          <img src={item.image} alt={item.itemName} />
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
      {selectedItem && <ItemDetail item={selectedItem} onClose={handleClose} />}
    </div>
  );
}

export default List;
