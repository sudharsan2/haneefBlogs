import logo from './logo.svg';
import './App.css';
import CustomLayout from './components/layout';
import NavDrawerDefault from './components/drawer';
import Sample from './components/sample';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Blogs from './pages/Blogs';
import Mails from './pages/Mails';
import Placeholder from './pages/Newpost';
import EmployeeForm from './pages/employeeform';
import UserManagement from './pages/UserManagement';
import AdminDrawer from './components/AdminDrawer';
import AdminBlogsPending from './pages/AdminBlogsPending';
import AdminBlogsApproved from './pages/AdminBlogsApproved'
import AdminBlogsPublished from './pages/AdminBlogsPublished';
import Pending from './pages/Pending';
import Approved from './pages/Approved';
import Published from './pages/Published';
import NewMail from './pages/NewMail'
import UnsubscribeForm from './pages/Unsubscribe';
import Enquiries from './pages/Enquiries';



function App() {
  return (

    <Router basename=''>
      <Routes>
        <Route path='' element={<Login/>}/>
        {/* <Route path='dashboard'  element={<CustomLayout><Dashboard/></CustomLayout>}/> */}
        <Route path='adminblogspending'  element={<CustomLayout><AdminDrawer><Pending/></AdminDrawer></CustomLayout>}/>
        <Route path='adminblogsapproved'  element={<CustomLayout><AdminDrawer><Approved/></AdminDrawer></CustomLayout>}/>
        <Route path='adminblogspublished'  element={<CustomLayout><AdminDrawer><Published/></AdminDrawer></CustomLayout>}/>
        <Route path='usermanagement'  element={<CustomLayout><AdminDrawer><UserManagement/></AdminDrawer></CustomLayout>}/>
        <Route path='enquiries'  element={<CustomLayout><AdminDrawer><Enquiries/></AdminDrawer></CustomLayout>}/>
        <Route path='blogslist'  element={<CustomLayout><NavDrawerDefault><Blogs/></NavDrawerDefault></CustomLayout>}/>
        <Route path='maillist'  element={<CustomLayout><NavDrawerDefault><Mails/></NavDrawerDefault></CustomLayout>}/>
        <Route path='addpost' element={<CustomLayout><NavDrawerDefault><Placeholder/></NavDrawerDefault></CustomLayout>}/>
        <Route path='addmail' element={<CustomLayout><NavDrawerDefault><NewMail/></NavDrawerDefault></CustomLayout>}/>
        <Route path='unsubscribe' element={<UnsubscribeForm/>}/>
        

      </Routes>
    </Router>
  );
}

export default App;
