const axios = require("axios");

const addCompany = async (data) => {
  const returnValue = await axios.post(
    "http://localhost:5000/api/company",
    data
  );

  return returnValue;
};

module.exports = {
  addCompany,
};
