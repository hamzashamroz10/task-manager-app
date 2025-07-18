import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Sparkles, Home, ListChecks, CheckCircle2, Lightbulb, Menu, X } from 'lucide-react'


const TIP_CARD = {
     container: "bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl p-4 border border-purple-100",
    iconWrapper: "p-2 bg-purple-100 rounded-lg",
    title: "text-sm font-semibold text-gray-800",
    text: "text-xs text-gray-600 mt-1",
};

const LINK_CLASSES = {
  base: "group flex items-center px-4 py-3 rounded-xl transition-all duration-300",
  active: "bg-gradient-to-r from-purple-50 to-fuchsia-50 border-l-4 border-purple-500 text-purple-700 font-medium shadow-sm",
  inactive: "hover:bg-purple-50/50 text-gray-600 hover:text-purple-700",
  icon: "transition-transform duration-300 group-hover:scale-110 text-purple-500",
  label: " text-sm font-medium ml-2",
}

const menuItems = [
  {
    text: "Dashboard",
    path: "/",
    icon: <Home className="w-5 h-5" />,
  },
  {
    text: "Pending Tasks",
    path: "/pending",
    icon: <ListChecks className="w-5 h-5" />,
  },
  {
    text: "Completed Tasks",
    path: "/complete",
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
];

const Sidebar = ({ user, tasks }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const totalTask = tasks?.length || 0
  const completedTasks = tasks?.filter((t) => t.completed).length || 0
  const productivity = totalTask > 0
    ? Math.round((completedTasks / totalTask) * 100)
    : 0

  const username = user?.name || "User"
  const initial = username.charAt(0).toUpperCase()

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto"
    return () => (document.body.style.overflow = "auto")
  }, [mobileOpen])

  const renderMenuItems = (isMobile = false) => (
    <ul className="space-y-2">
      {menuItems.map(({ text, path, icon }) => (
        <li key={text}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              [
                LINK_CLASSES.base,
                isActive ? LINK_CLASSES.active : LINK_CLASSES.inactive,
                isMobile ? "justify-start" : "lg:justify-start",
              ].join(" ")
            }
            onClick={() => setMobileOpen(false)}
          >
            <span className={LINK_CLASSES.icon}>{icon}</span>
            <span className={`${isMobile ? "block" : "hidden lg:block"}${LINK_CLASSES.label}`}>{text}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <div className="hidden lg:flex flex-col fixed h-full w-20 lg:w-64 bg-white/90 backdrop-blur-sm border-r border-purple-100 shadow-sm z-20 transition-all duration-300">
        <div className='p-5 border-b border-purple-100 lg:block hidden w-full'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md'>
              {initial}
            </div>
            <div>
              <h2 className='text-lg font-bold text-gray-800'>Hey, {username}</h2>
              <p className='text-sm text-purple-500 font-medium flex items-center gap-1'>
                <Sparkles className='w-3 h-3' />
                Let's crush some tasks
              </p>
            </div>
          </div>

          <div className='p-4 space-y-6 overflow-y-auto flex-1 w-full'>
            <div className='bg-purple-50/50 rounded-xl p-3 border border-purple-100'>
              <div className="flex items-center justify-between mb-2">
                <h3 className='text-xs font-semibold text-purple-700'>PRODUCTIVITY</h3>
                <span className='text-xs bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full'>{productivity}%</span>
              </div>
              <div className="w-full h-2 bg-purple-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-600 animate-pulse"
                  style={{ width: `${productivity}%` }}
                />
              </div>
            </div>
          </div>

          {renderMenuItems()}
          
         

         <div className="mt-auto pt-6 lg:block hidden">
  <div className={TIP_CARD.container}>
    <div className="flex items-center gap-2">
      <div className={TIP_CARD.iconWrapper}>
        <Lightbulb className="w-5 h-5 text-purple-600" />
      </div>
      <div>
        <h3 className={TIP_CARD.title}>Pro Tip</h3>
        <p className={TIP_CARD.text}>
          Use keyboard shortcuts to boost productivity!
        </p>
        
      </div>
    </div>
  </div>
</div>
        </div>
      </div>


     {!mobileOpen && (
       <button
    onClick={() => setMobileOpen(true)}
    className="absolute lg:hidden  top-25 left-5 z-50 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transitionn"
     >
    <Menu className="w-5 h-5 text-gray-700" />
    </button>
      )}

      {mobileOpen && (
  <div className="fixed inset-0 z-40">
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm' onClick={() => setMobileOpen(false)} />

    <div className='absolute top-0 left-0 w-64 h-full bg-white/90 backdrop-blur-md border-r border-purple-100 shadow-lg z-50 p-4 flex flex-col space-y-6' onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h1 className="text-lg font-bold text-purple-600">Menu</h1>
        <button onClick={() => setMobileOpen(false)} className="text-gray-700 hover:text-purple-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
          {initial}
        </div>
        
         <div>
              <h2 className='text-lg font-bold mt-16 text-gray-800'>Hey, {username}</h2>
              <p className='text-sm text-purple-500 font-medium flex items-center gap-1'>
                <Sparkles className='w-3 h-3' />
                Let's crush some tasks
              </p>
            </div>


      </div>
      {renderMenuItems(true)}
    </div>
  </div>
)}

      </>
  )
}

export default Sidebar
