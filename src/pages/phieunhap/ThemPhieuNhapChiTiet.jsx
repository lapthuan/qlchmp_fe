



import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    message,
    Row,
    Select,
    Space,
} from "antd";

import useAsync from "../../hook/useAsync";
import { useEffect } from "react";
import ServiceOrder from "../../service/ServiceOrder";
import { Link, useLocation } from "react-router-dom";
import { Header } from "../../components";
import ServiceSanPham from "../../service/ServiceSanPham";
import ServiceDeliveryReceipt from "../../service/ServiceDeliveryReceipt";
const { Option } = Select;

const ThemPhieuNhapChiTiet = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const id = queryParams.get('id');
    const idMaMH = queryParams.get('MaSP');
    const action = queryParams.get('action');
    const [form] = Form.useForm();

    const { data: sanPham } = useAsync(() =>
        ServiceSanPham.getAllSanPham()
    );

    useEffect(() => {
        if (action != "add") {
            (async () => {
                const res = await ServiceDeliveryReceipt.getDeliveryReceiptDetails(
                    id,
                    idMaMH
                );
                if (res) {
                    form.setFieldsValue({
                        mamh: res[0].MaMH,
                        gianhap: res[0].GiaNhap,
                        giaban: res[0].GiaBan,
                        soluong: res[0].SoLuong,
                    });
                }
            })();
        } else {
            form.resetFields();
        }
    }, [id]);

    const onFinish = async (values) => {
        if (action != "add") {
            const thanhtien = values.gianhap * values.soluong;

            const body = {
                id: id,
                idmamh: idMaMH,
                reqMaMH: values.mamh,
                reqGiaNhap: values.gianhap,
                reqGiaBan: values.giaban,
                reqSoLuong: values.soluong,
                reqThanhTien: thanhtien,
            };

            const res = await ServiceDeliveryReceipt.editDeliveryReceiptDetail(body);
            if (res.message === "Trùng chi tiết phiếu nhập") {
                message.success("Sản phẩm trong phiếu đã tồn tại!");
            } else if (res.message) {
                message.success(
                    "Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!"
                );

            }
        } else {
            const thanhtien = values.gianhap * values.soluong;

            const body = {
                reqMaPhieuNhap: id,
                reqMaMH: values.mamh,
                reqGiaNhap: values.gianhap,
                reqGiaBan: values.giaban,
                reqSoLuong: values.soluong,
                reqThanhTien: thanhtien,
            };

            const res = await ServiceDeliveryReceipt.createDeliveryReceiptDetail(
                body
            );
            if (res.message == "chi tiết phiếu nhập đã tồn tại") {
                message.warning("Chi tiết phiếu nhập đã tồn tại!");
            } else if (res.message == "Đồng bộ thêm chi tiết phiếu nhập thành công") {
                message.success(
                    "Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!"
                );

            }
        }
    };
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category={action == "add" ? "Thêm chi tiết" : "Sửa chi tiết"} />
            <Link className="hover:text-blue-600 mb-3" to={`../phieu-nhap-chi-tiet/${id}`}> Trở về danh sách chi tiết {id}</Link>
            <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="mamh"
                            label="Mặt hàng"
                            rules={[
                                {
                                    required: true,
                                    message: "Hãy chọn mặt hàng",
                                },
                            ]}
                        >
                            <Select placeholder="Chọn mặt hàng" disabled={action != "add" ? true : false}>
                                {Array.isArray(sanPham) &&
                                    sanPham?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaMH}>
                                            {item.TenMH}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="gianhap"
                            label="Giá nhập"
                            rules={[
                                {
                                    required: true,
                                    message: "Hãy nhập giá nhập",
                                },
                            ]}
                        >
                            <Input type="number" placeholder="Nhập giá nhập" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="giaban"
                            label="Giá bán"
                            rules={[
                                {
                                    required: true,
                                    message: "Hãy nhập giá bán",
                                },
                            ]}
                        >
                            <Input type="number" placeholder="Nhập đơn giá bán" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="soluong"
                            label="Số lượng"
                            rules={[
                                {
                                    required: true,
                                    message: "Hãy nhập số lượng",
                                },
                            ]}
                        >
                            <Input type="number" placeholder="Nhập số lượng" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Space align="end">
                      
                        <Button primary htmlType="submit">
                            {action != "add" ? "Sửa" : " Thêm"}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

        </div>
    );
}

export default ThemPhieuNhapChiTiet;