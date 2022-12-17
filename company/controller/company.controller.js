const db = require("../models/index");
const { AxiosCompand } = require("../helper/fetchdataCompand");

const addCompany = async (req, res, next) => {
  const { website, address, noOfEmployees, YearEstablishes, name } = req.body;
  try {
    const returnValue = await AxiosCompand.post(`/typeOfBusiness`, { name });
    var typeOfBusiness = returnValue.data.id;

    const data = {
      website,
      address,
      noOfEmployees,
      YearEstablishes,
      typeOfBusiness,
    };

    const newCompany = await db.Company.create(data);

    res.status(200).json(newCompany);
  } catch (error) {
    next(error);
  }
};

const getCompany = async (req, res, next) => {
  const { id } = req.params;

  try {
    const company = await db.Company.findAll({
      where: {
        id,
      },
    });

    const returnValue = await AxiosCompand.get(
      `/typeOfBusiness/${company[0].typeOfBusiness}`
    );

    const typeOfBusiness = returnValue.data[0]?.name;

    const data = {
      typeOfBusiness,
      address: company[0].dataValues.address,
      noOfEmployees: company[0].dataValues.noOfEmployees,
      website: company[0].dataValues.website,
      YearEstablishes: company[0].dataValues.YearEstablishes,
    };

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const eideCompany = async (req, res, next) => {
  const { id } = req.params;
  const { website, address, noOfEmployees, YearEstablishes, name } = req.body;

  try {
    const getCompany = await db.Company.findAll({
      where: {
        id,
      },
    });

    const returnValue = await AxiosCompand.put(
      `/typeOfBusiness/${getCompany[0].dataValues.typeOfBusiness}`,
      { name }
    );

    const data = {
      website,
      address,
      noOfEmployees,
      YearEstablishes,
    };

    const company = await db.Company.update(
      { ...data },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).json(company);
  } catch (error) {
    next(error);
  }
};

const addCompanyee = (req, res, next) => {
  const m = "mahmouldyy";
  res.status(200).json({ massages: "Hellod world!", m });
};

const getACompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await db.Company.findAll({ where: { id } });
    res.status(200).json(data);
  } catch (error) {
    res.status(401);
    next(error);
  }
};

module.exports = {
  addCompany,
  getCompany,
  eideCompany,
  addCompanyee,
  getACompany,
};
