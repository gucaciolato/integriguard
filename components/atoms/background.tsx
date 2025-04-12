"use client"

export default function Background() {
  return (
    <>
      <style jsx global>{`
        body {
          background: linear-gradient(135deg, #ffffff 0%, #fff5eb 100%);
          position: relative;
          min-height: 100vh;
        }
        
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='2' fill='%23ff7700' fillOpacity='0.1'/%3E%3C/svg%3E");
          background-size: 30px 30px;
          opacity: 0.5;
          pointer-events: none;
          z-index: 0;
        }
        
        body::after {
          content: '';
          position: fixed;
          bottom: -50%;
          right: -20%;
          width: 80%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,119,0,0.05) 0%, rgba(255,255,255,0) 70%);
          z-index: 0;
        }
        
        #__next, main {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </>
  )
}
