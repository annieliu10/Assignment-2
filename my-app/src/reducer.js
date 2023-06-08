import items from "./items";

const initialState = {
  items: items,
};

// https://stackoverflow.com/questions/36326612/how-to-delete-an-item-from-state-array
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "SORT_ITEMS":
      // Create a new copy
      const sortedItems = [...state.items].sort((a, b) => a.price - b.price);
      return {
        ...state,
        items: sortedItems,
        isSorted: true,
      };
    default:
      return state;
  }
};

export default reducer;
