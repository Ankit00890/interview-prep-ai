import React from 'react'

const DeleteAlertContent = ({
    content,
    onDelete
}) => {
  return (
 <div className="p-5">
    <p className="text-[14px]">{content}</p>

   <div className="flex justify-end mt-6">
  <button
    type="button"
    onClick={onDelete}
    className="px-4 py-2 text-sm font-medium  
               border  rounded-md 
               hover:bg-orange-500 hover:text-white
               transition duration-200 ease-in-out"
  >
    Delete
  </button>

    </div>
 </div>
  )
}

export default DeleteAlertContent