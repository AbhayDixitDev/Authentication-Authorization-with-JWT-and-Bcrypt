const express = require("express");
const app = express();
const port = 3000;
const userModel = require("./models/user");

const cookieParser = require("cookie-parser");
const path = require("path");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, "your-secret-key", { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/create", async (req, res) => {
  const { username, email, password, age } = req.body;
  const createdUser = await userModel({ username, email, password, age });
  res.send(createdUser);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

