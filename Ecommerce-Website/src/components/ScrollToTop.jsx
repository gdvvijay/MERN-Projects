import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top of the page on every navigation
    window.scrollTo(0, 0);
  }, [location]); // Trigger the effect whenever the location object changes

  return null;
}