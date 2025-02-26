import express from "express";
import generateFakeProduct from "./backend/faker/index.js";
import connectDB from "./backend/config/index.js";
import { Product, Store } from "./backend/schema/products.js";
import bcrypt from "bcrypt";
import { Users } from "./backend/schema/auth.js";
import morgan from "morgan";

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
// This will parse JSON objects in the request body

// Use morgan middleware for logging requests
// app.use(morgan('dev')); // The 'dev' format logs the method, URL, status code, and response time

const PORT = 4000;
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`); // Logs the HTTP method and URL
  next(); // Move to the next middleware/route handler
});

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/generate-fake-product", async (req, res) => {
  const data = await generateFakeProduct(req, res, 20);
  Product.insertMany(data);
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const hashPassword = async (password) => {
  const saltRounds = 10; // Number of rounds to generate the salt (higher is more secure but slower)
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
  }
};

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const hashedPawword = await hashPassword(password);
    const user = new Users({
      name,
      email,
      password: hashedPawword,
      phone,
    });

    const isUser = await Users.findOne({ email: email });
    if (isUser) {
      res.status(400).json({ message: "User already exists" });
    }

    await user.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const isUser = await Users.findOne({ email: email });
   
    if (!isUser) {
      res.status(400).json({ message: "User not found" });
    }

    if (isUser) {
      const isValidPassword = await bcrypt.compare(password, isUser.password);
 
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid Password" });
      }

      return res
        .status(200)
        .json({
          message: "User logger in successfully",
          name: isUser.name,
          email: isUser.email,
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port " + "http://localhost:" + PORT);
});
