import Temple from "../models/Temple.js";

import slugify from "slugify";

export const createTemple = async (req, res) => {
  try {
    /* =========================
         GET CLOUDINARY URLs
      ========================= */

    const imageUrls = req.files.map((file) => file.path);

    /* =========================
         CREATE TEMPLE
      ========================= */

    const temple = await Temple.create({
      templeName: req.body.templeName,

      slug: `${slugify(req.body.templeName, {
        lower: true,
        strict: true,
      })}-${Date.now()}`,

      deity: req.body.deity,

      state: req.body.state,

      city: req.body.city,

      history: req.body.history,

      architectureStyle: req.body.architectureStyle,

      dynasty: req.body.dynasty,

      builtYear: req.body.builtYear,

      timings: req.body.timings,

      featured: req.body.featured,

      dressCode: req.body.dressCode,

      rating: req.body.rating,

      categories: Array.isArray(req.body.categories)
        ? req.body.categories
        : [req.body.categories],

      festivals: Array.isArray(req.body.festivals)
        ? req.body.festivals
        : [req.body.festivals],

      location: {
        latitude: Number(req.body.latitude),

        longitude: Number(req.body.longitude),
      },

      images: imageUrls,
    });

    res.status(201).json(temple);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTemples = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 100;

    const keyword = req.query.keyword
      ? {
          $or: [
            {
              templeName: {
                $regex: req.query.keyword,
                $options: "i",
              },
            },
            {
              categories: {
                $regex: req.query.keyword,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const category = req.query.category
      ? {
          categories: req.query.category,
        }
      : {};

    const state = req.query.state
      ? {
          state: req.query.state,
        }
      : {};

    const query = {
      ...keyword,
      ...category,
      ...state,
    };

    const count = await Temple.countDocuments(query);

    const temples = await Temple.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      temples,
      page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTempleById = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        message: "Temple not found",
      });
    }

    res.json(temple);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteTemple = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        message: "Temple not found",
      });
    }

    await temple.deleteOne();

    res.json({
      message: "Temple deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   UPDATE TEMPLE
========================= */

export const updateTemple = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        message: "Temple not found",
      });
    }

    /* =========================
   HANDLE IMAGES
========================= */

    let imageUrls = [];

    /* KEEP ONLY REMAINING OLD IMAGES */

    if (req.body.existingImages) {
      imageUrls = JSON.parse(req.body.existingImages);
    }

    /* ADD NEW UPLOADED IMAGES */

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => file.path);

      imageUrls = [...imageUrls, ...newImages];
    }

    /* =========================
       UPDATE TEMPLE
    ========================= */

    temple.templeName = req.body.templeName || temple.templeName;

    temple.slug = req.body.templeName
      ? `${slugify(req.body.templeName, {
          lower: true,
          strict: true,
        })}-${Date.now()}`
      : temple.slug;

    temple.deity = req.body.deity || temple.deity;

    temple.state = req.body.state || temple.state;

    temple.city = req.body.city || temple.city;

    temple.history = req.body.history || temple.history;

    temple.architectureStyle =
      req.body.architectureStyle || temple.architectureStyle;

    temple.dynasty = req.body.dynasty || temple.dynasty;

    temple.builtYear = req.body.builtYear || temple.builtYear;

    temple.timings = req.body.timings || temple.timings;

    temple.featured =
      req.body.featured !== undefined ? req.body.featured : temple.featured;

    temple.dressCode = req.body.dressCode || temple.dressCode;

    temple.rating = req.body.rating || temple.rating;

    temple.categories = req.body.categories
      ? Array.isArray(req.body.categories)
        ? req.body.categories
        : [req.body.categories]
      : temple.categories;

    temple.festivals = req.body.festivals
      ? Array.isArray(req.body.festivals)
        ? req.body.festivals
        : [req.body.festivals]
      : temple.festivals;

    temple.location = {
      latitude: Number(req.body.latitude) || temple.location.latitude,

      longitude: Number(req.body.longitude) || temple.location.longitude,
    };

    temple.images = imageUrls;

    /* =========================
       SAVE UPDATED TEMPLE
    ========================= */

    const updatedTemple = await temple.save();

    res.json(updatedTemple);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
