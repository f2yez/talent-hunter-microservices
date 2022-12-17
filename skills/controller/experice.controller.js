const db = require("../models/index");

//get all data by users
const getExperience = async (req, res, next) => {
  const { id } = req.userId;
  try {
    const experience = await db.Experience.findAll({ where: { parentId: id } });
    res.status(200).json(experience);
  } catch (error) {
    next(error);
  }
};

const addExperience = async (req, res, next) => {
  const { id } = req.userId;
  try {
    const data = {
      parentId: id,
      company: req.body.company,
      position: req.body.position,
      Description: req.body.Description,
      startMonthDate: req.body.startMonthDate,
      startYearDate: req.body.startYearDate,
      EndMonthDate: req.body.EndMonthDate,
      EndYearDate: req.body.EndYearDate,
    };
    const experience = await db.Experience.create(data);
    res.status(200).json(experience);
  } catch (error) {
    next(error);
  }
};
const updateExperience = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = {
      company: req.body.company,
      position: req.body.position,
      Description: req.body.Description,
      startMonthDate: req.body.startMonthDate,
      startYearDate: req.body.startYearDate,
      EndMonthDate: req.body.EndMonthDate,
      EndYearDate: req.body.EndYearDate,
    };
    const experience = await db.Experience.update(data, { where: { id } });
    res.status(200).json(experience);
  } catch (error) {
    next(error);
  }
};
const deleteExperience = async (req, res, next) => {
  const { id } = req.params;
  try {
    const experience = db.Experience.destroy({ where: { id } });
    res.status(200).json(experience);
  } catch (error) {
    next(error);
  }
};
const getAExperience = async (req, res, next) => {
  const { id } = req.params;
  try {
    const experience = await db.Experience.findAll({
      where: {
        id,
      },
    });
    res.status(200).json(experience);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

module.exports = {
  addExperience,
  getExperience,
  updateExperience,
  deleteExperience,
  getAExperience,
};
