import bcrypt from "bcrypt";
import sequelize from "../config/database.js";
import {
  User,
  Category,
  Product,
  Order,
  OrderItem,
  Setting,
} from "../models/index.js";

const seedDatabase = async () => {
  try {
    console.log("Starting database seed...");

    // 1. Test database connection
    await sequelize.authenticate();
    console.log("Database connection successful.");

    // 2. Make sure tables exist
    await sequelize.sync();
    console.log("Database tables synchronized.");

    // 3. Create users
    const adminPassword = await bcrypt.hash("Admin@123", 10);
    const userPassword = await bcrypt.hash("User@123", 10);

    const [admin] = await User.findOrCreate({
      where: {
        email: "admin@example.com",
      },
      defaults: {
        name: "System Administrator",
        password: adminPassword,
        role: "admin",
      },
    });

    const [user] = await User.findOrCreate({
      where: {
        email: "user@example.com",
      },
      defaults: {
        name: "Regular User",
        password: userPassword,
        role: "user",
      },
    });

    console.log("Users created.");

    // 4. Create categories
    const [electronics] = await Category.findOrCreate({
      where: {
        name: "Electronics",
      },
      defaults: {
        description: "Electronic devices and accessories.",
      },
    });

    const [clothing] = await Category.findOrCreate({
      where: {
        name: "Clothing",
      },
      defaults: {
        description: "Clothing and fashion products.",
      },
    });

    console.log("Categories created.");

    // 5. Create products
    const [laptop] = await Product.findOrCreate({
      where: {
        name: "Professional Laptop",
      },
      defaults: {
        description: "High-performance laptop for professional use.",
        price: 150000.0,
        stock: 10,
        categoryId: electronics.id,
        isActive: true,
      },
    });

    const [mouse] = await Product.findOrCreate({
      where: {
        name: "Wireless Mouse",
      },
      defaults: {
        description: "Ergonomic wireless mouse.",
        price: 4500.0,
        stock: 25,
        categoryId: electronics.id,
        isActive: true,
      },
    });

    const [tShirt] = await Product.findOrCreate({
      where: {
        name: "Premium T-Shirt",
      },
      defaults: {
        description: "Comfortable premium cotton T-shirt.",
        price: 3500.0,
        stock: 50,
        categoryId: clothing.id,
        isActive: true,
      },
    });

    console.log("Products created.");

    // 6. Create an order for the regular user
    const [order] = await Order.findOrCreate({
      where: {
        userId: user.id,
        status: "processing",
      },
      defaults: {
        totalAmount: 161000.0,
      },
    });

    // 7. Create order items
    await OrderItem.findOrCreate({
      where: {
        orderId: order.id,
        productId: laptop.id,
      },
      defaults: {
        quantity: 1,
        unitPrice: laptop.price,
      },
    });

    await OrderItem.findOrCreate({
      where: {
        orderId: order.id,
        productId: mouse.id,
      },
      defaults: {
        quantity: 1,
        unitPrice: mouse.price,
      },
    });

    await OrderItem.findOrCreate({
      where: {
        orderId: order.id,
        productId: tShirt.id,
      },
      defaults: {
        quantity: 2,
        unitPrice: tShirt.price,
      },
    });

    console.log("Order and order items created.");

    // 8. Create application settings
    await Setting.findOrCreate({
      where: {
        key: "site_name",
      },
      defaults: {
        value: "eCommerce Admin Platform",
      },
    });

    await Setting.findOrCreate({
      where: {
        key: "currency",
      },
      defaults: {
        value: "LKR",
      },
    });

    await Setting.findOrCreate({
      where: {
        key: "tax_rate",
      },
      defaults: {
        value: "0",
      },
    });

    console.log("Settings created.");

    console.log("Database seeding completed successfully.");
  } catch (error) {
    console.error("Database seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

seedDatabase();