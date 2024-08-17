import mongoose, { Document, Schema, Model } from "mongoose";

//Interface
interface Icategory extends Document {
  title: string;
  slug: string;
  image: string;
}
//Schema
const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "category title is required"],
      unique: [true, "category title must be unique"],
      minlength: [3, "category title must be at least 3 characters"],
      maxlength: [32, "category title must be at most 32 characters"],
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
