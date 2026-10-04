import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function DeliveryPortal({ onClose }) {
    const [pincode,setPincode]=useState('')
    const [successMessage,setSuccessMessage]=useState('')
    const inputRef=useRef()
    const [errorMessage,setErrorMessage]=useState('')
    function handleCheck(e){
      e.preventDefault()

        if(pincode.length !== 6){
          
                setErrorMessage('Pincode Length is not valid') 
                if(inputRef.current){
                  inputRef.current.focus()
                }
            return
        }
        setErrorMessage('')

        setSuccessMessage('Delivery Available at your location')
        

    }
  return createPortal(

    <div
      className="fixed inset-0 bg-[#0000005e] flex items-center justify-center z-50 font-[Poppins]"
      onClick={onClose}
    >
      <div
        className="bg-[#ffffffe6] p-8 rounded-lg shadow-lg flex flex-col gap-y-1"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="text-xl font-semibold">Delivery Availability check</h2>
        <input type="number" value={pincode} ref={inputRef} onChange={(e)=>setPincode(e.target.value)}  autoFocus={true}  className=" my-4 px-2.5 text-2xl outline-none border  [appearance:textfield] 
    [&::-webkit-inner-spin-button]:appearance-none 
    [&::-webkit-outer-spin-button]:appearance-none" placeholder="Enter Pincode"></input>
           {
            errorMessage ?  <h3 className="font-bold text-sm text-red-600">{errorMessage}</h3> :  <h3 className="font-bold text-sm text-green-500">{successMessage}</h3>
           }
          <button className="p-2 bg-green-500 text-white rounded" onClick={handleCheck}>Check</button>
        <button
          onClick={onClose}
          className="p-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>,
    document.querySelector('#portal')
  );
}
