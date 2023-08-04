import validator from "indicative/validator.js";
import { errorJson, successJson } from "./Utils/JsonRes.js";
import UserModel from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  //check email
  const findUser = await UserModel.findOne({ email });
  if (!findUser) {
    return res.json(errorJson("email_not_found"));
  }
  // verify password
  const verifyPassword = bcrypt.compareSync(password, findUser.password);
  if (!verifyPassword) {
    return res.json(errorJson("wrong_password"));
  }
  // jwt processs
  const jwt_secret = process.env.JWT_SECRET;
  const access_token = jwt.sign(
    { name: findUser.name, id: findUser._id },
    jwt_secret
  );
  res.cookie("access_token", access_token, { httpOnly: true });
  return res.json(successJson("success"));
};

export const register = async (req, res) => {
  //check email alaready exist
  const { name, email, password } = req.body;
  const findUser = await UserModel.findOne({ email });

  if (findUser) {
    return res.json(errorJson("email_exist", null));
  }
  validator
    .validateAll(req.body, {
      name: "required",
      email: "required|email",
      password: "required|min:2|max:30",
    })
    .then(async () => {
      //hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPass = bcrypt.hashSync(password, salt);
      // insert data
      const createduser = await UserModel.create({
        name,
        email,
        password: hashedPass,
      });
      // jwt process  name
      const jwt_secret = process.env.JWT_SECRET;
      const access_token = jwt.sign({ name, id: createduser._id }, jwt_secret);
      res.cookie("access_token", access_token, { httpOnly: true });
      return res.json(successJson("success"));
    })
    .catch((e) => {
      return res.json(errorJson("validate_error", e));
    });
};
