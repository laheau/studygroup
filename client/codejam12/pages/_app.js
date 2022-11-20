import '../styles/globals.css'
import Navbar from './components/UI/Navbar'
import ResponsiveAppBar from './components/UI/ResponsiveAppBar'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <ResponsiveAppBar />
  <Component {...pageProps} />
    </>
  )
}

export default MyApp
