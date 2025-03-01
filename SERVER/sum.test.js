const request = require("supertest");
const mongoose = require("mongoose");
const app = require("./server");
jest.setTimeout(10000); 
describe("Basic Math Test", () => {
    test("adds 1 + 2 to equal 3", () => {
        expect(1 + 2).toBe(3);
    });
});
describe("API Endpoint Tests", () => {
    test("GET /getfile should return status 200", async () => {
        const response = await fetch("http://localhost:5000/ping")
        expect(response.status).toBe(200);
    });
});

// afterAll(async () => {
//     await mongoose.connection.close();
// });
