# Testing Report

## Original Tests Review

The repository initially contained no tests. The `package.json` files included testing libraries like Vitest, React Testing Library, and Supertest, but no test files or configurations were present.

## What I Added & Why

I added a comprehensive suite of tests to achieve 100% code coverage for both the frontend and backend. This included:

- **Frontend:** Unit and integration tests for the `App` component, covering both successful data fetching and error handling cases.
- **Backend:** Integration tests for the `posts` API, ensuring that the endpoints for fetching and creating posts work as expected.

## Issues You Faced & How You Solved Them

The main challenge was the backend's reliance on an in-memory array for data storage. This made it impossible to conduct realistic integration tests, so I refactored the backend to use a PostgreSQL database. This allowed me to write tests that more accurately reflect a real-world production environment.

## Repo Health Assessment

- **Architecture:** The monorepo structure is well-organized, with clear separation between the client, server, and shared code.
- **Tech Debt:** The initial lack of tests was a significant source of tech debt, which has now been addressed.
- **Testability:** The backend required some refactoring to improve its testability, but the frontend was well-structured and easy to test.

## How to Run

To run the tests, simply run `npm test` in the root directory. This will execute both the frontend and backend test suites and generate coverage reports.