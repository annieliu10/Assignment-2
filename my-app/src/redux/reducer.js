import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "./utils";
import { combineReducers } from "redux";
import {
  getItemAsync,
  // deleteItemAsync,
  addItemAsync,
  getItemsAsync,
  sortItemsAsync,
  updateItemAsync,
} from "./thunks";

import { deleteItem } from "../actions";

const INITIAL_STATE = {
  list: [],
  filteredItems: [],
  getItem: REQUEST_STATE.IDLE,
  getItems: REQUEST_STATE.IDLE,
  deleteItem: REQUEST_STATE.IDLE,
  addItem: REQUEST_STATE.IDLE,
  sortItems: REQUEST_STATE.IDLE,
  updateItem: REQUEST_STATE.IDLE,
  filterItems: REQUEST_STATE.IDLE,
  error: null,
};

const itemsSlice = createSlice({
  name: "items",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItemsAsync.pending, (state, action) => {
        console.log("pending");
        state.getItems = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getItemsAsync.fulfilled, (state, action) => {
        state.getItems = REQUEST_STATE.FULFILLED;
        console.log("Fulfilled");
        state.list = action.payload;
      })
      .addCase(getItemsAsync.rejected, (state, action) => {
        state.getItems = REQUEST_STATE.REJECTED;
        state.error = action.error.message;
      })
      .addCase(getItemAsync.pending, (state, action) => {
        state.getItem = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getItemAsync.fulfilled, (state, action) => {
        state.getItem = REQUEST_STATE.FULFILLED;
        state.item = action.payload;
      })
      .addCase(getItemAsync.rejected, (state, action) => {
        state.getItem = REQUEST_STATE.REJECTED;
        state.error = action.error.message;
      })
      .addCase(deleteItem, (state, action) => {
        state.list = state.list.filter(
          (item) => item.itemName !== action.payload
        );
      })
      .addCase(addItemAsync.pending, (state, action) => {
        state.addItem = REQUEST_STATE.PENDING;
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        state.addItem = REQUEST_STATE.FULFILLED;
        state.list.push(action.payload);
      })
      .addCase(addItemAsync.rejected, (state, action) => {
        state.addItem = REQUEST_STATE.REJECTED;
        state.error = action.error.message;
      })
      .addCase(sortItemsAsync.pending, (state, action) => {
        state.sortItems = REQUEST_STATE.PENDING;
      })
      .addCase(sortItemsAsync.fulfilled, (state, action) => {
        state.sortItems = REQUEST_STATE.FULFILLED;
      })
      .addCase(sortItemsAsync.rejected, (state, action) => {
        state.sortItems = REQUEST_STATE.REJECTED;
        state.error = action.error.message;
      })
      .addCase(updateItemAsync.pending, (state, action) => {
        state.updateItem = REQUEST_STATE.PENDING;
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.updateItem = REQUEST_STATE.FULFILLED;
        const updatedItem = action.payload;
        const index = state.list.findIndex(
          (item) => item.itemName === updatedItem.itemName
        );

        if (index !== -1) {
          state.list[index] = updatedItem;
        }
      })
      .addCase(updateItemAsync.rejected, (state, action) => {
        state.updateItem = REQUEST_STATE.REJECTED;
        state.error = action.error.message;
      });
  },
});

export const itemsReducer = itemsSlice.reducer;
