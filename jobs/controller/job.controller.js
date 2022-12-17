const resltJob = require("../helper/compare");
const { AxiosUser } = require("../helper/fetchdata");
const db = require("../models/index");
const { sendEmail } = require("../helper/EmailJob");
const { parse } = require("json2csv");

const addJob = async (req, res, next) => {
  try {
    const data = {
      companyIdy: req.body.companyIdy,
      title: req.body.title,
      description: req.body.description,
      JobType: JSON.stringify(req.body.JobType),
      level: JSON.stringify(req.body.level),
      skills: JSON.stringify(req.body.skills),
      experience: req.body.experience,
      min: req.body.min,
      max: req.body.max,
      currency: req.body.currency,
      JobLocation: req.body.JobLocation,
      IsRemotly: req.body.IsRemotly,
      draft: req.body.draft,
      releaseJob: false,
    };
    const newJob = await db.Job.create(data);
    res.status(200).json(newJob);
  } catch (error) {
    next(error);
  }
};

const getAJob = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await db.Job.findAll({
      where: {
        id,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getAJobByComapny = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await db.Job.findAll({
      where: {
        companyIdy: id,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getAJobByComapnyDraft = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await db.Job.findAll({
      where: {
        companyIdy: id,
        draft: false,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const makeRelase = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [updata] = await db.Job.update(
      { releaseJob: true },
      { where: { id } }
    );

    if (updata) {
      const jobs = await db.Job.findAll({
        attributes: [
          "id",
          "companyIdy",
          "level",
          "skills",
          "JobType",
          "title",
          "IsRemotly",
          "JobLocation",
        ],
        where: {
          draft: true,
          releaseJob: true,
          id: id,
        },
      });

      if (jobs.length > 0) {
        const userData = await AxiosUser("/getAllUsersForJobs");

        const afterCompar = resltJob(jobs, userData.data);

        const email = await AxiosUser.get(
          `/getEmailForACompny/${jobs[0].dataValues.companyIdy}`
        );
        // conver tata
        const jobsSend = [];
        for (let i = 0; i < afterCompar.length; i++) {
          jobsSend.push({
            JobTitle: afterCompar[i].JobTitle,
            userName: afterCompar[i].userName,
          });
        }
        const csv = parse(jobsSend, ["JobTitle", "userName"]);
        sendEmail(email.data[0].email, csv);
        const updataed = true;
        res.status(200).json([...afterCompar, updataed]);
      } else {
        res.status(200).json(updata);
      }
    }
  } catch (error) {
    next(error);
  }
};

const getJob = async (req, res, next) => {
  try {
    const data = await db.Job.findAll();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getJobForAll = async (req, res, next) => {
  try {
    const data = await db.Job.findAll({
      where: {
        releaseJob: true,
        draft: true,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  const { id } = req.params;
  try {
    const count = await db.Job.count({
      where: { companyIdy: req.body.companyIdy },
    });

    const data = {
      companyIdy: req.body.companyIdy,
      title: req.body.title,
      description: req.body.description,
      JobType: JSON.stringify(req.body.JobType),
      level: JSON.stringify(req.body.level),
      skills: JSON.stringify(req.body.skills),
      experience: req.body.experience,
      min: req.body.min,
      max: req.body.max,
      currency: req.body.currency,
      JobLocation: req.body.JobLocation,
      IsRemotly: req.body.IsRemotly,
      draft: req.body.draft,
      releaseJob: count >= 5 ? true : false,
      approve: req.body.approve,
      privacy: req.body.privacy,
    };

    const [Updateddata] = await db.Job.update(data, {
      where: {
        id: id,
      },
    });

    if (Updateddata) {
      const jobs = await db.Job.findAll({
        attributes: [
          "id",
          "companyIdy",
          "level",
          "skills",
          "JobType",
          "title",
          "IsRemotly",
          "JobLocation",
        ],
        where: {
          draft: true,
          releaseJob: true,
          id: id,
        },
      });

      if (jobs.length > 0) {
        const userData = await AxiosUser("/getAllUsersForJobs");

        const afterCompar = resltJob(jobs, userData.data);

        const email = await AxiosUser.get(
          `/getEmailForACompny/${req.body.companyIdy}`
        );
        // conver tata
        const jobsSend = [];
        for (let i = 0; i < afterCompar.length; i++) {
          jobsSend.push({
            JobTitle: afterCompar[i].JobTitle,
            userName: afterCompar[i].userName,
          });
        }

        // //afterCompar
        // const io = req.io;

        // // io.on("connection", (socket) => {
        // //   // console.log(socket);
        // // });
        // io.emit("data", afterCompar);

        const csv = parse(jobsSend, ["JobTitle", "userName"]);
        sendEmail(email.data[0].email, csv);

        // res.status(200).json({ ...afterCompar, updated: true });
        const updataed = true;
        res.status(200).json([...afterCompar, updataed]);
      } else {
        res.status(200).json(Updateddata);
      }
    }
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  const { id } = req.params;

  try {
    const Updateddata = await db.Job.destroy({
      where: {
        id,
      },
    });
    res.status(200).json(Updateddata);
  } catch (error) {
    next(error);
  }
};

const compare = async (req, res, next) => {
  try {
    const dataJobsForCompare = [];
    const jobs = await db.Job.findAll({
      attributes: [
        "id",
        "companyIdy",
        "level",
        "skills",
        "JobType",
        "title",
        "IsRemotly",
        "JobLocation",
      ],
      where: {
        draft: true,
        releaseJob: true,
      },
    });
    for (let i = 0; i < jobs.length; i++) {
      dataJobsForCompare.push({
        id: jobs[i].dataValues.id,
        title: jobs[i].dataValues.title,
        companyIdy: jobs[i].dataValues.companyIdy,
        level: JSON.parse(jobs[i].dataValues.level),
        skills: JSON.parse(jobs[i].dataValues.skills),
        JobType: JSON.parse(jobs[i].dataValues.JobType),
        IsRemotly: jobs[i].dataValues.IsRemotly,
        JobLocation: jobs[i].dataValues.JobLocation,
      });
    }

    const userData = await AxiosUser("/getAllUsersForJobs");

    const afterCompar = resltJob(dataJobsForCompare, userData.data);
    // const allData = [...dataJobsForCompare, ...userData.data];
    res.json(afterCompar);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addJob,
  getAJob,
  getJob,
  updateJob,
  deleteJob,
  getAJobByComapny,
  makeRelase,
  getAJobByComapnyDraft,
  compare,
  getJobForAll,
};
