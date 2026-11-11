import React from 'react'
import CourseListing from './components/CourseListing'
import CourseDetails from './pages/CourseDetails'
import { Routes, Route } from 'react-router-dom'
import WishListPage from './pages/WishListPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import ManageCourse from './pages/ManageCourse'
import AddCourse from './pages/AddCourse'


const App = () => {
  return (
    <div>
      {/* <CourseListing /> */}
      <Routes>
        <Route element={<AdminProtectedRoute />}>
          <Route path='/admin' element={<AdminDashboard />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/courses' element={<CourseListing />} />
          <Route path='/courses/:id' element={<CourseDetails />} />
        </Route>

        <Route path='/wishlist' element={<WishListPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/admin/manage-courses' element={<ManageCourse />} />
        <Route path='/admin/add-course' element={<AddCourse />} />
      </Routes>
    </div >
  )
}

export default App