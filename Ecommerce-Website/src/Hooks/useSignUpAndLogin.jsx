import { toast } from "react-toastify"

export function SignUpLocalStorage({ name, email, password }) {

    const isNameAvailable=localStorage.getItem('NAME')
    const isEmailAvailable=localStorage.getItem('EMAIL')
    const isPasswordAvailable=localStorage.getItem('PASSWORD')


   
    
  try {
    localStorage.setItem('NAME', name);
    localStorage.setItem('EMAIL', email);
    localStorage.setItem('PASSWORD', password);
    toast('signed Up successfully')
  } catch (err) {
    console.error('Error saving sign-up data:', err);
  }
  
  
}
