import React, { useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import { Cart, Chat, Notification, UserProfile } from './index';
import { useStateContext } from '../contexts/ContextProvider'
import { Dropdown, message, Space } from 'antd';
import { BiDownArrow } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent
    content={title}
    position='BottomCenter'
  >
    <button
      type='button'
      onClick={customFunc}
      style={{
        color
      }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'
      />
      {icon}
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const navigate = useNavigate();
  const {
    setActiveMenu,
    handleClick,
    isClicked,
    screenSize,
    setScreenSize,
    currentColor
  } = useStateContext();
  const User = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) setActiveMenu(false);
    else setActiveMenu(true);
  }, [screenSize, setActiveMenu]);
  const items = [
    {
      label: 'Đăng xuất',
      key: '1',
    },

  ];
  const onClick = ({ key }) => {
    message.success("Đăng xuất thành công")
    localStorage.removeItem("user")
    navigate("/dang-nhap")
  };
  return (
    <nav className='flex justify-between p-2 md:mx-6 relative'>
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu(preActiveMenu => !preActiveMenu)}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className='flex'>


        <div
          className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'
          onClick={() => handleClick('userProfile')}
        >

          <p>
            <Dropdown
              menu={{
                items,
                onClick,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Hi, {(User?.Quyen == 0 ? "Nhân viên - " : "Admin - ") + User?.TenNV}

                </Space>
              </a>
            </Dropdown>
          </p>

          <MdKeyboardArrowDown className='text-gray-400 text-14' />
        </div>
        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.UserProfile && <UserProfile />}
      </div>
    </nav>
  )
}

export default Navbar