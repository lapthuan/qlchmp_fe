import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import ServiceNhanHang from "../../service/ServiceNhanHang";


const KhachHangChiTiet = () => {
    const [form] = Form.useForm();
    const { id } = useParams()

    useEffect(() => {
        if (id != "add") {
            (async () => {
                const res = await ServiceNhanHang.getANhanHang(id)
                if (res) {
                    form.setFieldsValue({
                        manh: res[0].MaNH,
                        tennh: res[0].TenNH,
                        ghichu: res[0].GhiChu,


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
                "reqMaNH": values.manh,
                "reqTenNH": values.tennh,
                "reqGhiChu": values.ghichu
            }

            const res = await ServiceNhanHang.editNhanHang(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {

            const body = {
                "reqMaNH": values.manh,
                "reqTenNH": values.tennh,
                "reqGhiChu": values.ghichu

            }

            const res = await ServiceNhanHang.createNhanHang(body)

            if (res.message == "Đã tồn tại") {
                message.warning("Mã nhãn hàng đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm thành công") {
                message.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")
                    ;
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
                            name="manh"
                            label="Mã nhãn hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy Nhập mã nhãn hàng',
                                },
                            ]}
                        >
                            <Input disabled={id != "add" ? true : false} placeholder="Nhập mã nhãn hàng" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="tennh"
                            label="Tên nhãn hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên nhãn hàng',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên mặt hàng" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="ghichu"
                            label="Ghi chú"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập ghi chú',
                                },
                            ]}
                        >
                            <Input.TextArea cols={5} placeholder="Nhập ghi chú" />
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

export default KhachHangChiTiet;  