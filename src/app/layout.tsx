import Notification from '@/Components/Notification'
import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'
import AuthProvider from '@/Components/AuthProvider'
import QueryProvider from '@/Components/QueryProvider'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Haroumo Restaurant',
  description: 'Best Food',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
          <QueryProvider>
            <AuthProvider>
              <div>
                <Notification/>
                <Navbar/>
                  {children}
                <Footer/>
                <ToastContainer position='bottom-right' theme='dark' autoClose={3000}/>
              </div>
            </AuthProvider>
          </QueryProvider>
        </body>
    </html>
  )
}
