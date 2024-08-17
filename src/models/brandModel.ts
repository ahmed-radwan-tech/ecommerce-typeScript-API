import mongoose, { Document, Schema, Model } from "mongoose";

//Interface
interface Ibrand extends Document {
  title: string;
  slug: string;
  image: string;
}
//Schema
const brandSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "brand title is required"],
      unique: [true, "brand title must be unique"],
      minlength: [3, "brand title must be at least 3 characters"],
      maxlength: [32, "brand title must be at most 32 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

//mongoose middleware
brandSchema.pre(/^find/, function (this: mongoose.Query<any, any>, next) {
  this.populate({
    path: "category",
    select: "title",
  });
  next();
});

//Model
const Brand: Model<Ibrand> = mongoose.model<Ibrand>("Brand", brandSchema);

export default Brand;
