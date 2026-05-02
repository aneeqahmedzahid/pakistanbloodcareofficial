import React from 'react'
import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'

const PageStub: React.FC<{ title: string }> = ({ title }) => (
  <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-900">
    <Navbar />
    <main className="flex-grow flex items-center justify-center pt-20">
      <h1 className="text-3xl font-bold dark:text-white">{title} (Coming Soon)</h1>
    </main>
    <Footer />
  </div>
)

export default PageStub
