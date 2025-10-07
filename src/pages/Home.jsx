import React, { useEffect, useState } from 'react'
import DesktopHome from '../components/DesktopHome'
import MobileHome from '../components/MobileHome'

function Home(){

    const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile? <MobileHome /> : <DesktopHome />
}

export default Home