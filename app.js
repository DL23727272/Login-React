const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./mongo"); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Signup endpoint
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            // User already exists
            return res.status(409).json("User already exists");
        } else {
            // Create a new user
            const newUser = new User({ email, password });
            await newUser.save();
            return res.status(201).json("User created successfully");
        }
    } catch (e) {
        console.error("Error signing up:", e.message);
        return res.status(500).json("Error signing up: " + e.message); // Internal server error
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email, password });

        if (existingUser) {
            return res.status(200).json("exist"); // User exists
        } else {
            return res.status(404).json("notExist"); // User does not exist
        }
    } catch (e) {
        console.error("Error logging in:", e.message);
        return res.status(500).json("Error logging in: " + e.message); // Internal server error
    }
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
