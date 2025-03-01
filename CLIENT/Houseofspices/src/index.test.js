// describe("E-commerce Website Test Suite", () => {
//     test("Verify that the website loads properly and all elements are displayed correctly", () => {
//       expect(true).toBe(true);
//     });
  
//     test("Test the search functionality by searching for different products and verify the results", () => {
//       // Simulate search action and verify results
//       expect(true).toBe(true);
//     });
  
//     test("Test the add to cart functionality by adding multiple products to the cart and verify the cart total", () => {
//       // Simulate adding products to the cart and checking total
//       expect(true).toBe(true);
//     });
  
//     test("Test the login process by entering valid and invalid username and password combinations", () => {
//       // Simulate login and validate authentication
//       expect(true).toBe(true);
//     });
  
//     test("Test the product filters by using various filter options and verify the results", () => {
//       // Apply filters and verify displayed products
//       expect(true).toBe(true);
//     });
  
//     test("Test the product sorting by using various sorting options and verify the results", () => {
//       // Apply sorting and check order of products
//       expect(true).toBe(true);
//     });
  
//     test("Test the product reviews by adding a review for a product and verify that it is displayed correctly", () => {
//       // Submit a review and validate its appearance
//       expect(true).toBe(true);
//     });
  
//     test("Test the product ratings by giving a rating for a product and verify that it is displayed correctly", () => {
//       // Submit a rating and validate its appearance
//       expect(true).toBe(true);
//     });
  
//     test("Test the wishlist functionality by adding multiple products to the wishlist and verify the wishlist total", () => {
//       // Add products to wishlist and validate
//       expect(true).toBe(true);
//     });
//   });

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import Loginpage from "./componenets/login";
import { auth } from "./Firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

jest.mock("axios");
jest.mock("./Firebase/firebase", () => ({
  auth: {
    signInWithPopup: jest.fn(),
  },
}));

jest.mock("firebase/auth", () => ({
  GoogleAuthProvider: jest.fn(),
  signInWithPopup: jest.fn(),
}));

describe("Loginpage Component", () => {
  test("renders login form correctly", () => {
    render(
      <MemoryRouter>
        <Loginpage />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Pin")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in with google/i })).toBeInTheDocument();
  });

  test("validates form inputs and enables login button when valid", () => {
    render(
      <MemoryRouter>
        <Loginpage />
      </MemoryRouter>
    );

    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const pinInput = screen.getByPlaceholderText("Enter Pin");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(pinInput, { target: { value: "1234" } });

    expect(loginButton).not.toBeDisabled();
  });

  test("disables login button when inputs are invalid", () => {
    render(
      <MemoryRouter>
        <Loginpage />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeDisabled();
  });

  test("submits login form and navigates on success", async () => {
    axios.post.mockResolvedValue({ data: { message: "User Login", Token: "token123", name: "John" } });
    const mockNavigate = jest.fn();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Loginpage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("pin"), { target: { value: "1234" } });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/front"));
  });

  test("shows error alert on failed login", async () => {
    axios.post.mockRejectedValue(new Error("Invalid user details"));

    jest.spyOn(window, "alert").mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Loginpage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter Pin"), { target: { value: "1234" } });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => expect(window.alert).toHaveBeenCalledWith("Failed to login!!"));
  });

  test("handles Google sign-in successfully", async () => {
    const mockUser = { displayName: "John Doe", email: "john@example.com" };
    signInWithPopup.mockResolvedValue({ user: mockUser });
    axios.post.mockResolvedValue({ data: { message: "User Login", Token: "token123", name: "John" } });
    const mockNavigate = jest.fn();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Loginpage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /sign in with google/i }));
    await waitFor(() => expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.any(GoogleAuthProvider)));
  });
});
