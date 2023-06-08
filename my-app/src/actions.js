export const addItem = (newItem) => {
  return {
    type: "ADD_ITEM",
    payload: newItem,
  };
};

export const deleteItem = (existingItem) => {
  return {
    type: "DELETE_ITEM",
    payload: existingItem,
  };
};

export const sortItems = () => {
  return {
    type: "SORT_ITEMS",
  };
};
