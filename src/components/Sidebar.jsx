import React from 'react'

import { Link, NavLink } from 'react-router-dom'
import { AiOutlineBranches, AiOutlineDeliveredProcedure, AiOutlineShoppingCart } from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';
import { IoMdContacts } from 'react-icons/io';
import { RiAccountPinBoxLine, RiBillLine, RiContactsLine, RiCoupon3Line } from 'react-icons/ri';


import { SiBrandfolder, SiMysql, SiShopware } from 'react-icons/si';
import { MdAccountCircle, MdCameraRear, MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


import { useStateContext } from '../contexts/ContextProvider';
import { BiCategory } from 'react-icons/bi';
import { BsFillPeopleFill, BsHouse, BsBoxSeam } from 'react-icons/bs';

const links = [

  {
    title: 'Thống kê',
    links: [
      {
        href: 'trang-chu',
        name: 'Trang chủ',
        icon: <FiShoppingBag />,
      },
    ],
  },

  {
    title: 'Danh sách',
    links: [
      {
        name: 'Sản phẩm',
        href: 'san-pham',
        icon: <BsBoxSeam />,
      },
      {
        name: 'Mã giảm giá',
        href: 'ma-giam-gia',
        icon: <RiCoupon3Line />,
      },
      {
        name: 'Danh mục',
        href: 'danh-muc',
        icon: <BiCategory />,
      },
      {
        name: 'Hóa đơn',
        href: 'hoa-don',
        icon: <RiBillLine />,
      },
      {
        name: 'Khách hàng',
        href: 'khach-hang',
        icon: <BsFillPeopleFill />,
      },
      {
        name: 'Kho',
        href: 'kho',
        icon: <BsHouse />,
      },
      {
        name: 'Nhãn hàng',
        href: 'nhan-hang',
        icon: <SiBrandfolder />,
      },
      {
        name: 'Phiếu nhập',
        href: 'phieu-nhap',
        icon: <AiOutlineDeliveredProcedure />,
      },

    ],
  },


];
const linksAdmin = [

  {
    title: 'Thống kê',
    links: [
      {
        href: 'trang-chu',
        name: 'Trang chủ',
        icon: <FiShoppingBag />,
      },
    ],
  },

  {
    title: 'Danh sách',
    links: [
      {
        name: 'Sản phẩm',
        href: 'san-pham',
        icon: <BsBoxSeam />,
      },
      {
        name: 'Mã giảm giá',
        href: 'ma-giam-gia',
        icon: <RiCoupon3Line />,
      },
      {
        name: 'Danh mục',
        href: 'danh-muc',
        icon: <BiCategory />,
      },
      {
        name: 'Hóa đơn',
        href: 'hoa-don',
        icon: <RiBillLine />,
      },
      {
        name: 'Khách hàng',
        href: 'khach-hang',
        icon: <BsFillPeopleFill />,
      },
      {
        name: 'Kho',
        href: 'kho',
        icon: <BsHouse />,
      },
      {
        name: 'Nhãn hàng',
        href: 'nhan-hang',
        icon: <SiBrandfolder />,
      },
      {
        name: 'Phiếu nhập',
        href: 'phieu-nhap',
        icon: <AiOutlineDeliveredProcedure />,
      },

    ],
  },
  {
    title: "Quản trị",
    links: [
      {
        name: 'Chi nhánh',
        href: 'chi-nhanh',
        icon: <AiOutlineBranches />,
      },
      {
        name: 'Khu vực',
        href: 'khu-vuc',
        icon: <MdCameraRear />,
      },

      {
        name: 'Tài khoản',
        href: 'tai-khoan',
        icon: <MdAccountCircle />,
      },

      {
        name: 'Nhân viên',
        href: 'nhan-vien',
        icon: <RiAccountPinBoxLine />,
      },
    ]
  }

];

const Sidebar = () => {
  const User = JSON.parse(localStorage.getItem('user'));
  const {
    activeMenu,
    setActiveMenu,
    screenSize,
    currentColor
  } = useStateContext();

  const handleCloseSideBar = () => {
    if (screenSize && screenSize <= 900)
      setActiveMenu(false)
  }

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';

  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pd-10'>
      {
        activeMenu && (
          <>
            <div className='flex justify-between items-center'>
              <Link
                to='/'
                onClick={handleCloseSideBar}
                className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900'
              >
                <SiShopware /> <span>Mỹ Phẩm</span>
              </Link>
              <TooltipComponent
                content='Menu'
                position='BottomCenter'
              >
                <button
                  type='button'
                  onClick={() => setActiveMenu(false)}
                  className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'
                >
                  <MdOutlineCancel />
                </button>
              </TooltipComponent>
            </div>
            <div
              className='mt-10'
            >
              {User?.Quyen == "0" ?
                links.map((item, index) => (
                  <div key={index}>
                    <p className='text-gray-400 m-3 mt-4 uppercase'>
                      {item.title}
                    </p>
                    {
                      item.links.map((link, index) => (
                        <NavLink
                          to={`/${link.href}`}
                          key={index}
                          onClick={handleCloseSideBar}
                          style={
                            ({ isActive }) => ({ backgroundColor: isActive ? currentColor : '' })
                          }
                          className={({ isActive }) =>
                          (
                            isActive ? activeLink : normalLink
                          )
                          }
                        >
                          {link.icon}
                          <span
                            className='capitalize'
                          >
                            {link.name}
                          </span>
                        </NavLink>
                      ))
                    }
                  </div>
                )) :
                linksAdmin.map((item, index) => (
                  <div key={index}>
                    <p className='text-gray-400 m-3 mt-4 uppercase'>
                      {item.title}
                    </p>
                    {
                      item.links.map((link, index) => (
                        <NavLink
                          to={`/${link.href}`}
                          key={index}
                          onClick={handleCloseSideBar}
                          style={
                            ({ isActive }) => ({ backgroundColor: isActive ? currentColor : '' })
                          }
                          className={({ isActive }) =>
                          (
                            isActive ? activeLink : normalLink
                          )
                          }
                        >
                          {link.icon}
                          <span
                            className='capitalize'
                          >
                            {link.name}
                          </span>
                        </NavLink>
                      ))
                    }
                  </div>
                ))
              }
            </div>
          </>
        )
      }
    </div>
  )
}

export default Sidebar