import createError from "../../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma.js";

export const register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      createError(409, "Email already exist!!!");
    }

    // hash password
    const hashPassword = bcrypt.hashSync(password, 10);
    // save to database
    const result = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashPassword,
      },
    });

    res.json({ message: "Register Success!!!" });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // check email in db
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    // if not found trow error
    if (!user) {
      createError(401, "Email or Password is Invalid!!");
    }
    // hash and compare password
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      createError(401, "Email or Password is Invalid!!");
    }

    // create token from data user
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });
    // for print token
    // console.log(token);

    // res with payload and token
    res.json({
      message: "Login Success!!!",
      payload: payload,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
