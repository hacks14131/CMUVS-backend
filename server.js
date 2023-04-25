require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const { verifyAccessToken } = require('./utils/generateToken');

const loginRoute = require('./routes/login');
const userRoute = require('./routes/user');
const userRouteSecond = require('./routes/userCollegeAndDepartmentList');
const electionRoute = require('./routes/election');
const electionCandidateRoute = require('./routes/electionCandidate');
// const userRoleRoute = require('./routes/userRole');
// const roleRoute = require('./routes/role');
const userVoteHistoryRoute = require('./routes/userVoteHistory');
// const votedCandidateRoute = require('./routes/votedCandidate');
const platformRoute = require('./routes/platform');
const electionPositionRoute = require('./routes/electionPosition');
// const allowedVoterRoute = require('./routes/allowedVoter');
// const electionPartyListRoute = require('./routes/electionPartyList');
const canvassingOfficerRoute = require('./routes/canvassingOfficer');
// const collegeRoute = require('./routes/college');
// const departmentRoute = require('./routes/department');
// const programRoute = require('./routes/program');
const electionCanvassRoute = require('./routes/electionCanvass');
const electionWinnerRoute = require('./routes/electionWinner');
const candidateMottoRoute = require('./routes/motto');
const candidatePictureRoute = require('./routes/candidatePicture');
const canvassPositionRoute = require('./routes/canvassPosition');
// const userValidationRoute = require('./routes/dtoUser');
const adminRoute = require('./routes/admin');
const adminCheckRoute = require('./routes/adminCheck');
const canvassOfficerCheckRoute = require('./routes/canvassOfficerCheck');
const electionCandidateCheckRoute = require('./routes/electionCandidateCheck');
const electionCanvassResultRoute = require('./routes/electionCanvassResult');

connectDB();

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// app.get('/hey', (req, res) => {
//   res.send('Hey!');
// });

app.get('/', verifyAccessToken, (req, res, next) => {
  // console.log(req.headers['Authorization']);
  res.send('route access');
});
app.use('/api', loginRoute);
app.use('/api/voters', userRouteSecond);
app.use('/api/user', verifyAccessToken, userRoute);
app.use('/api/election', verifyAccessToken, electionRoute);
app.use('/api/electionCandidate', verifyAccessToken, electionCandidateRoute);
app.use('/api/election-candidate-check', electionCandidateCheckRoute);
// app.use('/api/userRole', verifyAccessToken, userRoleRoute);
// app.use('/api/role', verifyAccessToken, roleRoute);
app.use('/api/userVoteHistory', verifyAccessToken, userVoteHistoryRoute);
app.use('/api/platform', verifyAccessToken, platformRoute);
app.use('/api/electionPosition', verifyAccessToken, electionPositionRoute);
app.use('/api/canvassingOfficer', verifyAccessToken, canvassingOfficerRoute);
app.use('/api/canvasser-rights-check', canvassOfficerCheckRoute);
app.use('/api/electionCanvass', verifyAccessToken, electionCanvassRoute);
app.use('/api/electionWinner', verifyAccessToken, electionWinnerRoute);
app.use('/api/motto', verifyAccessToken, candidateMottoRoute);
app.use('/api/candidatePicture', verifyAccessToken, candidatePictureRoute);
app.use('/api/canvassPosition', verifyAccessToken, canvassPositionRoute);
app.use('/api/admin', verifyAccessToken, adminRoute);
app.use('/api/admin-check', adminCheckRoute);
app.use('/api/election-canvass', verifyAccessToken, electionCanvassResultRoute);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message,
  });
});

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
