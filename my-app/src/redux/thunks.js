import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import ItemService from "./services";

export const getItemsAsync = createAsyncThunk(
  actionTypes.GET_ITEMS,
  async () => {
    console.log("get items");
    return await ItemService.getItems();
  }
);

export const addItemAsync = createAsyncThunk(
  actionTypes.ADD_ITEM,

  async (item) => {
    return await ItemService.addItem(item);
  }
);

export const getItemAsync = createAsyncThunk(
  actionTypes.GET_ITEM,
  async (item) => {
    return await ItemService.getItem(item);
  }
);

export const filterItemsAsync = createAsyncThunk(
  actionTypes.FILTER_ITEMS,
  async (item) => {
    return await ItemService.filterItems(item);
  }
);

export const sortItemsAsync = createAsyncThunk(async () => {
  return await ItemService.sortItems();
});

export const updateItemAsync = createAsyncThunk(
  actionTypes.UPDATE_ITEM,
  async (item) => {
    // console.log("WHY");
    return await ItemService.updateItem(item);
  }
);
