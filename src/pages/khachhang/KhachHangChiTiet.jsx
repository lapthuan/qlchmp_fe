
import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space } from "antd";
import useAsync from "../../hook/useAsync";
import dayjs from "dayjs";
import { useEffect } from "react";
import ServiceBranch from "../../service/ServiceBranch";
import ServiceCustomer from "../../service/ServiceCustomer";
import { useParams } from "react-router-dom";
import { Header } from "../../components";
const { Option } = Select;

const KhachHangChiTiet = () => {
    const [form] = Form.useForm();
    const { id } = useParams()
    const { data: branch } = useAsync(() => ServiceBranch.getAllBranch())
    useEffect(() => {

        if (id != "add") {
            (async () => {
                const res = await ServiceCustomer.getACustomer(id)

                if (res) {

                    const ngaysinhfm = dayjs(res[0].NgaySinh, 'YYYY-MM-DD');

                    form.setFieldsValue({
                        makh: res[0].MaKH,
                        machinhanh: res[0].MaCN,
                        tenkh: res[0].TenKH,
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
                "reqMaKH": values.makh,
                "reqTenKH": values.tenkh,
                "reqMaCN": values.machinhanh,
                "reqNgaySinh": ngaysinh,
                "reqGioiTinh": values.gioitinh,
                "reqDiaChi": values.diachi,
                "reqSdt": values.sdt,
            }

            const res = await ServiceCustomer.editCustomer(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {
            const ngaysinh = dayjs(values.ngaysinh).format('YYYY-MM-DD HH:mm:ss')

            const body = {
                "reqMaKH": values.makh,
                "reqTenKH": values.tenkh,
                "reqMaCN": values.machinhanh,
                "reqNgaySinh": ngaysinh,
                "reqGioiTinh": values.gioitinh,
                "reqDiaChi": values.diachi,
                "reqSdt": values.sdt,
            }

            const res = await ServiceCustomer.createCustomer(body)

            if (res.message == "Đã tồn tại") {
                message.warning("Mã khách hàng đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm thành công") {
                message.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        }


    };
    return (
        <>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Header category={id == "add" ? "Thêm khách hàng" : "Sửa khách hàng"} />
                <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="makh"
                                label="Mã khách hàng"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập mã khách hàng',
                                    },
                                ]}
                            >
                                <Input disabled={id != "add" ? true : false} placeholder="Nhập mã khách hàng" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="tenkh"
                                label="Tên khách hàng"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập tên khách hàng',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tên khách hàng" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
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
                        <Col span={8}>
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
                                    placeholder="Chọn ngày sinh" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
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
                                <Select placeholder="Chọn giới tính" >
                                    <Option value="Nam">Nam</Option>
                                    <Option value="Nữ">Nữ</Option>
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
        </>
    );
}

export default KhachHangChiTiet;