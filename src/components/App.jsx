import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home/Home';
import BorrowerLogin from './borrowerauth/BorrowerLogin';
import LenderLogin from './Lenderauth/LenderLogin';
import BorrowerRegister from './borrowerauth/BorrowerRegister';
import LenderRegister from './Lenderauth/LenderRegister';
import BDashboard from './BorrowerDashboard/Dashboard';
import LDashboard from './LenderDashboard/Dashboard';
import HomeDashboard from './LenderDashboard/home';
import AboutDashboard from './LenderDashboard/loans';
import ContactDashboard from './LenderDashboard/history';
import BorrowerHomeDashboard from './BorrowerDashboard/home';
import BorrowerAboutDashboard from './BorrowerDashboard/loans';
import BorrowerContactDashboard from './BorrowerDashboard/history';
import BorrowerProfileDashboard from './BorrowerDashboard/profile';
import BorrowerRequestDashboard from './BorrowerDashboard/request';
import ProfileDashboard from './LenderDashboard/profile';
import BorrowerListDashboard from './LenderDashboard/borrowerslist';
import RequestsDashboard from './LenderDashboard/request';
import { BForget } from './borrowerauth/forget';
import { LForget } from './Lenderauth/forget';
import AdminDashboard from "./AdminDashboard/Dashboard";
import AdminHomeDashboard from "./AdminDashboard/home";
import AdminBorrowersDashboard from "./AdminDashboard/borrowers";
import AdminLendersDashboard from "./AdminDashboard/lenders";
import AdminLoansDashboard from "./AdminDashboard/activeloans";
import AdminRequestedDashboard from "./AdminDashboard/requestedloans";
import AdminProfileDashboard from "./AdminDashboard/profile";
import AdminLogin from "./Adminauth/AdminLogin";
import LoanDetailsDashboard from './BorrowerDashboard/loandetails';
import Error from './Error/Error';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="/bregister" element={<BorrowerRegister />} />
        <Route path="/blogin" element={<BorrowerLogin />} />
        <Route path="/bforget" element={<BForget />} />
        <Route path="/lforget" element={<LForget />} />
        <Route path="/lregister" element={<LenderRegister />} />
        <Route path="/llogin" element={<LenderLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/borrowerdashboard" element={<BDashboard />} >
          <Route path="" element={<Navigate  to="home" />} />
          <Route path="home" element={<BorrowerHomeDashboard />} />
          <Route path="loans" element={<BorrowerAboutDashboard />} />
          <Route path="payments" element={<BorrowerContactDashboard />} />
          <Route path="profile" element={<BorrowerProfileDashboard />} />
          <Route path="requests" element={<BorrowerRequestDashboard />} />
          <Route path="loandetails" element={<LoanDetailsDashboard />} />
          <Route path="*" element={<Navigate  to="home" />} />
        </Route>
        <Route path="/lenderdashboard" element={<LDashboard />} >
          <Route path="" element={<Navigate  to="home" />} />
          <Route path="home" element={<HomeDashboard />} />
          <Route path="loans" element={<AboutDashboard />} />
          <Route path="request" element={<RequestsDashboard />} />
          <Route path="payments" element={<ContactDashboard />} />
          <Route path="profile" element={<ProfileDashboard />} />
          <Route path="borrowerlist" element={<BorrowerListDashboard />} />
          <Route path="*" element={<Navigate  to="home" />} />
        </Route>
        <Route path='/admindashboard' element={<AdminDashboard/>}>
            <Route path="" element={<Navigate  to="home" />} />
            <Route path="home" element={<AdminHomeDashboard />} />
            <Route path="borrowers" element={<AdminBorrowersDashboard />} />
            <Route path="lenders" element={<AdminLendersDashboard />} />
            <Route path="activeloans" element={<AdminLoansDashboard />} />
            <Route path="requestedloans" element={<AdminRequestedDashboard />} />
            <Route path="profile" element={<AdminProfileDashboard />} />
            <Route path="*" element={<Navigate  to="home" />} />
        </Route>
        <Route path="*" element={<Navigate  to="home" />} />
      </Routes>
    </Router>
  );
}


export default App;



