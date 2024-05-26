import { lazy, Suspense } from 'react';
import Loader from './components/Loader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
import SideBar from "./components/Sidebar/SideBar";
const Dashboard = lazy(() => import("./Layout/dash/Dashboard"));
const Post = lazy(() => import('./Layout/Posts/Post'));

function App() {

  return (
    <Router>
      <div>
        <div className='row p-0 me-0'>
          <NavBar />
          <div className="row m-0 bod p-0">
            <div className="col-lg-3 col-md-2 col-xl-2 col-sm-4 ps-3 pe-0 me-0">
              <SideBar />
            </div>
            <div className="col-12 mt-3  col-lg-9 col-xl-10 col-md-10 col-sm-8 p-0">
              <Suspense fallback={<div style={{ display: 'flex', flexDirection: "row", Height: "100vh", margin: "40%" }}><Loader /></div>}>
                <Routes>
                  <Route path='/' element={< Dashboard />} />
                  <Route path='/posts' element={<Post />} />
                </Routes>
              </Suspense>
            </div>
          </div >
        </div >
      </div >
    </Router >
  );
}

export default App;
