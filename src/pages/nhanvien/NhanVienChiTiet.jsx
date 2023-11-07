
import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space } from "antd";
import useAsync from "../../hook/useAsync";
import ServiceDesignation from "../../service/ServiceDesignation";
import ServiceBranch from "../../service/ServiceBranch";
import ServiceCustomer from "../../service/ServiceCustomer";
import dayjs from "dayjs";
import ServiceEmployee from "../../service/ServiceEmployee";
import { useEffect } from "react";
import { Header } from "../../components";
import { useParams } from "react-router-dom";
const { Option } = Select;

const NhanVienChiTiet = () => {
    const [form] = Form.useForm();

    const { data: branch } = useAsync(() => ServiceBranch.getAllBranch())
    const { id } = useParams()

    useEffect(() => {

        if (id != "add") {
            (async () => {
                const res = await ServiceEmployee.getAEmployee(id)

                if (res) {

                    const ngaysinhfm = dayjs(res[0].NgaySinh, 'YYYY-MM-DD');

                    form.setFieldsValue({

                        manv: res[0].MaNV,
                        machinhanh: res[0].MaCN,

                        tennv: res[0].TenNV,
                        gioitinh: res[0].GioiTinh,
                        diachi: res[0].Diachi,
                        sdt: res[0].Sdt,
                        ngaysinh: ngaysinhfm
                    });

                }
            })();
        } else {
            form.resetFields()
        }
    }, [id])
    const onFinish = async (values) => {
        message.loading("Đang xử lý")
        if (id != "add") {
            const ngaysinh = dayjs(values.ngaysinh).format('YYYY-MM-DD HH:mm:ss')
            const body = {
                "reqMaNV": values.manv,
                "reqMaCN": values.machinhanh,

                "reqTenNV": values.tennv,
                "reqNgaySinh": ngaysinh,
                "reqGioiTinh": values.gioitinh,
                "reqDiachi": values.diachi,
                "reqSdt": values.sdt,


            }

            const res = await ServiceEmployee.editEmployee(body, id)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {
            const ngaysinh = dayjs(values.ngaysinh).format('YYYY-MM-DD HH:mm:ss')

            const body = {
                "reqMaNV": values.manv,
                "reqMaCN": values.machinhanh,

                "reqTenNV": values.tennv,
                "reqNgaySinh": ngaysinh,
                "reqGioiTinh": values.gioitinh,
                "reqDiachi": values.diachi,
                "reqSdt": values.sdt,
            }

            const res = await ServiceEmployee.createEmployee(body)

            if (res.message == "Lỗi khi thêm vào SQL Server") {
                message.warning("Mã nhân viên đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm thành công!") {
                message.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        }


    };
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category={id == "add" ? "Thêm nhân viên" : "Sửa nhân viên"} />
            <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="manv"
                            label="Mã nhân viên"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã nhân viên',
                                },
                            ]}
                        >
                            <Input disabled={id != "add" ? true : false} placeholder="Nhập mã nhân viên" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="tennv"
                            label="Họ tên"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên nhân viên',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên nhân viên" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="ngaysinh"
                            label="Ngày sinh"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn ngày sinh',
                                },
                            ]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                format="DD-MM-YYYY"
                                placeholder="Chọn ngày sinh" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="gioitinh"
                            label="Giới tính"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn giới tính',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn giới tính">
                                <Option value="Nam">Nam</Option>
                                <Option value="Nu">Nữ</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="diachi"
                            label="Địa chỉ"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập địa chỉ',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập địa chỉ" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="sdt"
                            label="Số điện thoại"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập số điện thoại',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="machinhanh"
                            label="Chi nhánh"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn chi nhánh',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn chi nhánh">
                                {
                                    Array.isArray(branch) &&
                                    branch.map((item, i) => (
                                        <Option key={i + 1} value={item.MaCN}>{item.TenCN}</Option>
                                    ))}


                            </Select>
                        </Form.Item>
                    </Col>



                </Row>
                <Form.Item

                >
                    <Space align="end">

                        <Button primary htmlType="submit">
                            {id != "add" ? "Sửa" : " Thêm"}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

        </div>
    );
}

export default NhanVienChiTiet;