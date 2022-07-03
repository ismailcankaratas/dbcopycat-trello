import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  function sidebarHandler() {
    setSidebar(!sidebar);
  }

  useEffect(() => {
    if (!session?.user) {
      router.push('/login');
    }
  }, [session?.user]);

  const logoutClickHandler = () => {
    signOut({ callbackUrl: '/login' });
  }
  return (
    <>
      {/* Sidebar starts */}
      {/* Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] */}
      <div className="w-64 absolute sm:relative dark:bg-gray-800 shadow md:h-full flex-col justify-between hidden sm:flex">
        <div className="px-8">
          <div className="h-16 w-full flex items-center">
            <img src="https://a.trellocdn.com/prgb/dist/images/header-logo-spirit.d947df93bc055849898e.gif" alt="" />
          </div>
          <ul className="mt-12">
            <a href="/">
              <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <rect x={4} y={4} width={6} height={6} rx={1} />
                    <rect x={14} y={4} width={6} height={6} rx={1} />
                    <rect x={4} y={14} width={6} height={6} rx={1} />
                    <rect x={14} y={14} width={6} height={6} rx={1} />
                  </svg>
                  <span className="text-sm  ml-2">Pano</span>
                </div>
                <div className="py-1 px-3 bg-gray-700 rounded text-gray-300 flex items-center justify-center text-xs">
                  {/* {JSON.parse(localStorage.getItem("localList")).length} */}
                  0
                </div>
              </li>
            </a>

          </ul>
        </div>
        <div className="px-4 border-t border-gray-700">
          <div className="w-full flex items-center justify-between bg-gray-800">
            <div className="text-white pt-5 pb-3">
              <span className='bg-blue-500 p-4 py-2 rounded'>
                {session?.user.name}
              </span>
            </div>
            <div className='cursor-pointer text-red-500 pt-5 pb-3' onClick={logoutClickHandler}>
              Çıkış yap
            </div>
          </div>
        </div>
      </div>


      {/* MOBİLE */}
      <div className={`w-64 h-full z-40 absolute ${sidebar ? "" : "bg-gray-800 shadow"} md:h-full flex-col justify-between sm:hidden transition duration-150 ease-in-out`} id="mobile-nav">
        <div className={`h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer ${sidebar ? "left-0" : "right-0"}`} id="mobile-toggler" onClick={() => sidebarHandler()}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-adjustments" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFFFFF" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx={6} cy={10} r={2} />
            <line x1={6} y1={4} x2={6} y2={8} />
            <line x1={6} y1={12} x2={6} y2={20} />
            <circle cx={12} cy={16} r={2} />
            <line x1={12} y1={4} x2={12} y2={14} />
            <line x1={12} y1={18} x2={12} y2={20} />
            <circle cx={18} cy={7} r={2} />
            <line x1={18} y1={4} x2={18} y2={5} />
            <line x1={18} y1={9} x2={18} y2={20} />
          </svg>
        </div>

        <div className={`px-8 ${sidebar && "hidden"} transition duration-150 ease-in-out`}>
          <div className="h-16 w-full flex items-center">
            <img src="https://a.trellocdn.com/prgb/dist/images/header-logo-spirit.d947df93bc055849898e.gif" alt="" />
          </div>
          <ul className="mt-12">
            <a href="/">
              <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <rect x={4} y={4} width={6} height={6} rx={1} />
                    <rect x={14} y={4} width={6} height={6} rx={1} />
                    <rect x={4} y={14} width={6} height={6} rx={1} />
                    <rect x={14} y={14} width={6} height={6} rx={1} />
                  </svg>
                  <span className="text-sm  ml-2">Pano</span>
                </div>
                <div className="py-1 px-3 bg-gray-700 rounded text-gray-300 flex items-center justify-center text-xs">
                  {/* {JSON.parse(localStorage.getItem("localList")).length} */}
                  0
                </div>
              </li>
            </a>
          </ul>
          <div className="flex justify-center mt-48 mb-4 w-full">
            <div className="relative ">
              <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx={10} cy={10} r={7} />
                  <line x1={21} y1={21} x2={15} y2={15} />
                </svg>
              </div>
              <input className=" bg-gray-700 focus:outline-none rounded w-full text-sm text-gray-500 bg-gray-100 pl-10 py-2" type="text" placeholder="Search" />
            </div>
          </div>
        </div>
        <div className={`border-t border-gray-700 ${sidebar && "hidden"} transition duration-150 ease-in-out`}>
          <div className="px-4 border-t border-gray-700">
            <div className="w-full flex items-center justify-between bg-gray-800">
              <div className="text-white pt-5 pb-3">
                <span className='bg-blue-500 p-4 py-2 rounded'>
                  {session?.user.name}
                </span>
              </div>
              <div className='cursor-pointer text-red-500 pt-5 pb-3' onClick={logoutClickHandler}>
                Çıkış yap
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sidebar ends */}
    </>
  );
}

export default Sidebar;
