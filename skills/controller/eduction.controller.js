const db = require("../models/index");

const getEduction = async (req, res, next) => {
  const { id } = req.userId;
  try {
    const eduction = await db.Education.findAll({
      where: {
        parentId: id,
      },
    });
    res.status(200).json(eduction);
  } catch (error) {
    next(error);
  }
};

const addEduction = async (req, res, next) => {
  const { id } = req.userId;
  try {
    const data = {
      parentId: id,
      degree: req.body.degree,
      university: req.body.university,
      startDate: req.body.startDate,
      EndDate: req.body.EndDate,
    };
    const eduction = await db.Education.create(data);
    res.status(200).json(eduction);
  } catch (error) {
    next(error);
  }
};
const updateEduction = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = {
      degree: req.body.degree,
      university: req.body.university,
      startDate: req.body.startDate,
      EndDate: req.body.EndDate,
    };
    const eduction = await db.Education.update(data, { where: { id } });
    res.status(200).json(eduction);
  } catch (error) {
    next(error);
  }
};

const deleteEduction = async (req, res, next) => {
  const { id } = req.params;
  try {
    const eduction = await db.Education.destroy({ where: { id } });
    res.status(200).json(eduction);
  } catch (error) {
    next(error);
  }
};

const getAEductionById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const eduction = await db.Education.findAll({ where: { id } });
    res.status(200).json(eduction);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEduction,
  addEduction,
  updateEduction,
  deleteEduction,
  getAEductionById,
};
