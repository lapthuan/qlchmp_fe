import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceEmployee from "../service/ServiceEmployee";

const Login = () => {
    const [taikhoan, setTaiKhoan] = useState()
    const [matkhau, setMatKhau] = useState()
    const navigate = useNavigate();
    const handlerLogin = async () => {
        const body = {
            taikhoan: taikhoan,
            matkhau: matkhau
        }
        const res = await ServiceEmployee.loginEmployee(body)
 
        if (res.message) {
            message.warning("Sai tài khoản hoặc mật khẩu")
        } else {
            message.success("Đăng nhập thành công")
            localStorage.setItem("user", JSON.stringify(res[0]));
            navigate("/")
        }
    }

    return (
        <>
            <div className="py-16">
                <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                    <div className="hidden lg:block lg:w-1/2 bg-cover"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')" }}>
                    </div>
                    <div className="w-full p-8 lg:w-1/2">
                        <h2 className="text-2xl font-semibold text-gray-700 text-center">Cửa Hàng Mỹ Phẩm</h2>
                        <p className="text-xl text-gray-600 text-center">Đăng nhập quản trị</p>


                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Tài khoản</label>
                            <input onChange={(e) => setTaiKhoan(e.target.value)} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" />
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Mật khẩu</label>

                            </div>
                            <input onChange={(e) => setMatKhau(e.target.value)} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" />
                        </div>
                        <div className="mt-8">
                            <button onClick={handlerLogin} className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Đăng nhập</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;