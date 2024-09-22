import './css/bootstrap.min.css';
import './js/bootstrap.min.js';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx'
import StudentSignup from './components/StudentSignup.jsx'
import StudentLogin from './components/StudentLogin.jsx';
import StudentDashboard from './components/StudentDashboard.jsx';
import ViewJobs from './components/ViewJobs.jsx';
import PostReviews from './components/PostReviews.jsx';
import PostJobs from './components/PostJobs.jsx';
import TPOLogin from './components/TPOLogin.jsx';
import TPODashboard from './components/TPODashboard.jsx';
import VerifyStudent from './components/VerifyStudent.jsx';
import UpdateStudentProfile from './components/UpdateStudentProfile.jsx';
import MoreStudentDetails from './components/MoreStudentDetails.jsx';
import ManageStudent from './components/ManageStudent.jsx';
import StudentDetails from './components/StudentDetails.jsx';
import ManageJob from './components/ManageJob.jsx';
import ApplyForJob from './components/ApplyForJob.jsx';
import PostNotice from './components/PostNotice.jsx';
import ViewNotices from './components/ViewNotices.jsx';
import ViewReviews from './components/ViewReviews.jsx';
import ViewCompanyReviews from './components/ViewCompanyReviews.jsx';
import Analyze from './components/Analyze.jsx';
import Home from './components/Home.jsx';
import ViewStudentProfile from './components/ViewStudentProfile.jsx';
import ViewStories from './components/ViewStories.jsx';
import CoordinatorSignup from './components/CoordinatorSignup.jsx';
import CoordinatorDashboard from './components/CoordinatorDashboard.jsx';
import CoordinatorViewStudents from './components/CoordinatorViewStudents.jsx';
import CoordinatorViewJobs from './components/CoordinatorViewJobs.jsx';
import CoordinatorAnalysis from './components/CoordinatorAnalysis.jsx';
import PostStories from './components/PostStories.jsx';
import JuniorJobViewing from './components/JuniorJobViewing.jsx';
import JuniorJobDetails from './components/JuniorJobDetails.jsx';
import VerifyReviews from './components/VerifyReviews.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          <Route index path="/" element={<Home/>} />
            <Route path="/studentLogin" element={<StudentLogin/>}></Route>
            <Route path="/studentSignup" element={<StudentSignup />} />
            <Route path='/studentDashboard' element={<StudentDashboard/>}></Route>
            <Route path='/viewStudentProfile/:admNum' element={<ViewStudentProfile/>}></Route>
            <Route path='/updateStudentProfile' element={<UpdateStudentProfile/>}></Route>
            <Route path='/viewJobs' element={<ViewJobs/>}></Route>
            <Route path='/applyJob/:jobID' element={<ApplyForJob/>}></Route>
            <Route path='/juniorJobViewing' element={<JuniorJobViewing/>}></Route>
            <Route path='/juniorJobDetails/:jobID' element={<JuniorJobDetails/>}></Route>
            <Route path='/postReviews' element={<PostReviews/>}></Route>
            <Route path='/viewNotices' element={<ViewNotices/>}></Route>
            <Route path='/viewReviews' element={<ViewReviews/>}></Route>
            <Route path='/viewReviews/:companyName' element={<ViewCompanyReviews/>}></Route>
            <Route path='/viewStories' element={<ViewStories/>}></Route>
            <Route path='/coordinatorSignup' element={<CoordinatorSignup/>}></Route>
            <Route path='/coordinatorDashboard' element={<CoordinatorDashboard/>}></Route>
            <Route path='/viewStudents' element={<CoordinatorViewStudents/>}></Route>
            <Route path='/coordinatorViewJobs' element={<CoordinatorViewJobs/>}></Route>
            <Route path='/coordinatorAnalysis' element={<CoordinatorAnalysis/>}></Route>
            <Route path='/TPOLogin' element={<TPOLogin/>}></Route>
            <Route path='/TPODashboard' element={<TPODashboard/>}></Route>
            <Route path='/manageStudent' element={<ManageStudent/>}></Route>
            <Route path='/manageJobs' element={<ManageJob/>}></Route>
            <Route path='/verifyStudent' element={<VerifyStudent />}></Route>
            <Route path='/verifyReviews' element={<VerifyReviews />}></Route>
            <Route path="/moreDetails/:admNum" element={<MoreStudentDetails />} ></Route>
            <Route path="/studentDetails/:admNum" element={<StudentDetails />} ></Route>
            <Route path='/postJobs' element={<PostJobs/>}></Route>
            <Route path='/postNotice' element={<PostNotice/>}></Route>
          <Route path='/postStories' element={<PostStories/>}></Route>
            <Route path='/Analysis' element={<Analyze/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
