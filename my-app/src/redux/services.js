const getItems = async () => {
  const response = await fetch("http://localhost:3000/items", {
    method: "GET",
  });
  const data = await response.json();
  console.log(data);
  return data;
};

const getItem = async (item) => {
  const response = await fetch(`http://localhost:3000/items/${item.itemName}`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

const addItem = async (item) => {
  const response = await fetch("http://localhost:3000/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error);
  }
  return data;
};

const sortItems = async () => {
  const response = await fetch("http://localhost:3000/items/sort/items", {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

const updateItem = async (item) => {
  const response = await fetch(`http://localhost:3000/items/${item.itemName}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  console.log("bruh");
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error);
  }
  return data;
};

export default {
  getItems,
  getItem,
  addItem,
  sortItems,
  updateItem,
};
