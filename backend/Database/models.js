const mongoose = require('mongoose');
require('./config');


//Signup Model
const StudentSignupSchema = new mongoose.Schema({
    name: String,
    admNum: String,
    rollNo: Number,
    contact: Number,
    email: String,
    password: String,
    // login:Boolean
})
const StudentSignupModel = mongoose.model('studentsignups',StudentSignupSchema);

//Student Profile Model
const StudentProfileSchema = new mongoose.Schema({
    studentAdmNum: String,
    studentName: String,
    studentOfficialEmail: String,
    studentRollNo: Number,
    studentContact: Number,
    studentPersonalEmail: String,
    studentDepartment:String,
    studentCurrentAddress: String,
    studentPermanentAddress: String,
    tenthPercentage: Number,
    twelfthPercentage: Number,
    semOne: Number,
    semTwo: Number,
    semThree: Number,
    semFour: Number,
    semFive: Number,
    semSix: Number,
    studentBacklog: Number,
    aktuPercentage: Number,
    skills: Array,
    profilePicture: String,
    tenthMarksheet: String,
    twelfthMarksheet: String,
    aktuResult:String,
    resume: String,
    verified: Boolean,
    placed:Boolean
})
const StudentProfileModel = mongoose.model('studentprofiles',StudentProfileSchema);


//Job Posting Model
const JobPostingSchema = new mongoose.Schema({
    adminID:String,
    jobID:String,
    adminName:String,
    companyName: String,
    companyLogo:String,
    jobDescription:String,
    ctc:String,
    companyWebsite: String,
    applyLink:String,
    skillsRequired:String,
    selectionProcess:String,
    additionalOffers:String,
    position:String,
    bond:String,
    isValid:Boolean,
    postedOn:Date
})
const JobPostingModel = mongoose.model('jobs',JobPostingSchema);


//Review Posting Model
const ReviewPostingSchema = new mongoose.Schema({
    admNum:String,
    studentName:String,
    studentDepartment:String,
    companyName:String,
    placed:Boolean,
    date:Date,

    ctc:String,
    selectionProcess:String,
    suggestionsForJuniors:String,
    resourcesForJuniors:String,
    reviewVerified:Boolean,
    review:String
})
const ReviewPostingModel = mongoose.model('reviews',ReviewPostingSchema);

const idGenetingSchema = new mongoose.Schema({
    adminID:Number,
    jobID:Number,
    reviewID:Number,
    noticeID:Number,
})
const idGeneratingModel = mongoose.model('idgenerations',idGenetingSchema);


//Notice Posting Model
const NoticePostingSchema = new mongoose.Schema({
    adminID:String,
    noticeID:String,
    senderName:String,
    subject:String,
    notice:String,
    hasSeen:Boolean,
    date:Date
})
const NoticePostingModel = mongoose.model('notices',NoticePostingSchema);


//Stories Posting Schema
const StoriesSchema = new mongoose.Schema({      
    AdminID:String,
    StoryID:String,
    StudentName:String,
    StudentDepartment:String,
    StudentCTC:String,
    Story:String
})
const StoriesModel = mongoose.model('stories',StoriesSchema);


//TPO Signup Model
const TPOSignupSchema = new mongoose.Schema({
    adminID:String,
    tpoName: String,
    tpoEmail: String,
    contact: Number,
    tpoPassword: String,
})
const TPOSignupModel = mongoose.model('tposignups',TPOSignupSchema);

//Notice Posting Model
const PlacementStatusSchema = new mongoose.Schema({
    admNum:String,
    applied:Array,
    placed:Array
})
const PlacementStatusModel = mongoose.model('placementstatus',PlacementStatusSchema);


module.exports = {StudentSignupModel,JobPostingModel,ReviewPostingModel,idGeneratingModel,NoticePostingModel, TPOSignupModel,StudentProfileModel,PlacementStatusModel};