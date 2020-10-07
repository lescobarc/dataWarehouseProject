const express = require("express");
const app = express();
app.use(express.json());

//Users:

users = [
    {
        name: "Veronica",
        lastname: "Kt",
        email: "vera@email.com",
        profile: {
                admin: true,
                contact: false,
        },
        password: "1234"
    }
]