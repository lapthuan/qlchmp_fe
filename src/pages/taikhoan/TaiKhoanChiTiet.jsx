
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import ServiceAccount from "../../service/ServiceAccount";
import { useEffect } from "react";
import useAsync from "../../hook/useAsync";
import ServiceEmployee from "../../service/ServiceEmployee";
import { useParams } from "react-router-dom";
import { Header } from "../../components";
const { Option } = Select;

const TaiKhoanChiTiet = () => {
    const [form] = Form.useForm();
    const { id } = useParams()

    const { data: Employee } = useAsync(() => ServiceEmployee.getAllEmployee())
    useEffect(() => {

        if (id != "add") {
            (async () => {
                const res = await ServiceAccount.getAccount(id)

                if (res) {
                    form.setFieldsValue({
                        tentk: res[0].TenTK,
                        manv: res[0].MaNV,
                        matkhau: res[0].Matkhau,
                        quyen: res[0].Quyen,
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

            const body = {
                "reqTenTk": values.tentk,
                "reqMaNV": values.manv,
                "reqMatKhau": values.matkhau,
                "reqQuyen": values.quyen,

            }

            const res = await ServiceAccount.editAccount(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
            }

        } else {


            const body = {
                "reqTenTk": values.tentk,
                "reqMaNV": values.manv,
                "reqMatKhau": values.matkhau,
                "reqQuyen": values.quyen,
            }

            const res = await ServiceAccount.createAccount(body)

            if (res.message == "Đã tồn tại") {
                message.warning("Tài khoản đã tồn tại")
            } else if (res.message == "Đồng bộ thêm thành công") {
                message.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        }


    };
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category={id == "add" ? "Thêm kho" : "Sửa kho"} />
            <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="tentk"
                            label="Tên tài khoản"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên tài khoản',
                                },
                            ]}
                        >
                            <Input disabled={id != "add" ? true : false} placeholder="Nhập tên tài khoản" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="matkhau"
                            label="Mật khẩu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mật khẩu',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="manv"
                            label="Nhân viên"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn nhân viên',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn nhân viên">
                                {
                                    Array.isArray(Employee) &&
                                    Employee?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaNV}>{item.TenNV}</Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="quyen"
                            label="Quyền"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn quyền',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn quyền" defaultValue={"0"}>
                                <Option value="1">Admin</Option>
                                <Option value="0">Nhân viên</Option>
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

export default TaiKhoanChiTiet;