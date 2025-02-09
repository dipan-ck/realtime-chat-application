import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../components/Loader';
function SignupPage() {

  

  const navigate = useNavigate();
  const { signup, isSigningup } = useAuthStore();

  const [showPassword, setShowPassword] = useState("password");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const validateForm = () => {
       if(!formData.fullName.trim()){
             return toast.error("Fullname is Required")
       }
       if(!formData.email.trim()){
             return toast.error("email is Required")
       }
       if(!formData.password.trim()){
             return toast.error("Password is Required")
       }
       if(formData.password.trim().length < 6){
             return toast.error("Password must be atleast 6 Characters")
       }

       return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidated = validateForm();

    if(isValidated){
        signup(formData);
       
    }
  }

  if(isSigningup){
    return (<Loader/>)
  }



  return (
    <div className=" bg-[#0d0d0d]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
          <div>
            <h2 className="lg:text-5xl text-3xl font-extrabold lg:leading-[55px] text-white">
              It's Fast, Reliable and Secure
            </h2>
            <p className="text-sm mt-6 text-[#adadad]">Immerse yourself in a hassle-free signup journey and enjoy the Platform</p>
            <p className="text-sm mt-12 text-white">Already have an account<span
              onClick={() => navigate("/login")}
              className="text-[#6a51f6] font-semibold hover:underline ml-1 cursor-pointer"
            >
              Login
            </span></p>
          </div>

          <form className="max-w-md md:ml-auto w-full">
          <h3 className="text-white text-3xl font-extrabold mb-8">
             Let's Create your Account
            </h3>
 

            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="text-sm font-medium text-white ">FullName</label>
                <input onChange={(e)=>{
                    
                    setFormData({...formData, [e.target.name]: e.target.value})

                }} name="fullName" type="text" required className="bg-[#212121] mt-2 w-full text-sm text-white px-4 py-3.5 rounded-md focus:outline-2 outline-[#8a75ff] placeholder:text-[#646464]" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-white ">Email</label>
                <input onChange={(e)=>{
                    
                    setFormData({...formData, [e.target.name]: e.target.value})

                }}  name="email" type="email" autocomplete="email" required className="bg-[#212121] w-full text-sm text-white px-4 py-3.5 rounded-md mt-2 focus:outline-2 outline-[#8a75ff] placeholder:text-[#646464]" placeholder="Email address" />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium text-white ">Password</label>
                <input  onChange={(e)=>{
                    
                    setFormData({...formData, [e.target.name]: e.target.value})

                }} name="password" type="password" autocomplete="current-password" required className="bg-[#212121] mt-2 w-full text-sm text-white px-4 py-3.5 rounded-md focus:outline-2 outline-[#8a75ff] placeholder:text-[#646464]" placeholder="Password" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">

                </div>
                <div className="text-sm">

                </div>
              </div>
            </div>

            <div class="!mt-8">
              <button onClick={handleSubmit} type="button" class="w-full  py-4 px-4 text-sm font-semibold rounded-xl text-white bg-[#6a51f6] hover:bg-[#584c9f] focus:outline-none">
                Signup Now
              </button>
            </div>

            <div class="my-4 flex items-center gap-4">
              <hr class="w-full border-gray-300" />
              <p class="text-sm text-white text-center">or</p>
              <hr class="w-full border-gray-300" />
            </div>

            <div class="space-x-6 flex justify-center">
              <button type="button"
                class="border-none outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="32px" viewBox="0 0 512 512">
                  <path fill="#fbbd00" d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z" data-original="#fbbd00" />
                  <path fill="#0f9d58" d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z" data-original="#0f9d58" />
                  <path fill="#31aa52" d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z" data-original="#31aa52" />
                  <path fill="#3c79e6" d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z" data-original="#3c79e6" />
                  <path fill="#cf2d48" d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z" data-original="#cf2d48" />
                  <path fill="#eb4132" d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z" data-original="#eb4132" />
                </svg>
              </button>
              <button type="button"
                class="border-none outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="32px" viewBox="0 0 512 512">
                  <path fill="#1877f2" d="M512 256c0 127.78-93.62 233.69-216 252.89V330h59.65L367 256h-71v-48.02c0-20.25 9.92-39.98 41.72-39.98H370v-63s-29.3-5-57.31-5c-58.47 0-96.69 35.44-96.69 99.6V256h-65v74h65v178.89C93.62 489.69 0 383.78 0 256 0 114.62 114.62 0 256 0s256 114.62 256 256z" data-original="#1877f2" />
                  <path fill="#fff" d="M355.65 330 367 256h-71v-48.021c0-20.245 9.918-39.979 41.719-39.979H370v-63s-29.296-5-57.305-5C254.219 100 216 135.44 216 199.6V256h-65v74h65v178.889c13.034 2.045 26.392 3.111 40 3.111s26.966-1.066 40-3.111V330z" data-original="#ffffff" />
                </svg>
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupPage