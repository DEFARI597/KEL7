const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cineblue",
});

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

const JWT_SECRET =
  "a6dbaefd3ca22401e2dd9e187c877f94f098a2748d3e4d6b99235efbad733322"; // Ganti dengan kunci rahasia Anda

//login route
app.post("/login/authenticate", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      return res.json({
        success: false,
        error: "Database error",
      });
    }

    const user = result[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: 86400,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  });
});

//Route to get all posts
app.get("/login", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

//Route to get a post by id
app.get("/login/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.json(err);
    return res.json(result[0]);
  });
});

//Route to create a new post
app.post("/login/", async (req, res) => {
  const { username, email, password } = req.body;

  // Hash password before storing
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashedPassword, password],
    (err, result) => {
      if (err) return res.json({ success: false, message: err.message });
      return res.json({
        success: true,
        message: "User created successfully!",
      });
    }
  );
});

//Route to update a post
app.put("/login/reset-password", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "UPDATE users SET password = ? WHERE email = ?",
    [hashedPassword, email],
    (err, result) => {
      if (err) {
        return res.json({ success: false, error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.json({ success: false, message: "Email not found" });
      }
      return res.json({
        success: true,
        message: "Password updated successfully!",
      });
    }
  );
});

//Route to delete a post
app.delete("/login/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.json(err);
    return res.json("User deleted successfully!");
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
