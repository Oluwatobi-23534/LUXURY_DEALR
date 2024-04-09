import React, { useState, useEffect  } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useUpdateUserMutation,
  useGetUserQuery,
  
} from "../../slices/userApiSlice";
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';

const UserEditPage = () => {
     const navigate = useNavigate();
    const {id}  = useParams()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const [updateUser, { isLoading }, refetch] = useUpdateUserMutation()
    const {
      data: user,
      isLoading: isUserLoading,
      error: userError,
    } = useGetUserQuery(id);

    

     useEffect(() => {
       if (user) {
         setUsername(user.username);
         setEmail(user.email);
         setIsAdmin(user.isAdmin);
       }
     }, [user]);

    const handleUpdateUser = async () => {
        try {
           const res = await updateUser({ username, email, isAdmin, id })
            toast.success(res.message)
            navigate("/admin/users")
            refetch()
        } catch (error) {
            return toast.error(error?.data?.message || error?.error);
        }
  }
  
  if (isLoading) {
    <Loader />;
  }

  if (userError) {
    toast.error(userError.messsage);
  }
    
 return (
   <div className="flex flex-col pt-40 items-center bg-blue-50 text-blue-900 min-h-screen">
     <h2 className="text-2xl font-bold my-4 text-blue-700">Edit User</h2>
     <form onSubmit={handleUpdateUser} className="w-full max-w-sm">
       <div className="mb-4">
         <label htmlFor="username" className="block text-blue-700 font-bold mb-2">
           Username
         </label>
         <input
           type="text"
           id="username"
            value={username}
                     onChange={(e) => setUsername(e.target.value)}
           className="w-full border border-blue-300 p-2 rounded-md"
         />
       </div>
       <div className="mb-4">
         <label htmlFor="email" className="block text-blue-700 font-bold mb-2">
           Email
         </label>
         <input
           type="email"
           id="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           className="w-full border border-blue-300 p-2 rounded-md"
         />
       </div>
       <div className="mb-4">
         <label htmlFor="isAdmin" className="block text-blue-700 font-bold">
           Is Admin
         </label>
         <input
           type="checkbox"
           id="isAdmin"
           checked={isAdmin}
           onChange={(e) => setIsAdmin(e.target.checked)}
           className="mr-2"
         />
       </div>
       <button
         type="button"
                 className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                 onClick={handleUpdateUser}
       >
         Update
             </button>
             {isLoading && <Loader/>}
     </form>
   </div>
 );


}

export default UserEditPage