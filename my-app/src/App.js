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
    <div>
      <h1>Item List</h1>
      <ItemForm />
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
