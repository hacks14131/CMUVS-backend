const mongoose = require('mongoose');
const DTOUser = require('../models/dtoUser');

const addUser = async (req, res) => {
  try {
    const {
      studentID,
      registrationNumber,
      enrollementStatus,
      firstName,
      middleName,
      familyName,
      college,
      department,
      program,
      yearLevel,
      withPE,
    } = req.body;

    const dtoUser = await new DTOUser({
      _id: mongoose.Types.ObjectId(),
      studentID,
      registrationNumber,
      enrollementStatus,
      firstName,
      middleName,
      familyName,
      college,
      department,
      program,
      yearLevel,
      withPE,
    });

    if (dtoUser) {
      dtoUser.save().then((docs) => {
        res.status(201).json({
          message: `User with student id ${docs.studentID} and registration no. ${docs.registrationNumber} added successfully`,
        });
      });
    } else {
      res.status(409).json({ error });
    }
  } catch (error) {
    res.status(409).json({ error });
  }
};

const getAllCollegeAndDepartmentThenGroup = async (req, res) => {
  try {
    DTOUser.aggregate([
      {
        $match: {
          enrollementStatus: 'enrolled',
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
    ]).then((docs) => res.status(200).json(docs));
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const validateUser = async (req, res) => {
  try {
    const { _id, studentID, registrationNumber } = req.body;
    const query = {
      _id: _id,
      studentID: studentID,
      registrationNumber: registrationNumber,
      enrollementStatus: 'enrolled',
    };
    DTOUser.findOne(query).then((docs) => {
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
    DTOUser.findOne(query).then((docs) => {
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
    DTOUser.findOne({
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
          middleName: docs.middleName,
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

const getAllEnrolledStudents = async (req, res) => {
  try {
    DTOUser.find({})
      .then((docs) => res.status(200).json(docs))
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(404).json({
      message: error,
    });
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
    DTOUser.countDocuments(query).then((count) => {
      console.log(count);
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
  addUser,
  authenticateUser,
  getAllCollegeAndDepartmentThenGroup,
  getAllEnrolledStudents,
  validateUser,
  getUserLatestInfo,
  getTotalExpectedVoterNumber,
};
