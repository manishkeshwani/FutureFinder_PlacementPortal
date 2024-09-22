const {
  StudentSignup,
  StudentLogin,
  JobViewing,
  JobPosting,
  ReviewViewing,
  ReviewPosting,
  NoticeViewing,
  IdFetching,
  IdUpdating,
  TPOLogin,
  StudentVerification,
  ProfileSubmission,
  ProfileFetching,
  StudentDetailsFetching,
  StudentFetching,
  AllStudentFetching,
  StudentRemoval,
  PlacementStatus,
  SingleStudentFetching,
  SearchStudents,
  jobFetching,
  JobRemoval,
  JobValidity,
  SingleJobFetching,
  JobSearch,
  NoticePosting,
  NoticeUpdation,
  ViewReviewsByCompany,
  updatePlacementTable,
  FetchingAppliedStatus,
  FetchingPlacementStatus,
  FetchDepartmentWiseStudentDetails,
  UserSignupDetails,
  FetchingStudentPlacementStatus,
  FetchingTPODetails,
  verifyReviews,
  deleteReviews,
} = require("../Database/db");

const { verifyToken } = require("../Token/token");

const handleStudentSignup = async (req, res) => {
  try {
    let result = await StudentSignup(req.body);
    res.json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("An error occurred while processing the Student signup");
  }
};

const handleStudentLogin = async (req, res) => {
  try {
    let result = await StudentLogin(req.body);

    if (result) {
      res.send(result);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("An error occurred while processing the Student login");
  }
};

const handleProfileSubmission = async (req, res) => {
  try {
    const result = await ProfileSubmission(req.body);
    res.send(result);
  } catch (error) {
    res.status(400).send("Internal Server Error");
  }
};

const handleProfileFetching = async (req, res) => {
  try {
    const result = await ProfileFetching(req.params.admissionID);
    if (result) {
      res.send(result);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.send(false);
  }
};

const handleJobViewing = async (req, res) => {
  try {
    const jobs = await JobViewing();
    if (jobs) {
      res.send(jobs);
    } else {
      return "Job Not Found";
    }
  } catch (error) {
    return "Internal Server Error";
  }
};

const handleJobPosting = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);
    let result = await JobPosting(req.body);
    if (result) {
      res.send("Job Posted");
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(400).send("INTERNAL SERVER ERROR");
  }
};

const handleReviewViewing = async (req, res) => {
  try {
    let reviews = await ReviewViewing();
    res.send(reviews);
  } catch (error) {
    res.send(false);
  }
};

const handleReviewPosting = async (req, res) => {
  try {
    let newReview = await ReviewPosting(req.body);
    if (newReview) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(400).send("INTERNAL SERVER ERROR");
  }
};

const handleNoticeViewing = async (req, res) => {
  try {
    let notices = await NoticeViewing();
    if (notices) {
      res.send(notices);
    } else {
      res.send("Error sending Notices");
    }
  } catch (error) {
    res.status(400).sen("INTERNAL SERVER ERROR");
  }
};

