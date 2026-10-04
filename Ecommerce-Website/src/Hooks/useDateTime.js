import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY='DATE_tIME'
export default function useDateTime(){
          const [dateTime, setDateTime] = useState(()=>{
            try{
              const availableItem=localStorage.getItem(LOCAL_STORAGE_KEY)

            return availableItem ? JSON.parse(availableItem) : {
        days: 3,
        hours: 23,
        minutes: 59,
        seconds: 60,
        flashSale: true,
      }
            }catch(err){
              console.error('something went wrong: ',err)

              return  {
        days: 3,
        hours: 23,
        minutes: 59,
        seconds: 60,
        flashSale: true,
      }
            }

          });
          useEffect(()=>{
             try {
    
          window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dateTime));
        } catch (error) {
          console.error("Error saving data to localStorage:", error);
        }
          },[dateTime])
    
      useEffect(() => {
        // Set up the interval once when the component mounts
        const intervalId = setInterval(() => {
          // Use the functional update form to avoid stale state
          setDateTime((prev) => {
            // If the sale has ended, do nothing.
            if (!prev.flashSale) {
              clearInterval(intervalId); // Stop the timer
              return prev;
            }
    
            // Create a mutable copy to calculate the new time
            let newTime = { ...prev };
    
            if (newTime.seconds > 0) {
              newTime.seconds -= 1;
            } else {
              // seconds is 0
              newTime.seconds = 59;
              if (newTime.minutes > 0) {
                newTime.minutes -= 1;
              } else {
                // minutes is 0
                newTime.minutes = 59;
                if (newTime.hours > 0) {
                  newTime.hours -= 1;
                } else {
                  // hours is 0
                  newTime.hours = 23;
                  if (newTime.days > 0) {
                    newTime.days -= 1;
                  } else {
                    // days is 0
                    // Timer has finished
                    newTime.flashSale = false;
                  }
                }
              }
            }
            return newTime;
          });
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, []);
      return dateTime;
}