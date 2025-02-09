import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const ProfilePage = () => {

  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(authUser.profilePic || "/user.png");

  useEffect(()=>{
    setProfilePic(authUser.profilePic)
  }, [ authUser.profilePic])

  const [isUpdated, setisUpdated] = useState(false);
  const[selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file  = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async() => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      setisUpdated(!isUpdated);
 
    }


  }

  const handleSubmit = async()=>{
    await updateProfile({profilePic: selectedImage});
    setSelectedImage(null);

  }

  if(isUpdatingProfile){
    return ( <Loader/>)
  }


  return (
    <div className="min-h-screen relative bg-black overflow-hidden text-white flex items-center justify-center p-4">
        



      <button onClick={() => { navigate("/") }} type="button"
        className="w-10 h-10 top-[10%] left-[10%] absolute inline-flex items-center justify-center rounded-lg border-none outline-none cursor-pointer hover:bg-[#ddd] bg-white ">
        <svg xmlns="http://www.w3.org/2000/svg" transform="rotate(180)" width="14px" fill="#00000" class="inline" viewBox="0 0 492.004 492.004">
          <path
            d="M382.678 226.804 163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"
            data-original="#000000" />
        </svg>
      </button>
      <div className="bg-black rounded-2xl flex flex-col justify-center shadow-2xl w-full max-w-md p-8 space-y-6">
        {/* Profile Picture Section */}
        <div className="relative mx-auto w-40 h-40">
          <img
            src={ selectedImage || profilePic}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-[#8a75ff]"
          />
          <label
            htmlFor="profilePicUpload"
            className="absolute bottom-0 right-0 bg-white text-black p-2 rounded-full cursor-pointer hover:bg-zinc-200"
          >
            📸
            <input
              type="file"
              id="profilePicUpload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Profile Details Sections */}
        <div className="space-y-4">
          {/* Full Name Section */}
          <div className="bg-[#0f0f0f] rounded-2xl p-4">
            <h3 className="text-zinc-400 mb-2">Full Name</h3>
            <p className="text-white">{authUser.fullName}</p>
          </div>


          <div className="bg-[#0f0f0f] rounded-2xl p-4">
            <h3 className="text-zinc-400 mb-2">Email</h3>
            <p className="text-white">{authUser.email}</p>
          </div>

          <div className="bg-[#0f0f0f] rounded-2xl p-4">
            <h3 className="text-zinc-400 mb-2">Status</h3>
            <p className="text-white">
              🟢 Active
            </p>
          </div>

          {/* Member Since Section */}
          <div className="bg-[#0f0f0f] rounded-2xl p-4">
            <h3 className="text-zinc-400 mb-2">Member Since</h3>
            <p className="text-white">
              {new Date(authUser.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

        </div>
       <button  onClick={handleSubmit}
  disabled={!isUpdated} // Disable the button until isUpdated is true
  className={`x-6 py-3 font-bold cursor-pointer rounded-full ${
    isUpdated ? "bg-[#ffffff] text-black hover:bg-[#c7c7c7]" : "bg-[#808080] text-black"
  }`}

>
  Save Changes
</button>
      </div>

    </div>
  );
};

export default ProfilePage;
