import User from "./User.js";
import Category from "./Category.js";
import Product from "./Product.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import Setting from "./Setting.js";

// User → Orders
User.hasMany(Order, {
  foreignKey: "userId",
  as: "orders",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Order.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Category → Products
Category.hasMany(Product, {
  foreignKey: "categoryId",
  as: "products",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

// Order → OrderItems
Order.hasMany(OrderItem, {
  foreignKey: "orderId",
  as: "items",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order",
});

// Product → OrderItems
Product.hasMany(OrderItem, {
  foreignKey: "productId",
  as: "orderItems",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

OrderItem.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

export {
  User,
  Category,
  Product,
  Order,
  OrderItem,
  Setting,
};