import { ReactNode } from 'react'

interface HomeLayoutProps {
  children: ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col gap-y-10 bg-gray-100 p-10">
      <p className="text-center text-[4rem] font-bold leading-[4rem] text-primary-purple">
        Catknow 🐾
      </p>
      {children}
    </div>
  )
}

export default HomeLayout
