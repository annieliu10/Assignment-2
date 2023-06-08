import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "./actions";

function ItemForm() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
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
    // Clear tinputs
    setItemName("");
    setDescription("");
    setPrice(0);
    setImage("");
  };

  const handleClear = () => {
    // Clear the form inputs
    setItemName("");
    setDescription("");
    setPrice(0);
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item Name:
        <input type="text" value={itemName} onChange={handleItemNameChange} />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={handleDescriptionChange} />
      </label>
      <br />
      <label>
        Price:
        <input type="text" value={price} onChange={handlePriceChange} />
      </label>
      <br />
      <label>
        Image:
        <input type="text" value={image} onChange={handleImageChange} />
      </label>
      <br />
      <button type="submit">Add Item</button>
      <button type="button" onClick={handleClear}>
        Clear
      </button>
    </form>
  );
}

export default ItemForm;
