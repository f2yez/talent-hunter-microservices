const db = require("../models/index");

const getSkills = async (req, res, next) => {
  try {
    const skills = await db.Skills.findAll();
    res.status(200).json(skills);
  } catch (error) {
    next(error);
  }
};
const addSkills = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      parentId: req.body.parentId,
    };

    const skills = await db.Skills.create(data);

    res.status(200).json(skills);
  } catch (error) {
    next(error);
  }
};
const getASkills = async (req, res, next) => {
  const { id } = req.params;

  try {
    const skills = await db.Skills.findAll({
      where: {
        id,
      },
    });

    res.status(200).json(skills);
  } catch (error) {
    next(error);
  }
};
const updateSkills = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = {
      name: req.body.name,
      parentId: req.body.parentId,
    };
    const skills = await db.Skills.update(data, {
      where: {
        id,
      },
    });

    res.status(200).json(skills);
  } catch (error) {
    next(error);
  }
};
const deleteSkills = async (req, res, next) => {
  const { id } = req.params;

  try {
    const skills = await db.Skills.destroy({
      where: {
        id,
      },
    });

    res.status(200).json(skills);
  } catch (error) {
    next(error);
  }
};

const getASkillsByParentId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const skills = await db.Skills.findAll({
      where: {
        parentId: id,
      },
    });

    res.status(200).json(skills);
  } catch (error) {
    next(error);
  }
};

const getSkillsJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const dataSkills = await db.Skills.findAll({
      attributes: ["name"],
      parentId: id,
    });

    const data = {
      name: JSON.parse(dataSkills[0].dataValues.name),
    };

    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSkills,
  addSkills,
  getASkills,
  updateSkills,
  deleteSkills,
  getASkillsByParentId,
  getSkillsJob,
};
