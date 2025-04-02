const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand Name is required'],
      unique: [true, 'Brand Name is unique'],
      minlength: [3, 'Brand Name must be at least 3 characters'],
      maxlength: [50, 'Brand Name must be at most 50 characters'],
    },
    slug: {
      type: String,
      lowercase: true,
      // Generate a unique slug from the name
      generateSlug(doc) {
        const slug = doc.name.toLowerCase().replace(/\s+/g, '-');
        return slug;
      },
    },
    description: {
      type: String,
      required: false,
      minlength: [10, 'Brand Description must be at least 10 characters'],
      maxlength: [500, 'Brand Description must be at most 500 characters'],
    },
    image: {
      type: String,
      required: false,
      default: 'https://via.placeholder.com/150',
    },
  },
  { timestamps: true },
);

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
