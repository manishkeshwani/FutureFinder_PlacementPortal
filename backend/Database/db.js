const bcrypt = require("bcrypt");

const {
  StudentSignupModel,
  StudentProfileModel,
  JobPostingModel,
  ReviewPostingModel,
  NoticePostingModel,
  idGeneratingModel,
  TPOSignupModel,
  PlacementStatusModel,
} = require("./models");
const { generateToken } = require("../Token/token");

const StudentSignup = async (doc) => {
  try {
    doc.email = doc.email.toLowerCase();
    const existedData = await StudentSignupModel.findOne({
      admNum: doc.admNum,
    });
    const mail = doc.email.slice(-14);

    // Checking for college student
    if (mail !== "@abesit.edu.in") {
      console.log("Incorrect Mail!!! Use college mail id");
      return { message: "Incorrect Mail!!! Use college mail id" };
    }

    // Checking for existing account
    else if (existedData) {
      console.log("Already has an account");
      return { message: "Already has an account" };
    }

    // Checking for password
    else if (doc.password !== doc.verify_password) {
      console.log("Incorrect Password");
      return { message: "Incorrect Password" };
    }

    // Saving the new student signup
    else {
      const newPass = await bcrypt.hash(doc.password, 3);
      doc.password = newPass;
      console.log(newPass);
      let result = new StudentSignupModel(doc);
      result = await result.save();
      console.log(result);
      return result;
    }
  } catch (error) {
    console.log("Not connected with StudentSignup database", error);
    return { message: "Not connected with StudentSignup database" };
  }
};

const StudentLogin = async (doc) => {
  try {
    console.log(doc);
    const existedData = await StudentSignupModel.findOne({ email: doc.email });
    let isValid;
    if (existedData) {
      isValid = await bcrypt.compare(doc.password, existedData.password);
      console.log(existedData);
    } else {
      return false;
    }
    if (isValid) {
      const token = generateToken(existedData.email);
      const response = {
        name: existedData.name,
        email: existedData.email,
        rollNo: existedData.rollNo,
        admNum: existedData.admNum,
        contact: existedData.contact,
        token: token,
      };
      console.log(response);
      return response;
    }
  } catch (error) {
    console.log("Login Failed", error);
    return false;
  }
};

