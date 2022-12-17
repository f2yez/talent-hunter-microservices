const path = require("path");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const messagebird = require("messagebird")(process.env.MESSAGEBIRD_API_KEY);

const db = require("../models/index");
const { hashPassword, comparePassword } = require("../helper/password");
const generateToken = require("../config/generateToken");
const { sendEmail } = require("../helper/EmailVerification");
const { forgotEmail } = require("../helper/forgot");
const { addCompany } = require("../api/api");
const { AxiosSkills } = require("../helper/fetchdataSkills");
const { AxiosSLanguages } = require("../helper/fetchdataLanguages");
const { AxiosPlan } = require("../helper/fetchdataPlan");
const { AxiosCompany } = require("../helper/fetchdataCompany");
const { AxiosTalent } = require("../helper/fetchdataTalent");
const { AxiosJob } = require("../helper/fetchdataJob");

// Email Verification

const Register = async (req, res, next) => {
  const { fullName, userName, email, password, type } = req.body;

  try {
    const userData = {
      fullName,
      userName,
      email,
      password: hashPassword(password),
      type,
      vitrified: false,
    };

    const user = await db.User.findOne({ where: { email } });
    if (user) {
      res.status(400);
      throw new Error("this user is exist");
    }
    const newUser = await db.User.create(userData);

    await sendEmail(newUser.fullName, newUser.email, newUser.id);

    res.status(200).json({
      fullName: newUser.fullName,
      userName: newUser.userName,
      email: newUser.email,
      type: newUser.type,
    });
  } catch (error) {
    next(error);
  }
};

//login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });

    if (!user || !comparePassword(password, user.password)) {
      res.status(400);
      throw new Error("email or password is not true");
    }

    if (!user.vitrified) {
      res.status(400);
      throw new Error("please make email verified");
    }

    const data = {
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      type: user.type,
      planId: user.planId,
      phone: user.phone,
      profileId: user.profileId,
      country: user.country,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: generateToken(user.id, user.type),
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

const emailVerified = async (req, res, next) => {
  const { id } = req.params;

  await db.User.update(
    { vitrified: true },
    {
      where: {
        id,
      },
    }
  );

  res.redirect(`${process.env.frontEnd}/SingIn`);
};

//send Email For Forgot
const sendForForgot = (req, res, next) => {
  const { email } = req.body;
  const token = generateToken(email, "1h");
  forgotEmail(email, token);
  res.status(200).json({
    msg: "cheek your email",
  });
};

// new Password
const newPassword = async (req, res, next) => {
  const { password, confirmPassword, token } = req.body;
  try {
    // token
    if (!token) {
      res.status(400);
      throw new Error("no token");
    }
    let reqToken = token.split(" ")[1];

    if (!reqToken) {
      res.status(400);
      throw new Error("Not authorized, no token");
    }

    //decodes token id
    const decoded = jwt.verify(reqToken, process.env.key);
    //
    if (password !== confirmPassword) {
      res.status(400);
      throw new Error("the password is not mach");
    }
    await db.User.update(
      { password: hashPassword(password) },
      {
        where: {
          email: decoded.id,
        },
      }
    );
    res.status(200).json({
      mag: "done",
    });
  } catch (error) {
    next(error);
  }
};
//
const githubCallback = (req, res, next) => {
  // The req.query object has the query params that were sent to this route.
  const requestToken = req.query.code;

  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${process.env.clientID}&client_secret=${process.env.clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    access_token = response.data.access_token;
    res.redirect("/api/user/success");
  });
};

//githubSuccess
const githubSuccess = (req, res, next) => {
  axios({
    method: "get",
    url: `https://api.github.com/user`,
    headers: {
      Authorization: "token " + access_token,
    },
  }).then((response) => {
    res.status(200).json({
      userData: response.data,
      Authorization: "token " + access_token,
    });
  });
};

