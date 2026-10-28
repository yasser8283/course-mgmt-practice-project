import React from 'react'
import CourseListing from './components/CourseListing'
import CourseDetails from './pages/CourseDetails'
import {Routes, Route} from 'react-router-dom'
import WishListPage from './pages/WishListPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
const App = () => {
  return (
    <div>
      {/* <CourseListing /> */}
      <Routes>
        <Route path='/courses' element={<CourseListing />} />
        <Route path='/courses/:id' element={<CourseDetails />} />
        <Route path='/wishlist' element={<WishListPage />} />
        <Route path='/signup' element={<SignupPage />}/>
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App