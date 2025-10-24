import dotenv from "dotenv"

dotenv.config({
    path: "./.env",
})

const my_user_name = process.env.user_name;

console.log(`Hello ${my_user_name}`);