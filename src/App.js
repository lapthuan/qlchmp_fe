import './App.css';

import { Routes, Route } from 'react-router-dom';

import {
  Ecommerce,
  Phantan
} from './pages/index'



import { useStateContext } from './contexts/ContextProvider';
import SanPham from './pages/sanpham/SanPham';
import SanPhamChiTiet from './pages/sanpham/SanPhamChiTiet';
import Coupon from './pages/coupon/Coupon';
import CouponChiTiet from './pages/coupon/CouponChiTiet';
import DanhMuc from './pages/danhmuc/DanhMuc';
import HoaDon from './pages/hoadon/HoaDon';
import KhachHang from './pages/khachhang/KhachHang';
import Kho from './pages/kho/Kho';
import NhanHang from './pages/nhanhang/NhanHang';
import PhieuNhap from './pages/phieunhap/PhieuNhap';
import ChiNhanh from './pages/chinhanh/ChiNhanh';
import ChiNhanhChiTiet from './pages/chinhanh/ChiNhanhChiTiet';
import KhuVuc from './pages/KhuVuc';
import TaiKhoan from './pages/taikhoan/TaiKhoan';
import NhanVien from './pages/nhanvien/NhanVien';
import DanhMucChiTiet from './pages/danhmuc/DanhMucChiTiet';
import KhachHangChiTiet from './pages/khachhang/KhachHangChiTiet';
import KhoChiTiet from './pages/kho/KhoChiTiet';
import NhanHangChiTiet from './pages/nhanhang/NhanHangChiTiet';
import NhanVienChiTiet from './pages/nhanvien/NhanVienChiTiet';
import TaiKhoanChiTiet from './pages/taikhoan/TaiKhoanChiTiet';
import HoaDonChiTiet from './pages/hoadon/HoaDonChiTiet';
import ThemHoaDonChiTiet from './pages/hoadon/ThemHoaDonChiTiet';
import HoaDonID from './pages/hoadon/HoaDonID';
import PhieuNhapChiTiet from './pages/phieunhap/PhieuNhapChiTiet';
import PhieuNhapID from './pages/phieunhap/PhieuNhapID';
import ThemPhieuNhapChiTiet from './pages/phieunhap/ThemPhieuNhapChiTiet';
import Layout from './components/layout';
import Login from './pages/login';


const App = () => (


  <Routes>
    <Route path="/dang-nhap" element={<Login />} />
    <Route path="/" element={<Layout />}>
      <Route index element={(<Ecommerce />)} />
      <Route path="/trang-chu" element={(<Ecommerce />)} />

      <Route path="/phan-tan" element={<Phantan />} />

      <Route path="/san-pham" element={<SanPham />} />
      <Route path="/san-pham/:id" element={<SanPhamChiTiet />} />

      <Route path="/ma-giam-gia" element={<Coupon />} />
      <Route path="/ma-giam-gia/:id" element={<CouponChiTiet />} />

      <Route path="/danh-muc" element={<DanhMuc />} />
      <Route path="/danh-muc/:id" element={<DanhMucChiTiet />} />

      <Route path="/hoa-don" element={<HoaDon />} />
      <Route path="/hoa-don/:id" element={<HoaDonID />} />

      <Route path="/hoa-don-chi-tiet/:id" element={<HoaDonChiTiet />} />
      <Route path="/them-hoa-don-chi-tiet" element={<ThemHoaDonChiTiet />} />

      <Route path="/khach-hang" element={<KhachHang />} />
      <Route path="/khach-hang/:id" element={<KhachHangChiTiet />} />


      <Route path="/kho" element={<Kho />} />
      <Route path="/kho/:id" element={<KhoChiTiet />} />

      <Route path="/nhan-hang" element={<NhanHang />} />
      <Route path="/nhan-hang/:id" element={<NhanHangChiTiet />} />

      <Route path="/phieu-nhap" element={<PhieuNhap />} />
      <Route path="/phieu-nhap-chi-tiet/:id" element={<PhieuNhapChiTiet />} />
      <Route path="/phieu-nhap/:id" element={<PhieuNhapID />} />
      <Route path="/them-phieu-nhap-chi-tiet" element={<ThemPhieuNhapChiTiet />} />

      <Route path="/chi-nhanh" element={<ChiNhanh />} />
      <Route path="/chi-nhanh/:id" element={<ChiNhanhChiTiet />} />

      <Route path="/khu-vuc" element={<KhuVuc />} />
      <Route path="/khu-vuc/:id" element={<KhuVuc />} />


      <Route path="/tai-khoan" element={<TaiKhoan />} />
      <Route path="/tai-khoan/:id" element={<TaiKhoanChiTiet />} />


      <Route path="/nhan-vien" element={<NhanVien />} />
      <Route path="/nhan-vien/:id" element={<NhanVienChiTiet />} />
    </Route>
  </Routes>

);


export default App
