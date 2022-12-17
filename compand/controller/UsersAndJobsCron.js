const { AxiosJob } = require("../helper/fetchdata");
const db = require("../models/index");
const { parse } = require("json2csv");
const { sendEmail } = require("../helper/EmailJob");
const { AxiosUser } = require("../helper/AxiosUser");

const cronJbos = async (req, res, next) => {
  try {
    const jobs = await AxiosJob.get("/compare/job");

    await db.UsersAndJobsCron.destroy({ truncate: true });

    const data = await db.UsersAndJobsCron.bulkCreate(jobs.data);

    res.json(data);
  } catch (error) {
    next(error);
  }
};
const makeGroubing = async (req, res, next) => {
  try {
    const data = await db.UsersAndJobsCron.findAll({
      attributes: ["JobId", "companyIdy"],
      group: ["JobId", "companyIdy"],
    });

    for (let i = 0; i < data.length; i++) {
      const Jobdata = [];
      const email = await AxiosUser.get(
        `/getEmailForACompny/${data[i].dataValues.companyIdy}`
      );

      const Jobdataa = await db.UsersAndJobsCron.findAll({
        attributes: ["JobTitle", "userName"],
        where: {
          JobId: data[i].dataValues.JobId,
        },
      });
      for (let j = 0; j < Jobdataa.length; j++) {
        Jobdata.push({
          JobTitle: Jobdataa[j].dataValues.JobTitle,
          userName: Jobdataa[j].dataValues.userName,
          JobId: Jobdataa[j].dataValues.JobId,
        });
      }
      //convert data from json to csv
      const csv = parse(Jobdata, ["JobTitle", "userName"]);
      //function for sending email
      sendEmail(email.data[0].email, csv);
    }

    res.send("data");
  } catch (error) {
    next(error);
  }
};
module.exports = { cronJbos, makeGroubing };
