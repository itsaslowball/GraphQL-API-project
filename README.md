```markdown
# GraphQL API with Express

This is a GraphQL API built with Express that allows you to manage products, categories, users, and orders in a simple e-commerce application. It uses a JSON file as a data store, making it easy to set up and run without a database.

## Features

- **Query Products**: Fetch all products or filter by category.
- **Manage Categories**: Add new categories and retrieve all categories.
- **User Management**: Retrieve user information and their associated orders.
- **Order Management**: Place orders by selecting products and linking them to a user.
- **GraphiQL Interface**: An interactive interface for testing and exploring the API.

## Technologies Used

- Node.js
- Express
- GraphQL
- JSON (for data storage)
- UUID (for generating unique identifiers)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/itsaslowball/GraphQL-API-project.git
   cd GraphQL-API-project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `data.json` file in the root directory and add the initial data structure:

   ```json
   {
     "categories": [],
     "products": [],
     "users": [],
     "orders": []
   }
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Open your browser and go to [http://localhost:4000/graphql](http://localhost:4000/graphql) to access the GraphiQL interface.

## GraphQL Schema

### Queries

- **`products(category: ID): [Product!]!`**: Fetches all products or products by category ID.
- **`categories: [Category!]!`**: Retrieves all categories.
- **`users: [User!]!`**: Fetches all users.
- **`user(id: ID!): User`**: Fetches a user by ID.
- **`orders(userId: ID!): [Order!]!`**: Retrieves orders for a specific user.

### Mutations

- **`addProduct(input: AddProductInput!): Product!`**: Adds a new product.
- **`addCategory(name: String!): Category!`**: Adds a new category.
- **`placeOrder(userId: ID!, productIds: [ID!]!): Order!`**: Places a new order for a user.

### Types

- **`Product`**: Represents a product with fields like `id`, `name`, `description`, `price`, and `category`.
- **`Category`**: Represents a product category with fields like `id`, `name`, and `products`.
- **`User`**: Represents a user with fields like `id`, `name`, `email`, and `orders`.
- **`Order`**: Represents an order with fields like `id`, `user`, `products`, and `totalAmount`.

## Example Queries

### Fetch All Products

```graphql
query {
  products {
    id
    name
    description
    price
  }
}
```

### Add a New Product

```graphql
mutation {
  addProduct(input: {
    name: "New Product"
    description: "This is a new product."
    price: 19.99
    categoryId: "your-category-id"
  }) {
    id
    name
    description
    price
  }
}
```
```