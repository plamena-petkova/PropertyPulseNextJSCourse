import '@/assets/styles/global.css'

export const metadata = {
    title:'Property Pulse',
    keywords:'rental, property, real-estate'
}

const MainLayout = ({children}) => {
    return(<html>
        <body>
            <main>{children}</main>
        </body>
    </html>)
}

export default MainLayout;