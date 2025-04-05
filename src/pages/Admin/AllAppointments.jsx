import { useEffect } from "react";

import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../../../Admin/src/assets/assets";
// import AppContextProvider from "../../../../frontend/src/context/AppContext";


const AllAppointments = () => {
  const { atoken, appointments, getAllAppointments ,CancelAppointment} = useContext(AdminContext)
  const {calculateAge,currency} = useContext(AppContext)

 
  
  // const {userData} = useContext(AppContextProvider)

  useEffect(() => {
    if (atoken) {
      getAllAppointments()
    }
  }, [atoken]);

  return (
    <div>
      <div className="w-full max-w-6xl m-5">
        <p className="mb-3 text-lg font-medium">All Appointment</p>

        
        <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
          
          <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctors</p>
          <p>Fees</p>
          <p>Actions</p>
          </div>


          {
            appointments?.map((item,index)=> (
              <div className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50" key={index}>
                <p className="max-sm:hidden">{index+1}</p>
                <div className="flex items-center gap-2">
                  <img className="w-8 rounded-full" src={item?.userData?.image} alt="" /> <p>{item?.userData?.name}</p>
                </div>
                <p className="max-sm:hidden">{calculateAge(item?.userData?.dob)}</p>
                <p>{item.slotDate}, {new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                | {item.slotTime}</p>

                <div className="flex items-center gap-2">
                  <img className="w-8 rounded-full bg-gray-200" src={item?.docData?.image} alt="" /> <p>{item?.docData?.name}</p>
                </div>
                 <p>{currency}{item.amount}</p>
                
                 
            {
              item.cancelled 
              ?
              <p className="text-red-400 text-xs font-medium">cancelled</p> 
              : item.isCompleted 
              ?<p className="text-green-500 text-xs font-medium">Completed</p> 
               :  <img onClick={()=> CancelAppointment(item._id)} className="w-18 cursor-pointer" src={assets.cancel_icon} alt="" />
            }

                </div>
            ))
          }

        </div>
      

      </div>

   
    </div>
  );
};

export default AllAppointments;