const JobViewing = async () => {
  try {
    const jobs = await JobPostingModel.find({});
    if (jobs) {
      return jobs;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Cannot view jobs");
  }
};

const JobPosting = async (doc) => {
  try {
    doc.postedOn = new Date();
    doc.isValid = true;
    console.log(doc);
    let jobPost = new JobPostingModel(doc);
    jobPost = await jobPost.save();
    if (jobPost) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};

const ReviewViewing = async () => {
  try {
    let reviews = await ReviewPostingModel.find({});
    // console.log(reviews)
    return reviews;
  } catch (error) {
    // console.log("Cannot see reviews");
    return false;
  }
};

const ReviewPosting = async (doc) => {
  try {
    doc.date = new Date();
    doc.companyName = doc.companyName.toLowerCase();
    let newReview = new ReviewPostingModel(doc);
    newReview = await newReview.save();
    console.log(newReview);
    if (newReview) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Cannot post reviews");
    return false;
  }
};

const NoticeViewing = async () => {
  try {
    const filter = {};
    let notices = await NoticePostingModel.find(filter).sort({ date: -1 });
    if (notices) {
      return notices;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const IdFetching = async (id) => {
  console.log(id);
  try {
    let ID = await idGeneratingModel.findOne({}, { [id]: 1, _id: 0 });
    console.log(ID);
    if (ID) {
      return ID;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const IdUpdating = async (doc) => {
  try {
    // console.log(doc);
    let idField = Object.keys(doc)[0];
    const oldID = parseInt(doc[idField].slice(3)) - 1; // Extract number from jobID and decrement
    const newId = parseInt(doc[idField].slice(3)); // Extract number from jobID

    // console.log("Field:", idField);
    // console.log("Old ID:", oldID);
    // console.log("New ID:", newId);
    let updateID = await idGeneratingModel.updateOne(
      { [idField]: oldID },
      { $set: { [idField]: newId } }
    );

    // console.log(updateID);
    return updateID.acknowledged;
  } catch (error) {
    return false;
  }
};

const TPOLogin = async (doc) => {
  try {
    console.log(doc);
    let existedData = await TPOSignupModel.findOne(doc);
    console.log(existedData);
    const token = generateToken(doc.tpoEmail);
    // console.log(token)

    if (existedData) {
      const response = {
        name: existedData.tpoName,
        email: existedData.tpoEmail,
        adminID: existedData.adminID,
        contact: existedData.contact,
        token: token,
      };
      console.log(response);
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Login Failed", error);
    return false;
  }
};

const StudentVerification = async (doc) => {
  try {
    const students = await StudentProfileModel.updateOne(doc, {
      $set: { verified: true },
    });

    console.log(students);
    if (students.modifiedCount === 1) {
      //placementStatuses table is created on sucessfull verfication for making student placement record
      const oldUser = await PlacementStatusModel.findOne({
        admNum: doc.studentAdmNum,
      });
      console.log(oldUser);
      if (oldUser) {
      } else {
        let tableCreation = new PlacementStatusModel({
          admNum: doc.studentAdmNum,
          applied: [],
          placed: [],
        });
        tableCreation = await tableCreation.save();
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const ProfileSubmission = async (doc) => {
  try {
    // Validate required fields
    if (!doc.studentAdmNum) return "Admission number is required.";

    const oldUser = await StudentProfileModel.findOne({
      studentAdmNum: doc.studentAdmNum,
    });

    // Parse numerical and boolean values
    doc.studentRollNo = JSON.parse(doc.studentRollNo);
    doc.studentContact = JSON.parse(doc.studentContact);
    doc.tenthPercentage = JSON.parse(doc.tenthPercentage);
    doc.twelfthPercentage = JSON.parse(doc.twelfthPercentage);
    doc.semOne = JSON.parse(doc.semOne);
    doc.semTwo = JSON.parse(doc.semTwo);
    doc.semThree = JSON.parse(doc.semThree);
    doc.semFour = JSON.parse(doc.semFour);
    doc.semFive = JSON.parse(doc.semFive);
    doc.semSix = JSON.parse(doc.semSix);
    doc.studentBacklog = JSON.parse(doc.studentBacklog);
    doc.aktuPercentage = JSON.parse(doc.aktuPercentage);
    doc.verified = JSON.parse(doc.verified);
    doc.skills = doc.skills.split(",");
    doc.placed = false;
    // console.log(doc);
    // console.log(doc['studentDepartment']);
    doc.studentDepartment = doc.studentDepartment.toUpperCase();

    if (oldUser && oldUser.verified) {
      return "Profile Verified";
    } else if (oldUser && !oldUser.verified) {
      let result = await StudentProfileModel.updateOne(
        { studentAdmNum: doc.studentAdmNum },
        { $set: doc }
      );
      console.log("Update Result:", result);
      return "Profile Updated";
    } else {
      let result = new StudentProfileModel(doc);
      await result.save();
      return "Profile Updated";
    }
  } catch (error) {
    console.error("Server Error:", error);
    return "Internal Server Error";
  }
};

const ProfileFetching = async (admissionID) => {
  try {
    const User = await StudentProfileModel.findOne({
      studentAdmNum: admissionID,
    });
    // console.log(User);
    if (User) {
      return User;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const StudentDetailsFetching = async () => {
  try {
    const students = await StudentProfileModel.find({ verified: false });
    return students;
  } catch (error) {
    return false;
  }
};

const StudentFetching = async (admNum) => {
  const students = await StudentProfileModel.findOne({ studentAdmNum: admNum });
  console.log(students);
  return students;
};

const SingleStudentFetching = async (admNum) => {
  // console.log(admNum);
  try {
    const student = await StudentProfileModel.findOne({
      studentAdmNum: admNum,
    });
    // console.log(student);
    if (student) {
      return student;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const AllStudentFetching = async () => {
  const students = await StudentProfileModel.find({});
  console.log(students);
  return students;
};

const StudentRemoval = async (admNum) => {
  try {
    const students = await StudentProfileModel.deleteOne({
      studentAdmNum: admNum,
    });
    console.log(students);
    return students.acknowledged;
  } catch (error) {
    return false;
  }
  // return (students);
};

const PlacementStatus = async (doc) => {
  try {
    const students = await StudentProfileModel.updateOne(doc, {
      $set: { placed: true },
    });
    console.log(students);
    return students.acknowledged;
  } catch (error) {
    return false;
  }
};

const SearchStudents = async (key) => {
  try {
    const students = await StudentProfileModel.find({
      $or: [
        { studentName: { $regex: key, $options: "i" } },
        { studentAdmNum: { $regex: key, $options: "i" } },
        { skills: { $elemMatch: { $regex: key, $options: "i" } } },
      ],
    });
    console.log(students);
    return students;
  } catch (error) {
    console.error("Error searching students:", error);
    return false;
  }
};

const jobFetching = async () => {
  try {
    const result = await JobPostingModel.find({});
    // console.log(result);
    return result;
  } catch (error) {
    return false;
  }
};

const JobRemoval = async (jobID) => {
  try {
    const result = await JobPostingModel.deleteOne({ jobID: jobID });
    if (result.deletedCount === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const JobValidity = async (doc) => {
  try {
    const result = await JobPostingModel.updateOne(
      { jobID: doc.jobID },
      { $set: doc }
    );
    console.log(result);
    if (result.modifiedCount === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const SingleJobFetching = async (jobID) => {
  try {
    const result = await JobPostingModel.findOne({ jobID: jobID });
    if (result) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const JobSearch = async (key) => {
  try {
    const result = await JobPostingModel.find({
      $or: [{ companyName: { $regex: key, $options: "i" } }],
    });
    return result;
  } catch (error) {
    return false;
  }
};

const NoticePosting = async (doc) => {
  try {
    doc.hasSeen = false;
    doc.date = new Date();
    let response = new NoticePostingModel(doc);
    response = await response.save();
    if (response) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const NoticeUpdation = async (doc) => {
  console.log(doc.noticeID);
  try {
    const response = await NoticePostingModel.updateOne(
      { noticeID: doc.noticeID },
      { $set: doc }
    );
    return response.acknowledged;
  } catch (error) {
    return false;
  }
};

const ViewReviewsByCompany = async (companyName) => {
  console.log(companyName);
  try {
    const response = await ReviewPostingModel.find({
      companyName: companyName,
      reviewVerified: true,
    }).sort({ date: -1 });
    return response;
  } catch (error) {
    return false;
  }
};

const updatePlacementTable = async (doc) => {
  try {
    const field = Object.keys(doc)[0];
    const oldStatus = await PlacementStatusModel.findOne({
      admNum: doc.admNum,
      [field]: { $elemMatch: { $eq: doc[field] } },
    });
    if (oldStatus) {
      return true;
    } else {
      const result = await PlacementStatusModel.updateOne(
        { admNum: doc.admNum },
        { $push: { [field]: doc[field] } }
      );
      console.log(result);
      if (result.acknowledged === true) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    return false;
  }
};

const FetchingAppliedStatus = async (id, admNum) => {
  try {
    const result = await PlacementStatusModel.findOne({
      admNum: admNum,
      applied: { $elemMatch: { $eq: id } },
    });
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
  // console.log(result);
};

const FetchingPlacementStatus = async () => {
  try {
    const result = await PlacementStatusModel.find({});
    return result;
  } catch (error) {
    return false;
  }
};

const FetchDepartmentWiseStudentDetails = async (department, placedStatus) => {
  placedStatus = JSON.parse(placedStatus);
  const result = await await StudentProfileModel.find({
    studentDepartment: department,
    placed: placedStatus,
  });
  return result;
};

const UserSignupDetails = async (admNum) => {
  try {
    // console.log(admNum);
    const existedData = await StudentSignupModel.findOne({ admNum: admNum });
    // console.log(existedData);
    if (existedData) {
      const response = {
        name: existedData.name,
        email: existedData.email,
        rollNo: existedData.rollNo,
        admNum: existedData.admNum,
        contact: existedData.contact,
      };
      return response;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const FetchingStudentPlacementStatus = async (admNum) => {
  try {
    // console.log(admNum);
    const existedData = await PlacementStatusModel.findOne({ admNum: admNum });
    // console.log(existedData);
    if (existedData) {
      return existedData;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const FetchingTPODetails = async (adminID) => {
  try {
    const TPOData = await TPOSignupModel.findOne({ adminID: adminID });
    // console.log(existedData);
    if (TPOData) {
      return TPOData;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const verifyReviews = async (id) => {
  try {
    const response = await ReviewPostingModel.updateOne(
      { _id: id },
      { $set: { reviewVerified: true } }
    );
    console.log(response);
    return response.acknowledged;
  } catch (error) {
    return false;
  }
};

const deleteReviews = async (id) => {
  try {
    const response = await ReviewPostingModel.deleteOne({ _id: id });
    console.log(response);
    return response.acknowledged;
  } catch (error) {
    return false;
  }
};

module.exports = {
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
};
