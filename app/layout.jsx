import '@/assets/styles/global.css'
import Navbar from "./components/Navbar"

export const metadata = {
    title:'Property Pulse',
    keywords:'rental, property, real-estate'
}

const MainLayout = ({children}) => {
    return(<html>
        <body>
            <Navbar />
            <main>{children}</main>
        </body>
    </html>)
}

export default MainLayout;