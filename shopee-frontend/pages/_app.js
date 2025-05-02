import '../styles/globals.css'   // ✅ đường dẫn đến file CSS chính

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp;
