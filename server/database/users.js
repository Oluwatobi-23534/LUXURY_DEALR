import bcrypt from 'bcryptjs'

const users = [
  {
    username: "John wick",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    username: "Sean wick",
    email: "sean@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    username: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
];

export default users;