const typeDefs = `#graphql

type Query {
  products(category: ID!): [Product!]!
  categories: [Category!]!
  users: [User!]!
  user(id: ID!): User
  orders(userId: ID!): [Order!]!
}

  type Mutation {
    addProduct(input: AddProductInput!): Product!
    addCategory(name: String!): Category!
    placeOrder(userId: ID!, productIds: [ID!]!): Order!
  }

  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    category: Category!
  }

    type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }

    type User {
    id: ID!
    name: String!
    email: String!
    orders: [Order!]!
  }

    type Order {
    id: ID!
    user: User!
    products: [Product!]!
    totalAmount: Float!
  }

  input AddProductInput {
    name: String!
    description: String
    price: Float!
    categoryId: ID!
  }

`;

module.exports = { typeDefs };
