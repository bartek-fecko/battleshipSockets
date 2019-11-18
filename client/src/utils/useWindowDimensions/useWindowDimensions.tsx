import * as React from 'react';

const getWindowDimensions = () => {
   const { innerWidth: width, innerHeight: height } = window;
   return {
      height,
      width,
   };
};

export default function useWindowDimensions() {
   const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

   React.useEffect(() => {
      function handleResize() {
         setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   return windowDimensions;
}
