import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.fields;
    const { images, icons } = req.files;
    const banners = req.files.banners ? JSON.parse(req.files.banners) : [];

    switch (true) {
      case !name:
        return res.status(401).send({ error: "Category Name is Required" });
      case icons && icons.size > 1000000:
        return res
          .status(500)
          .send({ error: "Icon is Required and should be less than 1mb size" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res
        .status(200)
        .send({ success: true, message: "Category Already Exists" });
    }
    const category = new categoryModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (icons) {
      category.icons.data = fs.readFileSync(icons.path);
      category.icons.contentType = icons.type;
    }
    if (images) {
      category.images.data = fs.readFileSync(images.path);
      category.images.contentType = images.type;
    }
    // if (banners) {
    //   category.banners.data = fs.readFileSync(banners.path);
    //   category.banners.contentType = banners.type;
    // }
    if (banners && banners.length > 0) {
      category.banners = banners.map((banner) => ({
        data: fs.readFileSync(banner.path),
        contentType: banner.type,
        title: banner.title,
        description: banner.description,
      }));
    }

    await category.save();
    res.status(201).send({
      success: true,
      message: "New Category Created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

//updateCategoryController
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const { banners } = req.fields;
    const { images, icons } = req.files;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name), icons, images },
      { new: true }
    );
    if (icons) {
      products.icons.data = fs.readFileSync(icons.path);
      products.icons.contentType = icons.type;
    }
    if (images) {
      products.images.data = fs.readFileSync(images.path);
      products.images.contentType = images.type;
    }
    // if (banners) {
    //   products.banners.data = fs.readFileSync(banners.path);
    //   products.banners.contentType = banners.type;
    // }
    if (banners) {
      category.banners = JSON.parse(banners).map((banner) => ({
        data: fs.readFileSync(banner.path),
        contentType: banner.type,
        title: banner.title,
        description: banner.description,
      }));
    }
    await category.save();

    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Updating Category",
    });
  }
};

//get ALL category
export const categoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Fetching All Categories",
    });
  }
};
//category icons controller
export const categoryIconsController = async (req, res) => {
  try {
    const category = await categoryModel
      .findById(req.params.id)
      .select("icons");
    if (category.icons.data) {
      res.set("Content-type", category.icons.contentType);
      return res.status(200).send(category.icons.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching Category icons",
      error,
    });
  }
};
//category images controller
export const categoryImagesController = async (req, res) => {
  try {
    const category = await categoryModel
      .findById(req.params.id)
      .select("images");
    if (category.images.data) {
      res.set("Content-type", category.images.contentType);
      return res.status(200).send(category.images.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching Category images",
      error,
    });
  }
};

export const categoryBannersController = async (req, res) => {
  try {
    const category = await categoryModel
      .findById(req.params.id)
      .select("banners");

    if (category.banners && category.banners.length > 0) {
      res.set("Content-Type", category.banners[0].contentType);
      return res.status(200).send(
        category.banners.map((banner) => ({
          data: banner.data,
          contentType: banner.contentType,
          title: banner.title,
          description: banner.description,
        }))
      );
    } else {
      res.status(404).send({ message: "No banners found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching Category Banners",
      error,
    });
  }
};

//single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Single Category Details",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Fetching single category",
    });
  }
};

//delete category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Deleting Category",
      error,
    });
  }
};
