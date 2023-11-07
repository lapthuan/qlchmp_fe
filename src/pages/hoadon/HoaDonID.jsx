
import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space } from "antd";
import ServiceWarehouse from "../../service/ServiceWarehouse";
import ServiceEmployee from "../../service/ServiceEmployee";
import ServiceDeliveryReceipt from "../../service/ServiceDeliveryReceipt";
import useAsync from "../../hook/useAsync";
import { useEffect } from "react";
import dayjs from "dayjs";
import ServiceCustomer from "../../service/ServiceCustomer";
import ServiceOrder from "../../service/ServiceOrder";
import { useParams } from "react-router-dom";
import { Header } from "../../components";
const { Option } = Select;


const HoaDonID = () => {
    const { id } = useParams()
    const [form] = Form.useForm();
    const { data: Customer } = useAsync(() => ServiceCustomer.getAllCustomer())
    const { data: Employee } = useAsync(() => ServiceEmployee.getAllEmployee())
    useEffect(() => {
        if (id != "add") {
            (async () => {
                const res = await ServiceOrder.getOrder(id)
                if (res) {
                    const ngaylap = dayjs(res[0].NgayLap, 'YYYY-MM-DD');


                    form.setFieldsValue({
                        mahoadon: res[0].MaHD,
                        manv: res[0].MaNV,
                        makh: res[0].MaKH,
                        hinhthuctt: res[0].HinhThucTT,
                        ngaylap: ngaylap,

                    });
                }
            })();
        } else {
            form.resetFields()
        }
    }, [id])
    const onFinish = async (values) => {
        if (id != "add") {

            const ngaylap = dayjs(values.ngaylap).format('YYYY-MM-DD')

            const body = {
                "reqMaNV": values.manv,
                "reqMaKH": values.makh,
                "reqHinhThucTT": values.hinhthuctt,
                "reqNgayLap": ngaylap,

            }

            const res = await ServiceOrder.editOrder(body, id)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
            }

        } else {
            const ngaylap = dayjs(values.ngaylap).format('YYYY-MM-DD')

            const body = {
                "reqMaHD": values.mahoadon,
                "reqMaNV": values.manv,
                "reqMaKH": values.makh,
                "reqHinhThucTT": values.hinhthuctt,
                "reqNgayLap": ngaylap,

            }

            const res = await ServiceOrder.createOrder(body)
            if (res.message == "Đã tồn tại") {
                message.warning("Mã hóa đơn đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm thành công") {
                message.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }


        }
    };
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category={id == "add" ? "Thêm hóa đơn" : "Sửa háo đơn"} />
            <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="mahoadon"
                            label="Mã hóa đơn"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã hóa đơn',
                                },
                            ]}
                        >
                            <Input disabled={id != "add" ? true : false} placeholder="Nhập mã hóa đơn" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="hinhthuctt"
                            label="Hình thức thành toán"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập hình thức thanh toán',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập hình thức thanh toán" />
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
                            name="makh"
                            label="Khách hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn khách hàng',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn khách hàng">
                                {
                                    Array.isArray(Employee) &&
                                    Customer?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaKH}>{item.TenKH}</Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>



                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="ngaylap"
                            label="Ngày lập"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn ngày lập',
                                },
                            ]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                format="DD-MM-YYYY"

                                placeholder="Chọn ngày lập " />
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

export default HoaDonID;