const updata = async (req, res, next) => {
  const {
    fullName,
    userName,
    email,
    password,
    phone,
    country,
    website,
    type,
    address,
    noOfEmployees,
    YearEstablishes,
    birthData,
    name,
    typeOfBusiness,
    skills,
    languages,
    jobTyp,
    experienceLevel,
    description,
    Availability,
  } = req.body;

  try {
    const { id } = req.userId;

    if (type == "talent") {
      const returnValue = await AxiosSkills.get(`/parent/${id}`);
      if (returnValue.data[0]?.id) {
        await AxiosSkills.put(`/${returnValue.data[0].id}`, {
          name: JSON.stringify(skills),
        });
      } else {
        await AxiosSkills.post(`/`, {
          name: JSON.stringify(skills),
          parentId: id,
        });
      }

      const returnValueLanguage = await AxiosSLanguages.get(`/${id}`);

      if (returnValueLanguage.data[0]?.id) {
        await AxiosSLanguages.put(`/${returnValueLanguage.data[0].id}`, {
          name: JSON.stringify(languages),
        });
      } else {
        await AxiosSLanguages.post(`/`, {
          name: JSON.stringify(languages),
          parentId: id,
        });
      }
    }

    const isExist = await db.User.findAll({
      where: {
        id,
      },
    });

    const isExistID = isExist[0].dataValues.profileId;
    const isExistPlaneID = isExist[0].dataValues.planId;
    // const PhoneNumber = isExist[0].dataValues.phone;

    const companyData = {
      website,
      address,
      noOfEmployees,
      YearEstablishes,
      name: typeOfBusiness,
    };

    const talentData = {
      birthData,
      Availability,
      jobTyp: JSON.stringify(jobTyp),
      experienceLevel: JSON.stringify(experienceLevel),
    };

    const planData = {
      name,
    };

    if (isExistPlaneID) {
      const returnValue = await AxiosPlan.put(`/${isExistPlaneID}`, planData);
      var PlaneId = isExistPlaneID;
    }

    if (!isExistPlaneID) {
      const returnValue = await AxiosPlan.post(`/`, planData);
      var PlaneId = returnValue.data.id;
    }

    if (isExistID) {
      if (type == "company") {
        const returnValue = await AxiosCompany.put(
          `/${isExistID}`,
          companyData
        );
        var companyId = isExistID;
      } else {
        const returnValue = await AxiosTalent.put(`/${isExistID}`, talentData);
        var companyId = isExistID;
      }
    }

    if (!isExistID) {
      if (type == "company") {
        const returnValue = await AxiosCompany.post(`/`, companyData);
        var companyId = returnValue.data.id;
      } else {
        const returnValue = await AxiosTalent.post(`/`, talentData);
        var companyId = returnValue.data.id;
      }
    }

    const data = {
      fullName,
      userName,
      email,
      password: password ? hashPassword(password) : undefined,
      phone,
      profileId: companyId,
      country,
      birthData,
      planId: PlaneId,
      description,
    };

    await db.User.update(data, {
      where: {
        id,
      },
    });

    res.status(200).json({
      mas: "the update dont ",
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

//updataImg
const updataImg = async (req, res, next) => {
  const { image, userId } = req.body;

  try {
    if (!image || !userId) {
      res.status(400);
      throw new Error("email or password is not true");
    }

    const data = {
      image,
    };

    await db.User.update(data, {
      where: {
        id: userId,
      },
    });

    res.status(200).json({
      mas: "the update dont ",
    });
  } catch (error) {
    next(error);
  }
};

// get User
const getAUser = async (req, res, next) => {
  try {
    const { id } = req.userId;

    const isExist = await db.User.findAll({
      where: {
        id,
      },
    });

    const type = isExist[0].dataValues.type;
    const planId = isExist[0].dataValues.planId;
    const profileId = isExist[0].dataValues.profileId;

    if (type == "talent") {
      const returnValue = await AxiosSkills.get(`/parent/${id}`);
      var skills = returnValue.data[0]?.name;

      const returnLanguagesValue = await AxiosSLanguages.get(`/${id}`);
      var languages = returnLanguagesValue.data[0]?.name;
    }

    if (type == "company") {
      const returnValue = await AxiosCompany.get(`/${profileId}`);
      var companyData = returnValue.data;
    } else {
      const returnValue = await AxiosTalent.get(`/${profileId}`);
      var talentData = returnValue.data[0];
    }

    if (planId) {
      const returnValue = await AxiosPlan.get(`/${planId}`);
      var PlanData = returnValue.data[0];
    }

    const data = {
      ...isExist[0].dataValues,
      ...companyData,
      birthData: talentData?.birthData,
      jobTyp: talentData ? JSON.parse(talentData.jobTyp) : "",
      experienceLevel: talentData ? JSON.parse(talentData.experienceLevel) : "",
      Availability: talentData?.Availability,
      ...PlanData,
      skills: skills ? JSON.parse(skills) : "",
      languages: languages ? JSON.parse(languages) : "",
    };

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// updateJob
const updateJob = async (req, res, next) => {
  const { id } = req.params;
  const usserId = req.userId.id;
  try {
    const data = await db.User.findAll({ where: { id: usserId } });

    if (data[0].dataValues.type !== "admin") {
      res.status(400);
      throw new Error("you must be admin");
    }

    const jobsUpdated = await AxiosJob.put(`/makeRelase/${id}`);
    res.status(200).send(jobsUpdated.data);
  } catch (error) {
    next(error);
  }
};

const getAllJobsByadmin = async (req, res, next) => {
  const usserId = req.userId.id;
  try {
    const data = await db.User.findAll({ where: { id: usserId } });

    if (data[0].dataValues.type !== "admin") {
      res.status(400);
      throw new Error("you must be admin");
    }

    const dataJob = await AxiosJob.get(`/`);

    res.status(200).json(dataJob.data);
  } catch (error) {
    next(error);
  }
};

const getAUserBYCompanyId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await db.User.findAll({
      where: {
        profileId: id,
        type: "company",
      },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(401);
    next(errro);
  }
};

const getAllUsersForJobs = async (req, res, next) => {
  try {
    var usersDataForJob = [];
    const getUser = await db.User.findAll({
      attributes: ["fullName", "userName", "country", "profileId"],
      where: {
        type: "talent",
      },
    });
    //get Tanlent data
    for (let i = 0; i < getUser.length; i++) {
      const talent = await AxiosTalent(
        `/getTalentForJob/${getUser[i].dataValues.profileId}`
      );

      //get skills
      const skills = await AxiosSkills(
        `/getSkillsJob/${getUser[i].dataValues.profileId}`
      );
      usersDataForJob.push({
        ...getUser[i].dataValues,
        ...talent.data,
        ...skills.data,
      });
    }

    const userForJobAfterFliter = usersDataForJob.filter(
      (user) => user.experienceLevel !== undefined
    );
    res.json(userForJobAfterFliter);
  } catch (error) {
    next(error);
  }
};

const getEmailForACompny = async (req, res, next) => {
  try {
    const { id } = req.params;

    const email = await db.User.findAll({
      attributes: ["email"],
      where: {
        type: "company",
        profileId: id,
      },
    });

    res.json(email);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  Register,
  login,
  emailVerified,
  sendForForgot,
  newPassword,
  githubCallback,
  githubSuccess,
  updata,
  getAUser,
  updataImg,
  updateJob,
  getAllJobsByadmin,
  getAUserBYCompanyId,
  getAllUsersForJobs,
  getEmailForACompny,
};
