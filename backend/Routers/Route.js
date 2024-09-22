const express = require("express");
const Router = express.Router();
const {
  handleStudentSignup,
  handleStudentLogin,
  handleJobViewing,
  handleJobPosting,
  handleReviewViewing,
  handleReviewPosting,
  handleNoticeViewing,
  handleIdFetching,
  handleIdUpdating,
  handleTpoLogin,
  handleStudentVerification,
  handleProfileSubmission,
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
} = require("../Controllers/Controller");

const {
  JobLogoUpload,
  StudentProfileUpload,
} = require("../FileHandling/FileHandling");

Router.route("/studentSignup").post(handleStudentSignup);
Router.route("/Studentlogin").post(handleStudentLogin);
Router.route("/userDetails/:admNum").get(handleUserSignupDetails);
Router.route("/profile").post(StudentProfileUpload, handleProfileSubmission);
Router.route("/fetchProfileDetails/:admissionID").get(handleProfileFetching);
Router.route("/viewJobs").get(handleJobViewing);
Router.route("/postJobs").post(JobLogoUpload, handleJobPosting);
Router.route("/IdFetcher/:id").get(handleIdFetching);
Router.route("/updateID").put(handleIdUpdating);
Router.route("/tpoLogin").post(handleTpoLogin);
Router.route("/verifyStudent").put(handleStudentVerification);
Router.route("/fetchStudentsDetails").get(handleStudentDetailsFetching);
Router.route("/fetchStudent/:admNum").get(handleStudentFetching);
Router.get("/fetchSingleStudentDetail/:admNum", handleSingleStudentDetail);
Router.route("/allStudentFetching").get(handleAllStudentFetching);
Router.route("/removeStudent/:admNum").delete(handleStudentRemoval);
Router.route("/updatePlacementStatus").put(handlePlacementStatus);
Router.route("/searchStudents/:key").get(handleSearchStudents);
Router.route("/fetchJobs").get(handleJobFetching);
Router.route("/deleteJob/:jobID").delete(handleJobRemoval);
Router.route("/jobValidity").put(handleJobValidity);
Router.route("/fetchSingleJob/:jobID").get(handleSingleJobFetching);
Router.route("/searchJob/:key").get(handleJobSearch);
Router.route("/viewReviews").get(handleReviewViewing);
Router.route("/viewReviewsByCompany/:companyName").get(
  handleViewReviewsByCompany
);
Router.route("/verifyReview/:id").put(handleVerifyReviews);
Router.route("/deleteReview/:id").delete(handleDeleteReviews);
Router.route("/postReviews").post(handleReviewPosting);
Router.route("/viewNotices").get(handleNoticeViewing);
Router.route("/updateNotice").put(handleNoticeUpdation);
Router.route("/postNotices").post(handleNoticePosting);
Router.route("/updatePlacementTable").put(handlePlacementTable);
Router.route("/fetchAppliedStatus/:ID/:admNum").get(
  handleFetchingAppliedStatus
);
Router.route("/fetchingPlacementStatus").get(handleFetchingPlacementStatus);
Router.route(
  "/fetchDepartmentWiseStudentDetails/:department/:placedStatus"
).get(handleFetchDepartmentWiseStudentDetails);
Router.route("/verifyToken/:token").get(handleVerifyToken);
Router.route("/fetchingStudentPlacementStatus/:admNum").get(
  handleFetchingStudentPlacementStatus
);
Router.route("/fetchingTPODetails/:adminID").get(handleFetchingTPODetails);

// Router.route("/viewStories").get(handleStoriesViewing);
// Router.route("/postStories").post(handleStoriesPosting);

module.exports = Router;
