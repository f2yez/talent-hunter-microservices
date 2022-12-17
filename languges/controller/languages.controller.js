const db = require("../models/index");

const addLanguages = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      parentId: req.body.parentId,
    };
    const languages = await db.Language.create(data);
    res.status(200).json(languages);
  } catch (error) {
    next(error);
  }
};
const getLanguages = async (req, res, next) => {
  const { id } = req.params;
  try {
    const languages = await db.Language.findAll({ where: { parentId: id } });
    res.status(200).json(languages);
  } catch (error) {
    next(error);
  }
};
const updateLanguages = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = {
      name: req.body.name,
    };
    const languages = await db.Language.update(data, { where: { id } });
    res.status(200).json(languages);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addLanguages,
  getLanguages,
  updateLanguages,
};
