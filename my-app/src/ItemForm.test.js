// ItemForm.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; // Install redux-mock-store if you haven't already
import ItemForm from './ItemForm';
import { addItemAsync } from './redux/thunks';
import thunk from 'redux-thunk';
 // Apply middleware to the store

// const mockStore = configureStore([]);
const middlewares = [thunk]; // Apply middleware to the store
const mockStore = configureStore(middlewares);

test('renders ItemForm correctly', () => {
  const store = mockStore({}); // Create a mock store
  render(
    <Provider store={store}>
      <ItemForm />
    </Provider>
  );

  // You can add additional assertions here to check that the form elements are rendered correctly

    // Check that the form fields are rendered correctly
    expect(screen.getByLabelText('Item Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Description:')).toBeInTheDocument();
    expect(screen.getByLabelText('Supplier:')).toBeInTheDocument();
    expect(screen.getByLabelText('Price:')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity:')).toBeInTheDocument();
    expect(screen.getByLabelText('Image:')).toBeInTheDocument();

});
 // Apply middleware to the store

