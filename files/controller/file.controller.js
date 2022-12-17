const fs = require("fs");

const db = require("../models/index");
const { AxiosUser } = require("../helper/fetchdata");
const { getBase64 } = require("../helper/convertFileTobase64");

const getAFile = async (req, res, next) => {
  const { id } = req.params;

  try {
    const file = await db.File.findAll({
      where: {
        id,
      },
    });

    const name = file[0].dataValues.name;
    const type = file[0].dataValues.type;

    const img = getBase64(type, name);

    res.status(200).send(img);
  } catch (error) {
    next(error);
  }
};

const getFiles = async (req, res, next) => {
  const userId = req.userId.id;
  try {
    const file = await db.File.findAll({
      where: {
        userId,
      },
    });
    res.status(200).json(file);
  } catch (error) {
    next(error);
  }
};

const addFile = async (req, res, next) => {
  const userId = req.userId.id;
  const { name, type } = req.name;

  try {
    const userImage = {
      name,
      userId,
      type,
    };

    const file = await db.File.create(userImage);
    res.status(200).json(file);
  } catch (error) {
    next(error);
  }
};
//file
const addImageProfile = async (req, res, next) => {
  const userId = req.userId.id;
  const { name, type } = req.name;

  try {
    const userImage = {
      name,
      userId,
      type,
    };

    const file = await db.File.create(userImage);

    //make update to user img

    const data = {
      image: file.id,
      userId,
    };

    const Img = await AxiosUser.put("/updataImg", data);

    res.status(200).json(file);
  } catch (error) {
    next(error);
  }
};

//file
const EditFile = async (req, res, next) => {
  const userId = req.userId.id;
  const { id } = req.params;
  const { name, type } = req.name;
  try {
    const data = await db.File.findAll({
      where: {
        id,
      },
    });

    const ImgName = data[0].dataValues.name;

    const file = await db.File.update(
      { name, type },
      {
        where: {
          id,
        },
      }
    );

    fs.unlink(ImgName, function (err) {
      if (err) throw err;
      // if no error, file has been deleted successfully
      console.log("File deleted!");
    });

    res.status(200).json(file);
  } catch (error) {
    next(error);
  }
};

const deleteFile = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await db.File.findAll({
      where: {
        id,
      },
    });

    const ImgName = data[0].dataValues.name;

    const file = await db.File.destroy({
      where: {
        id,
      },
    });

    fs.unlink(ImgName, function (err) {
      if (err) throw err;
      // if no error, file has been deleted successfully
      console.log("File deleted!");
    });

    res.status(200).json(file);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAFile,
  getFiles,
  addFile,
  EditFile,
  deleteFile,
  addImageProfile,
};
