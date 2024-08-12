import mongoose, { Document, Schema, Model } from "mongoose";

//Interface
interface Icategory extends Document {
  name: string;
  slug: string;
  image: string;
}
//Schema
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "category name is required"],
      unique: [true, "category name must be unique"],
      minlength: [3, "category name must be at least 3 characters"],
      maxlength: [32, "category name must be at most 32 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
//Model
const Category: Model<Icategory> = mongoose.model<Icategory>(
  "Category",
  categorySchema
);

export default Category;
