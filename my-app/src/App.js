import logo from "./logo.svg";
import "./App.css";
import items from "./items";
import React, { useState } from "react";
import List from "./List";
import ItemForm from "./ItemForm";
import { connect } from "react-redux";
import { addItem } from "./actions";

function App({ items }) {
  return (
    <div class="flex-container">
      <h1>Item Form</h1>
      <ItemForm />
      <h1>Item List</h1>
      <List items={items} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToProps)(App);
