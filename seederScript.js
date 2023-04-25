require('dotenv').config();

const connectDB = require('./config/db');

const userData = require('./data/user');
const user = require('./models/User');

// const electionData = require('./data/election');
// const election = require('./models/election');

connectDB();
//import election data
// const importElectionData = async () => {
//     try {
//         await election.deleteMany({});
//         await election.insertMany(electionData);
//         console.log('Election Data import successfully')
//         process.exit();
//     } catch (error) {
//         //console.error('Error with election data import');
//         console.log('Error:', error.message)
//         process.exit(1);
//     }
// }

//import user data
const importUserData = async () => {
    try {
        await user.deleteMany({});
        await user.insertMany(userData);
        console.log('User data import Success..');
        process.exit();
    } catch (error) {
        console.error('Error with user data import');
        console.log(error);
        process.exit(1);
    }
};

//use importElectionDate method to import election data in election collection
// importElectionData();

//use importUserData method to import user data in user collection
importUserData();





