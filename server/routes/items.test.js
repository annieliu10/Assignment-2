const request = require('supertest');
const sinon = require('sinon');
const express = require('express');
const app = require('../app');

describe('ItemForm Endpoints', () => {
  // Mock the database client and collection
  let clientMock;
  let collectionMock;

  beforeAll(() => {
    // Create a mock function for the database operation
    collectionMock = {
      find: sinon.stub(),
    };
    clientMock = {
      db: sinon.stub().returns({
        collection: sinon.stub().returns(collectionMock),
      }),
    };

    // Replace the actual MongoDB client with the mock client
    app.client = clientMock;
  });

  afterEach(() => {
    // Reset the database operation mocks after each test
    collectionMock.find.reset();
  });

  test('GET / should return the list of items', async () => {
    // Set up the mock data to be returned by the database operation
    const mockItems = [
      { name: 'Item 1', price: 10 },
      { name: 'Item 2', price: 20 },
    ];
    collectionMock.find.returns({ toArray: sinon.stub().resolves(mockItems) });

    // Send the GET request to the endpoint
    const response = await request(app).get('/');

    // Verify the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockItems);
  });

  // Add more tests for other endpoints similarly.

  // After writing all the tests, you should close the MongoDB connection to prevent memory leaks.
//   afterAll(async () => {
//     await app.client.close();
//   });
});
