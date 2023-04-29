const mongoose = require('mongoose');

const User = require('../models/user');

const asyncHandler = require('express-async-handler');
const { generateToken } = require('../utils/generateToken');

const registerUser = asyncHandler(async (req, res) => {
  try {
    const {
      studentID,
      registrationNumber,
      firstName,
      middleName,
      familyName,
      college,
      department,
      program,
      yearLevel,
      username,
      accountPassword,
    } = req.body;

    const query = { studentID };

    const checkStudent = await User.findOne(query);
    if (checkStudent) {
      const findQuery = { studentID };
      const update = {
        registrationNumber,
        college,
        department,
        program,
        yearLevel,
        studentStatus: 'active',
      };
      const options = { new: true };
      User.findOneAndUpdate(findQuery, update, options).then((docs) =>
        res.status(200).json(docs)
      );
    } else {
      const user = await new User({
        _id: mongoose.Types.ObjectId(),
        studentID,
        registrationNumber,
        firstName,
        middleName,
        familyName,
        college,
        department,
        program,
        yearLevel,
        username,
        accountPassword,
        studentStatus: 'active',
      });

      user.save().then((docs) => {
        res.status(201).json({
          message: `User with student id ${docs.studentID} and registration no. ${docs.registrationNumber} added successfully`,
        });
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
});

const deactivateStudentAccountStatus = async (req, res) => {
  try {
    const query = { studentStatus: 'inactive' };
    await User.updateMany({}, query).then((docs) => res.status(200).json(docs));
  } catch (error) {
    res.status(500).json({ message: 'an error occured' });
  }
};

const deleteUserByID = (req, res) => {
  const id = req.params.id;
  User.deleteOne({ _id: id })
    .exec()
    .then((docs) => {
      res.status(200).json({
        message: 'Delete user successful',
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
        message: 'Delete user unsuccessful',
      });
    });
};

const getUserByStudentID = async (req, res) => {
  const studentID = req.params.id;
  await User.findOne({ studentID })
    .then((docs) => {
      res.status(200).json({
        firstName: docs.firstName,
        middleName: docs.middleName ? docs.middleName : ' ',
        familyName: docs.familyName,
        yearLevel: docs.yearLevel,
        college: docs.college,
        department: docs.department,
        program: docs.program,
      });
    })
    .catch((error) => {
      res.status(500).json({
        Error: {
          error: error,
          message: error.message,
        },
      });
    });
};

const updateUserInfo = async (req, res) => {
  try {
    const _id = req.params.userID;
    const { college, department, yearLevel } = req.body;

    const query = { _id: _id };
    const update = {
      college: college,
      department: department,
      yearLevel: yearLevel,
    };
    const options = { new: true };

    await User.findOneAndUpdate(query, update, options).then((docs) => {
      if (docs) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({ message: 'No user found' });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const checkUser = async (req, res, next) => {
  try {
    const checkUser = await User.findOne({
      firstName: req.params.firstname,
      familyName: req.params.familyname,
    });

    if (checkUser) {
      res.status(200).json({
        userID: checkUser._id,
        studentID: checkUser.studentID,
      });
    } else {
      throw new Error('User does not exist');
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
      error,
    });
  }
};

const authUser = asyncHandler(async (req, res) => {
  try {
    const { username, accountPassword } = req.body;
    const user = await User.findOne({
      username,
    });
    const passwordMatch = await user.matchPassword(accountPassword);
    if (user !== null && passwordMatch) {
      res.status(200).json({
        _id: user._id,
        studentID: user.studentID,
        auth: true,
        token: generateToken(user._id),
        department: user.department,
        college: user.college,
        yearLevel: user.yearLevel,
      });
    } else {
      res.status(401);
      throw new Error('Invalid username or password');
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

const oldPasswordAuth = async (req, res) => {
  try {
    const { studentID, accountPassword, newPassword } = req.body;
    const user = await User.findOne({ studentID });
    const passwordMatch = await user.matchPassword(accountPassword);
    if (user !== null && passwordMatch) {
      user.accountPassword = newPassword;
      user.save().then((docs) => {
        res.status(200).json(docs);
      });
    } else {
      res.status(304).json({ message: 'update failed' });
    }
  } catch (error) {
    res.status(304).json({ message: error });
  }
};

const signUpValidator = async (req, res) => {
  try {
    const { firstName, familyName, studentID } = req.body;
    User.findOne({ firstName, familyName, studentID }).then((docs) => {
      if (docs !== null) {
        res.status(200).json({
          message: 'User found',
          userFound: true,
        });
      } else {
        res.status(404).json({ message: 'User not found', userFound: false });
      }
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const getAllCollegeAndDepartmentThenGroup = async (req, res) => {
  try {
    User.aggregate([
      {
        $match: {
          studentStatus: 'active',
        },
      },
      {
        $project: {
          firstName: 1,
          middleName: 1,
          familyName: 1,
          college: 1,
          department: 1,
        },
      },
      {
        $group: {
          _id: '$college',
          departments: {
            $addToSet: '$department',
          },
          students: {
            $push: {
              FullName: {
                $concat: ['$firstName', ' ', '$middleName', ' ', '$familyName'],
              },
              id: '$_id',
              department: '$department',
            },
          },
        },
      },
    ]).then((docs) => {
      res.status(200).json(docs);
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const validateUser = async (req, res) => {
  try {
    const { _id, studentID, registrationNumber } = req.body;
    const query = {
      _id: _id,
      studentID: studentID,
      registrationNumber: registrationNumber,
      studentStatus: 'active',
    };
    User.findOne(query).then((docs) => {
      if (docs) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({ message: 'Student not found' });
      }
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getUserLatestInfo = async (req, res) => {
  try {
    const { _id, studentID } = req.body;
    const query = {
      _id: _id,
      studentID: studentID,
    };
    User.findOne(query).then((docs) => {
      if (docs) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({ message: 'student not found' });
      }
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};

const authenticateUser = async (req, res) => {
  try {
    const { studentID, registrationNumber, firstName, familyName } = req.body;
    User.findOne({
      firstName,
      familyName,
      studentID,
      registrationNumber,
    })
      .then((docs) => {
        res.status(200).json({
          _id: docs._id,
          studentID: docs.studentID,
          firstName: docs.firstName,
          middleName: docs.middleName ? docs.middleName : ' ',
          familyName: docs.familyName,
          college: docs.college,
          department: docs.department,
          program: docs.program,
          yearLevel: docs.yearLevel,
          withPE: docs.withPE,
        });
      })
      .catch((error) =>
        res.status(404).json({ message: 'User not found in the database' })
      );
  } catch (error) {
    res
      .status(404)
      .json({ message: 'User not found in the database', error: error });
  }
};

const getTotalExpectedVoterNumber = async (req, res) => {
  try {
    const college = req.params.allowedCollege;
    const yearLevel = req.params.allowedYearLevel;
    let query = null;
    if (college === 'ALL' && yearLevel === 'ALL') {
      query = {};
    } else if (yearLevel === 'ALL') {
      query = { college: college };
    } else {
      query = { college: college, yearLevel: yearLevel };
    }
    User.countDocuments(query).then((count) => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(200).json({ message: 'some error occured' });
      }
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  registerUser,
  deleteUserByID,
  getUserByStudentID,
  authUser,
  checkUser,
  signUpValidator,
  updateUserInfo,
  getAllCollegeAndDepartmentThenGroup,
  validateUser,
  getUserLatestInfo,
  authenticateUser,
  getTotalExpectedVoterNumber,
  deactivateStudentAccountStatus,
  oldPasswordAuth,
};
