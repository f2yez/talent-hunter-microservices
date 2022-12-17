const db = require("../models/index");

const addTalent = async (req, res, next) => {
  const { birthData, jobTyp, experienceLevel, Availability } = req.body;
  try {
    const data = { birthData, jobTyp, experienceLevel, Availability };

    const newTalent = await db.Talent.create(data);

    res.status(200).json(newTalent);
  } catch (error) {
    next(error);
  }
};
const getTalent = async (req, res, next) => {
  const { id } = req.params;

  try {
    const talent = await db.Talent.findAll({
      where: {
        id,
      },
    });

    res.status(200).json(talent);
  } catch (error) {
    next(error);
  }
};

const eideTalent = async (req, res, next) => {
  const { id } = req.params;
  const { birthData, jobTyp, experienceLevel, Availability } = req.body;

  try {
    const talent = await db.Talent.update(
      { birthData, jobTyp, experienceLevel, Availability },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({ talent, id });
  } catch (error) {
    next(error);
  }
};
const getTalentForJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const talent = await db.Talent.findAll({
      attributes: ["jobTyp", "experienceLevel", "Availability"],
      where: {
        Availability: "Looking for job",
        id,
      },
    });
    const data = {
      experienceLevel: JSON.parse(talent[0].dataValues.experienceLevel),
      jobTyp: JSON.parse(talent[0].dataValues.jobTyp),
    };

    res.json(data);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  addTalent,
  getTalent,
  eideTalent,
  getTalentForJob,
};
