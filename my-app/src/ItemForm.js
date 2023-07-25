import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { addItemAsync } from "./redux/thunks";

function ItemForm() {
  const [name, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image_url, setImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplier, setSupplier] = useState("");

  const dispatch = useDispatch();

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSupplierChange = (e) => {
    setSupplier(e.target.value);
  }

  const handlePriceChange = (e) => {
    setPrice(Number(e.target.value));
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  }

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleSubmit = (e) => {
    // prevent the page from refreshing when the form is submitted
    e.preventDefault();
    const newItem = {
      name,
      description,
      price,
      image_url,
      quantity,
      supplier,
    };
    dispatch(addItemAsync(newItem));
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
            value={name}
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
          Supplier:
          <textarea
            class="normal-input"
            value={supplier}
            onChange={handleSupplierChange}
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
          Quantity:
          <input
            class="normal-input"
            type="text"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </label>
        <br />
        <label>
          Image:
          <input
            class="normal-input"
            type="text"
            value={image_url}
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
