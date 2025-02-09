import Navbar from "./components/Navbar"
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import HomePage from "./pages/HomePage"
import SettingsPage from "./pages/SettingsPage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import Loader from "./components/Loader"
import toast, { Toaster } from 'react-hot-toast';

function App() {

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(()=>{
      checkAuth();
  }, [checkAuth])



  if(!authUser && isCheckingAuth){
    return (<Loader/>)
  }
  

  return (
    <>
    <BrowserRouter>
    {/* <Navbar/> */}

    <Routes>
      <Route path="/" element={authUser? <HomePage/> : <Navigate to="/login"/>}/>
      <Route path="/settings" element={<SettingsPage/>}/>
      <Route path="/signup" element={!authUser? <SignupPage/> : <Navigate to="/"/>}/>
      <Route path="/login" element={!authUser? <LoginPage/> : <Navigate to="/"/>}/>
      <Route path="/profile" element={authUser? <ProfilePage/> : <Navigate to="/login"/>}/>
    </Routes>
    <Toaster/>
    </BrowserRouter>

    
     
    </>
  )
}

export default App
