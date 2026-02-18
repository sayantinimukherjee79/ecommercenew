import Category from "../models/categoryModel.js"; // ✅ import ES module

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const { name, slug, description } = req.body;

        // Check if category with same name or slug exists
        const existingCategory = await Category.findOne({ $or: [{ name }, { slug }] });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        const category = new Category({ name, slug, description });
        await category.save();

        res.status(201).json({ success: true, category });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all categories

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories); // ✅ ARRAY
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};


// Get single category by ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ success: true, category });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update category
export const updateCategory = async (req, res) => {
    try {
        const { name, slug, description } = req.body;
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, slug, description },
            { new: true } // return updated document
        );

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ success: true, category });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete category
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
