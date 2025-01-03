import '@/assets/styles/global.css'
import Navbar from "./components/Navbar"
import Footer from './components/Footer'

export const metadata = {
    title:'Property Pulse',
    keywords:'rental, property, real-estate'
}

const MainLayout = ({children}) => {
    return(<html>
        <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </body>
    </html>)
}

export default MainLayout;