const mongoose = require('mongoose');
const slugify = require('slugify');
const SubCategory = require('./subCategory');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category Name is required'],
      unique: true,
      minlength: [3, 'Category Name must be at least 3 characters'],
      maxlength: [50, 'Category Name must be at most 50 characters'],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
    description: {
      type: String,
      minlength: [10, 'Category Description must be at least 10 characters'],
      maxlength: [500, 'Category Description must be at most 500 characters'],
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/150',
    },
  },
  { timestamps: true },
);

// ✅ **Middleware to generate slug before saving**
categorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

// ✅ **Middleware to delete related subcategories when category is deleted**
categorySchema.pre('findOneAndDelete', async function (next) {
  const category = await this.model.findOne(this.getQuery());
  if (category) {
    await SubCategory.deleteMany({ category: category._id }); // Delete subcategories
  }
  next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
