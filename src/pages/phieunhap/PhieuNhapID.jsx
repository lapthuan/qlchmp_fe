
import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components";
import ServiceDeliveryReceipt from "../../service/ServiceDeliveryReceipt";
import dayjs from "dayjs";
import useAsync from "../../hook/useAsync";
import ServiceWarehouse from "../../service/ServiceWarehouse";
import ServiceEmployee from "../../service/ServiceEmployee";
const { Option } = Select;

const PhieuNhapID = () => {
    const { id } = useParams()
    const [form] = Form.useForm();
    const { data: Warehouse } = useAsync(() => ServiceWarehouse.getAllWarehouse())
    const { data: Employee } = useAsync(() => ServiceEmployee.getAllEmployee())
    useEffect(() => {
        if (id != "add") {
            (async () => {
                const res = await ServiceDeliveryReceipt.getDeliveryReceipt(id)
                if (res) {
                    const ngaylp = dayjs(res[0].NgayLapPhieu, 'YYYY-MM-DD');

                    form.setFieldsValue({
                        maphieunhap: res[0].MaPhieuNhap,
                        manv: res[0].MaNV,
                        makho: res[0].MaKho,
                        dvt: res[0].DVT,
                        ngaylapphieu: ngaylp,

                    });
                }
            })();
        } else {
            form.resetFields()
        }
    }, [id])
    const onFinish = async (values) => {
        if (id != "add") {
            const ngaylapphieu = dayjs(values.ngaylapphieu).format('YYYY-MM-DD')

            const body = {
                "reqMaNV": values.manv,
                "reqMaKho": values.makho,
                "reqDVT": values.dvt,
                "reqNgayLapPhieu": ngaylapphieu,
            }

            const res = await ServiceDeliveryReceipt.editDeliveryReceipt(body, id)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {
            const ngaylapphieu = dayjs(values.ngaylapphieu).format('YYYY-MM-DD')

            const body = {
                "reqMaPhieuNhap": values.maphieunhap,
                "reqMaNV": values.manv,
                "reqMaKho": values.makho,
                "reqDVT": values.dvt,
                "reqNgayLapPhieu": ngaylapphieu,
            }

            const res = await ServiceDeliveryReceipt.createDeliveryReceipt(body)
            if (res.message == "Đã tồn tại") {
                message.warning("Mã phiếu nhập đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm thành công") {
                message.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }


        }
    };
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category={id == "add" ? "Thêm phiếu nhập" : "Sửa phiếu nhập"} />
            <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="maphieunhap"
                            label="Mã phiếu nhập"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã phiếu nhập',
                                },
                            ]}
                        >
                            <Input disabled={id != "add" ? true : false} placeholder="Nhập mã phiếu nhập" />
                        </Form.Item>
                    </Col>
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
                                {Employee?.map((item, i) => (
                                    <Option key={i + 1} value={item.MaNV}>{item.TenNV}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="makho"
                            label="Kho"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn kho',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn kho">
                                {
                                    Array.isArray(Warehouse) &&
                                    Warehouse?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaKho}>{item.TenKho}</Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="dvt"
                            label="Đơn vị tính"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập đơn vị tính',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập đơn vị tính" />
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="ngaylapphieu"
                            label="Ngày lập phếu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn ngày lập phiếu',
                                },
                            ]}
                        >
                            <DatePicker
                                style={{
                                    width: "100%"
                                }}

                                format="DD-MM-YYYY"
                                placeholder="Nhập ngày lập phiếu" />
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

export default PhieuNhapID;