import '../styles/globals.css'
import Navbar from './components/UI/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Navbar />
  <Component {...pageProps} />
    </>
  )
}

export default MyApp
