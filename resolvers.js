const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Read data from `data.json`
const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));

let { categories, products, users, orders } = data;
const resolvers = {
  Query: {
    products: (parent, args) => {
      if (args.category) {
        return products.filter(
          (product) => product.category.id === args.category
        );
      }
      return products;
    },
    categories: () => {
      if (!categories) {
        return [];
      }
      return categories;
    },
    users: () => users,
    user: (parent, args) => users.find((user) => user.id === args.id),
    orders: (parent, args) =>
      orders.filter((order) => order.user.id === args.userId),
  },
  Mutation: {
    addProduct: (parent, { input }) => {
      const category = categories.find((cat) => cat.id === input.categoryId);
      if (!category) {
        throw new Error("Category not found");
      }

      const newProduct = {
        id: uuidv4(),
        name: input.name,
        description: input.description,
        price: input.price,
        category,
      };
      products.push(newProduct);
      category.products.push(newProduct);
      return newProduct;
    },
    addCategory: (parent, { name }) => {
      const newCategory = { id: uuidv4(), name, products: [] };
      categories.push(newCategory);
      return newCategory;
    },
    placeOrder: (parent, { userId, productIds }) => {
      const user = users.find((user) => user.id === userId);
      if (!user) {
        throw new Error("User not found");
      }

      const orderedProducts = productIds.map((id) => {
        const product = products.find((p) => p.id === id);
        if (!product) {
          throw new Error(`Product with id ${id} not found`);
        }
        return product;
      });

      const totalAmount = orderedProducts.reduce(
        (sum, product) => sum + product.price,
        0
      );

      const newOrder = {
        id: uuidv4(),
        user,
        products: orderedProducts,
        totalAmount,
      };
      orders.push(newOrder);
      user.orders.push(newOrder);
      return newOrder;
    },
  },
  Product: {
    category: (product) =>
      categories.find((cat) => cat.id === product.category.id),
  },
  Order: {
    user: (order) => users.find((user) => user.id === order.user.id),
    products: (order) => order.products,
  },
  User: {
    orders: (user) => orders.filter((order) => order.user.id === user.id),
  },
  Category: {
    products: (category) =>
      products.filter((product) => product.category.id === category.id),
  },
};

module.exports = { resolvers };
