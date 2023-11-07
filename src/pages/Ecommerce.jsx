import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go';

import { Stacked, Button, SparkLine } from '../components';

import {
  earningData,
  SparklineAreaData,
} from '../data/dummy';

import { useStateContext } from '../contexts/ContextProvider';
import { MdAccountCircle, MdOutlineSupervisorAccount } from 'react-icons/md';
import { BsBoxSeam } from 'react-icons/bs';
import { FiBarChart } from 'react-icons/fi';
import { HiOutlineRefresh } from 'react-icons/hi';
import { RiAccountPinBoxLine } from 'react-icons/ri';
import useAsync from '../hook/useAsync';
import ServiceSanPham from '../service/ServiceSanPham';
import ServiceCustomer from '../service/ServiceCustomer';
import ServiceEmployee from '../service/ServiceEmployee';
import { AiOutlineDeliveredProcedure } from 'react-icons/ai';
import { SiBrandfolder } from 'react-icons/si';
import { BiCategory, BiCategoryAlt } from 'react-icons/bi';
import ServiceDanhMuc from '../service/ServiceDanhMuc';
import ServiceOrder from '../service/ServiceOrder';
import ServiceDeliveryReceipt from '../service/ServiceDeliveryReceipt';
import ServiceAccount from '../service/ServiceAccount';
import ServiceNhanHang from '../service/ServiceNhanHang';


const Ecommerce = () => {

  const { currentColor } = useStateContext();
  const { data: sanPham } = useAsync(() => ServiceSanPham.getAllSanPham())
  const { data: customer } = useAsync(() => ServiceCustomer.getAllCustomer())
  const { data: employee } = useAsync(() => ServiceEmployee.getAllEmployee())
  const { data: danhmuc } = useAsync(() => ServiceDanhMuc.getAllDanhMuc())
  const { data: hoaDon } = useAsync(() => ServiceOrder.getAllOrder())
  const { data: delivery } = useAsync(() => ServiceDeliveryReceipt.getAllDeliveryReceipt())
  const { data: account } = useAsync(() => ServiceAccount.getAllAccount())
  const { data: nhanhang } = useAsync(() => ServiceNhanHang.getAllNhanHang())

  return (
    <div className='mt-12'>
      <div className='flex flex-wrap lg:flex-nowrap justify-center'>

        <div className='flex m-3 flex-wrap justify-center gap-1 items-center'>

          <div

            className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl'
          >
            <button
              type='button'
              style={{
                color: "#03C9D7",
                backgroundColor: "#E5FAFB",
              }}
              className='text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl'
            >
              <MdOutlineSupervisorAccount />
            </button>
            <p
              className='mt-3'
            >
              <span className='text-lg font-semibold'>
                {Array.isArray(customer) ? customer.length : 0}
              </span>

            </p>
            <p className='text-sm text-gray-400 mt-1'>
              Khách hàng
            </p>
          </div>
          <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl'>
            <button
              type='button'
              style={{
                color: "rgb(255, 244, 229)",
                backgroundColor: "rgb(254, 201, 15)",
              }}
              className='text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl'
            >
              <BsBoxSeam />
            </button>
            <p
              className='mt-3'
            >
              <span className='text-lg font-semibold'>
                {Array.isArray(sanPham) ? sanPham.length : 0}
              </span>

            </p>
            <p className='text-sm text-gray-400 mt-1'>
              Sản phẩm
            </p>
          </div>
          <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl'>
            <button
              type='button'
              style={{
                color: "rgb(228, 106, 118)",
                backgroundColor: "rgb(255, 244, 229)",
              }}
              className='text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl'
            >
              <FiBarChart />
            </button>
            <p
              className='mt-3'
            >
              <span className='text-lg font-semibold'>
                {Array.isArray(hoaDon) ? hoaDon.length : 0}

              </span>

            </p>
            <p className='text-sm text-gray-400 mt-1'>
              Hóa đơn
            </p>
          </div>
          <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl'>
            <button
              type='button'
              style={{
                color: "rgb(0, 194, 146)",
                backgroundColor: "rgb(235, 250, 242)",
              }}
              className='text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl'
            >
              <RiAccountPinBoxLine />
            </button>
            <p
              className='mt-3'
            >
              <span className='text-lg font-semibold'>
                {Array.isArray(employee) ? employee.length : 0}
              </span>

            </p>
            <p className='text-sm text-gray-400 mt-1'>
              Nhân viên
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap lg:flex-nowrap justify-center'>
        <div className='flex m-3 flex-wrap justify-center gap-1 items-center'>
          <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl'>
            <button
              type='button'
              style={{
                color: "rgb(35 47 240)",
                backgroundColor: "rgb(218 223 255)",
              }}
              className='text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl'
            >
              <BiCategoryAlt />
            </button>
            <p
              className='mt-3'
            >
              <span className='text-lg font-semibold'>
                {Array.isArray(danhmuc) ? danhmuc.length : 0}

              </span>

            </p>
            <p className='text-sm text-gray-400 mt-1'>
              Danh mục
            </p>
          </div>
          <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl'>
            <button
              type='button'
              style={{
                color: "rgb(232 26 138)",
                backgroundColor: "rgb(255 214 235)",
              }}
              className='text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl'
            >
              <SiBrandfolder />
            </button>
            <p
              className='mt-3'
            >
              <span className='text-lg font-semibold'>
                {Array.isArray(nhanhang) ? nhanhang.length : 0}

              </span>

            </p>
            <p className='text-sm text-gray-400 mt-1'>
              Nhãn hàng
            </p>
          </div>
          <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl'>
            <button
              type='button'
              style={{
                color: "rgb(0 0 0)",
                backgroundColor: "rgb(219 219 219)",
              }}
              className='text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl'
            >
              <AiOutlineDeliveredProcedure />
            </button>
            <p
              className='mt-3'
            >
              <span className='text-lg font-semibold'>
                {Array.isArray(delivery) ? delivery.length : 0}

              </span>

            </p>
            <p className='text-sm text-gray-400 mt-1'>
              Phiếu nhập
            </p>
          </div>
          <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl'>
            <button
              type='button'
              style={{
                color: "rgb(190 0 253)",
                backgroundColor: "rgb(238 207 255)",
              }}
              className='text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl'
            >
              <MdAccountCircle />
            </button>
            <p
              className='mt-3'
            >
              <span className='text-lg font-semibold'>
                {Array.isArray(account) ? account.length : 0}

              </span>

            </p>
            <p className='text-sm text-gray-400 mt-1'>
              Tài khoản
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ecommerce