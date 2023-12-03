
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ThemeSettings from "./ThemeSettings";

const Layout = () => {
    const {
        activeMenu,
        themeSettings,
        setThemeSettings,
        currentColor,
        currentMode
    } = useStateContext();

    const navigate = useNavigate();


    useEffect(() => {
        const isLoggedIn = localStorage.getItem('user');

        if (!isLoggedIn) {
            navigate("/dang-nhap")
        }
    }, [])

    return (
        <div className={`${currentMode === 'Dark' ? 'dark' : ''}`}>
            <div className='flex relative dark:bg-main-dark-bg'>
                <div className='fixed right-4 bottom-4' style={{ zIndex: 1000 }}>
                    <TooltipComponent
                        content='Settings'
                        position='Top'
                    >
                        <button
                            type='button'
                            className='text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white'
                            style={{
                                background: currentColor,
                                borderRadius: '50%'
                            }}
                            onClick={() => setThemeSettings(true)}
                        >
                            <FiSettings />
                        </button>
                    </TooltipComponent>
                </div>
                {
                    activeMenu ? (
                        <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                            <Sidebar />
                        </div>
                    ) :
                        (
                            <div className='w-0 dark:bg-secondary-dark-bg'>
                                <Sidebar />
                            </div>
                        )
                }
                <div
                    className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${activeMenu ? ' md:ml-72' : 'flex-2 '}`}
                >
                    <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
                        <Navbar />
                    </div>
                    <div>
                        {
                            themeSettings && <ThemeSettings />
                        }
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>


    )
};

export default Layout;
