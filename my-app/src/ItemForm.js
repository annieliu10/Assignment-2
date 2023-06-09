import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "./actions";
import "./App.css";

function ItemForm() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(Number(e.target.value));
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleSubmit = (e) => {
    // prevent the page from refreshing when the form is submitted
    e.preventDefault();
    const newItem = {
      itemName,
      description,
      price,
      image,
    };
    dispatch(addItem(newItem));
    // Clear inputs
    setItemName("");
    setDescription("");
    setPrice("");
    setImage("");
  };

  const handleClear = () => {
    // Clear the form inputs
    setItemName("");
    setDescription("");
    setPrice("");
    setImage("");
  };

  return (
    <div class="inv-form">
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input
            class="normal-input"
            type="text"
            value={itemName}
            onChange={handleItemNameChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            class="normal-input"
            value={description}
            onChange={handleDescriptionChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            class="normal-input"
            type="text"
            value={price}
            onChange={handlePriceChange}
          />
        </label>
        <br />
        <label>
          Image:
          <input
            class="normal-input"
            type="text"
            value={image}
            onChange={handleImageChange}
          />
        </label>
        <br />
        <button class="button" type="submit">
          Add Item
        </button>
        <button class="button" type="button" onClick={handleClear}>
          Clear
        </button>
      </form>
    </div>
  );
}

export default ItemForm;
