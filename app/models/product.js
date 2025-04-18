const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product Name is required'],
      trim: true,
      minlength: [3, 'Product Name must be at least 3 characters'],
      maxlength: [100, 'Product Name must be at most 50 characters'],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Product Description is required'],
      trim: true,
      minlength: [10, 'Product Description must be at least 10 characters'],
      maxlength: [2000, 'Product Description must be at most 500 characters'],
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Product Price is required'],
      trim: true,
      min: [1, 'Product Price must be at least 1'],
      max: [100000, 'Product Price must be at most 100000'],
    },
    priceAfterDiscount: {
      type: Number,
      default: 1,
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount must be a positive number'],
      max: [100, 'Discount must be less than 100'],
    },
    color: [String],

    images: [
      {
        type: String,
      },
    ],
    imageCover: {
      type: String,
      required: [true, 'Cover image is required'],
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: [true, 'Product SubCategory is required'],
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// mongoose query middleware
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'subCategory',
    select: 'name',
  });
  next();
});

module.exports = mongoose.model('Product', productSchema);
