const { AxiosJob } = require("../helper/fetchdata");
const db = require("../models/index");

const addType = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
    };
    const business = await db.typeOfBusiness.create(data);
    res.status(200).json(business);
  } catch (error) {
    next(error);
  }
};
const getType = async (req, res, next) => {
  const { id } = req.params;
  try {
    // const business = await db.typeOfBusiness.findAll({ where: { id } });
    const business = await db.typeOfBusiness.findAll();
    res.status(200).json(business);
  } catch (error) {
    next(error);
  }
};
const updateType = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = {
      name: req.body.name,
    };
    const business = await db.typeOfBusiness.update(data, { where: { id } });
    res.status(200).json(business);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addType,
  getType,
  updateType,
};
