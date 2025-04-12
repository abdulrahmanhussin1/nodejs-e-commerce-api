const mongoose = require('mongoose');
const slugify = require('slugify');

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'subCategory Name is required'],
      unique: [true, 'subCategory Name is unique'],
      minlength: [3, 'subCategory Name must be at least 3 characters'],
      maxlength: [50, 'subCategory Name must be at most 50 characters'],
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
      minlength: [10, 'subCategory Description must be at least 10 characters'],
      maxlength: [
        500,
        'subCategory Description must be at most 500 characters',
      ],
    },
    image: {
      type: String,
      required: false,
      default: 'https://via.placeholder.com/150',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'category is required'],
    },
  },

  { timestamps: true },
);
// ✅ **Middleware to generate slug before saving**
subCategorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});
const SubCategory = mongoose.model('subCategory', subCategorySchema);

module.exports = SubCategory;