const handleIdFetching = async (req, res) => {
  console.log(req.params.id);
  try {
    const ID = await IdFetching(req.params.id);
    if (ID) {
      res.send(ID);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(400).send("INTERNAL SERVER ERROR");
  }
};

const handleTpoLogin = async (req, res) => {
  try {
    let result = await TPOLogin(req.body);

    if (result) {
      res.send(result);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("An error occurred while processing the TPO login");
  }
};

const handleNoticePosting = async (req, res) => {
  try {
    const result = await NoticePosting(req.body);
    res.send(result);
  } catch (error) {
    res.send(false);
  }
};

const handleJobFetching = async (req, res) => {
  try {
    const result = await jobFetching();
    if (result) {
      res.send(result);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const handleIdUpdating = async (req, res) => {
  try {
    const updatedID = await IdUpdating(req.body);
    // console.log(updatedID);
    res.send(true);
  } catch (error) {
    res.status(400).send("Internal Server Error");
  }
};

const handleStudentVerification = async (req, res) => {
  // console.log(req.body);
  try {
    const result = await StudentVerification(req.body);
    // res.send(false);

    if (result) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.send(false);
  }
};

const handleStudentDetailsFetching = async (req, res) => {
  try {
    const students = await StudentDetailsFetching();
    if (students.length !== 0) {
      // console.log(students)
      res.send(students);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(400).send("Internal Server Error");
  }
};

const handleStudentFetching = async (req, res) => {
  const result = await StudentFetching(req.params.admNum);
  res.send(result);
};

const handleSingleStudentDetail = async (req, res) => {
  try {
    console.log(req.params.admNum);
    const result = await SingleStudentFetching(req.params.admNum);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const handleAllStudentFetching = async (req, res) => {
  const result = await AllStudentFetching();
  res.send(result);
};

const handleStudentRemoval = async (req, res) => {
  try {
    const result = await StudentRemoval(req.params.admNum);
    res.send(result);
  } catch (error) {
    res.send(false);
  }
};

const handlePlacementStatus = async (req, res) => {
  try {
    const result = await PlacementStatus(req.body);
    res.send(result);
  } catch (error) {
    res.send(false);
  }
};

const handleSearchStudents = async (req, res) => {
  console.log(req.params.key);
  const result = await SearchStudents(req.params.key);
  res.send(result);
};

const handleJobRemoval = async (req, res) => {
  try {
    const isDeleted = await JobRemoval(req.params.jobID);
    if (isDeleted) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const handleJobValidity = async (req, res) => {
  try {
    // console.log(req.body);
    const result = await JobValidity(req.body);
    res.send(result);
  } catch (error) {
    res.send(false);
  }
};

const handleSingleJobFetching = async (req, res) => {
  console.log(req.body.params);
  try {
    const result = await SingleJobFetching(req.params.jobID);
    if (result) {
      res.send(result);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const handleJobSearch = async (req, res) => {
  try {
    const job = await JobSearch(req.params.key);
    res.send(job);
  } catch (error) {
    res.send(false);
  }
};

const handleNoticeUpdation = async (req, res) => {
  try {
    const result = await NoticeUpdation(req.body);
    return result;
  } catch (error) {
    return false;
  }
};

const handleViewReviewsByCompany = async (req, res) => {
  try {
    const review = await ViewReviewsByCompany(req.params.companyName);
    res.send(review);
  } catch (error) {
    res.send(false);
  }
};

const handleVerifyReviews = async (req, res) => {
  try {
    const review = await verifyReviews(req.params.id);
    res.send(review);
  } catch (error) {
    res.send(false);
  }
};

const handleDeleteReviews = async (req, res) => {
  try {
    const review = await deleteReviews(req.params.id);
    res.send(review);
  } catch (error) {
    res.send(false);
  }
};

const handlePlacementTable = async (req, res) => {
  try {
    const result = await updatePlacementTable(req.body);
    res.send(result);
  } catch (error) {
    res.send(false);
  }
};

const handleFetchingAppliedStatus = async (req, res) => {
  // console.log(req.params.ID);
  // console.log(req.params.admNum);
  try {
    const result = await FetchingAppliedStatus(
      req.params.ID,
      req.params.admNum
    );
    res.send(result);
  } catch (error) {
    res.send(false);
  }
};

const handleFetchingPlacementStatus = async (req, res) => {
  try {
    const result = await FetchingPlacementStatus();
    res.send(result);
  } catch (error) {
    res.send(false);
  }
};

const handleFetchDepartmentWiseStudentDetails = async (req, res) => {
  const result = await FetchDepartmentWiseStudentDetails(
    req.params.department,
    req.params.placedStatus
  );
  res.send(result);
};

const handleVerifyToken = async (req, res) => {
  const result = verifyToken(req.params.token);
  console.log(result);
  res.send(result);
};

const handleUserSignupDetails = async (req, res) => {
  try {
    const result = await UserSignupDetails(req.params.admNum);
    res.send(result);
  } catch (error) {
    res.send(false);
  }
};

const handleFetchingStudentPlacementStatus = async (req, res) => {
  try {
    const result = await FetchingStudentPlacementStatus(req.params.admNum);
    res.send(result);
  } catch (error) {
    res.send(false);
  }
};

const handleFetchingTPODetails = async (req, res) => {
  try {
    const result = await FetchingTPODetails(req.params.adminID);
    res.send(result);
  } catch (error) {
    res.send(false);
  }
};

module.exports = {
  handleStudentSignup,
  handleStudentLogin,
  handleProfileSubmission,
  handleJobViewing,
  handleJobPosting,
  handleReviewViewing,
  handleReviewPosting,
  handleNoticeViewing,
  handleIdFetching,
  handleIdUpdating,
  handleTpoLogin,
  handleStudentVerification,
  handleProfileFetching,
  handleStudentDetailsFetching,
  handleStudentFetching,
  handleAllStudentFetching,
  handleStudentRemoval,
  handlePlacementStatus,
  handleSingleStudentDetail,
  handleSearchStudents,
  handleJobFetching,
  handleJobRemoval,
  handleJobValidity,
  handleSingleJobFetching,
  handleJobSearch,
  handleNoticePosting,
  handleNoticeUpdation,
  handleViewReviewsByCompany,
  handlePlacementTable,
  handleFetchingAppliedStatus,
  handleFetchingPlacementStatus,
  handleFetchDepartmentWiseStudentDetails,
  handleVerifyToken,
  handleUserSignupDetails,
  handleFetchingStudentPlacementStatus,
  handleFetchingTPODetails,
  handleVerifyReviews,
  handleDeleteReviews,
};
