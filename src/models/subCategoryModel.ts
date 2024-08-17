import mongoose, { Document, Schema, Model } from "mongoose";

interface ISubCategory extends Document {
  title: string;
  slug: string;
  category: mongoose.Schema;
}

const subCategorySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "subCategory title is required"],
      unique: [true, "subCategory title must be unique"],
      minlength: [2, "subCategory title must be at least 2 characters"],
      maxlength: [50, "subCategory title must be at most 50 characters"],
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

const SubCategory = mongoose.model<ISubCategory>(
  "SubCategory",
  subCategorySchema
);

export default SubCategory;
