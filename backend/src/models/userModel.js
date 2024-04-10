import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const animeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  coverImage: { type: String, required: true },
  score: { type: Number, required: true },
  link: { type: String, required: true },
});

const publicListSchema = new mongoose.Schema({
  listTitle: { type: String, required: true },
  animes: { type: [animeSchema] },
  hits: { type: Number, required: true, default: 0 },
});
const privateListSchema = new mongoose.Schema({
  listTitle: { type: String, required: true },
  animes: { type: [animeSchema] },
});

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    publicLists: { type: [publicListSchema] },
    privateLists: { type: [privateListSchema] },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
