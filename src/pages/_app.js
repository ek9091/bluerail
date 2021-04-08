import { AuthProvider } from "../lib/app/data-state";
import { GoogleMapsProvider } from "../lib/shared/util-hooks";
import "./globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <GoogleMapsProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}>
        <Component {...pageProps} />
      </GoogleMapsProvider>
    </AuthProvider>
  );
}

export default MyApp;
