import { createContext, useContext, useState, useEffect } from "react";

const defaultValue = {
  isMapsReady: false,
  isMapsPending: false,
  maps: null,
};

export const GoogleMapsContext = createContext(defaultValue);

export const useGoogleMaps = () => {
  return useContext(GoogleMapsContext);
};

export const GoogleMapsProvider = ({ children }) => {
  const [isMapsReady, setIsMapsReady] = useState(false);
  const [isMapsPending, setIsMapsPending] = useState(false);

  useEffect(() => {
    if (isMapsReady || isMapsPending) return;
    setIsMapsPending(true);

    const script = document.createElement("script");

    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsMapsReady(true);
      setIsMapsPending(false);
    };

    document.getElementsByTagName("body")[0].appendChild(script);
  }, [isMapsReady]);

  return (
    <GoogleMapsContext.Provider
      value={{
        isMapsReady,
        isMapsPending,
      }}
    >
      {children}
    </GoogleMapsContext.Provider>
  );
};
