import mongoose, { Document, Schema, Model } from "mongoose";

interface ISubCategory extends Document {
  name: string;
  slug: string;
  category: mongoose.Schema;
}

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "subCategory name is required"],
      unique: [true, "subCategory name must be unique"],
      minlength: [2, "subCategory name must be at least 2 characters"],
      maxlength: [50, "subCategory name must be at most 50 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "subCategory must belong to a category"],
    },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
