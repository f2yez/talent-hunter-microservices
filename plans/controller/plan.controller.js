const db = require("../models/index");

const addPlan = async (req, res, next) => {
  const { name } = req.body;
  try {
    const plan = await db.Plan.create({ name });
    res.status(200).json(plan);
  } catch (error) {
    next(error);
  }
};
const getAPlan = async (req, res, next) => {
  const { id } = req.params;
  try {
    const plan = await db.Plan.findAll({}, { where: { id } });
    res.status(200).json(plan);
  } catch (error) {
    next(error);
  }
};
const getPlans = async (req, res, next) => {
  try {
    const plan = await db.Plan.findAll({});
    res.status(200).json(plan);
  } catch (error) {
    next(error);
  }
};
const EditPlan = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    const plan = await db.Plan.update({ name }, { where: { id } });
    res.status(200).json(plan);
  } catch (error) {
    next(error);
  }
};
const deletePlan = async (req, res, next) => {
  const { id } = req.params;
  try {
    const plan = await db.Plan.destroy({ where: { id } });
    res.status(200).json(plan);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addPlan,
  getAPlan,
  getPlans,
  EditPlan,
  deletePlan,
};