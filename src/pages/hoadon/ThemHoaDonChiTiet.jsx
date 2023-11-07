
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
const { Option } = Select;

const ThemHoaDonChiTiet = () => {
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
                const res = await ServiceOrder.getAOrderDetails(idMaMH, id);
                if (res) {
                    form.setFieldsValue({
                        mamh: res[0].MaMH,
                        soluong: res[0].SoLuong,
                        dongia: res[0].DonGia,
                    });
                }
            })();
        } else {
            form.resetFields();
        }
    }, [id]);
    const onFinish = async (values) => {
        if (action != "add") {
            const thanhtien = values.dongia * values.soluong;

            const body = {
                id: id,
                idmamh: idMaMH,
                reqMaMH: values.mamh,
                reqSoLuong: values.soluong,
                reqDonGia: values.dongia,
                reqThanhTien: thanhtien,
            };
            const res = await ServiceOrder.editOrderDetail(body);
            if (res.message === "Trùng chi tiết hóa đơn") {
                message.success("Sản phẩm trong hóa đơn đã tồn tại!");
            } else if (res.message) {
                message.success(
                    "Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!"
                );
            }
        } else {
            const thanhtien = values.dongia * values.soluong;

            const body = {
                reqMaHD: id,
                reqMaMH: values.mamh,
                reqSoLuong: values.soluong,
                reqDonGia: values.dongia,
                reqThanhTien: thanhtien,
            };

            const res = await ServiceOrder.createOrderDetail(body);

            if (res.message == "chi tiết hóa đơn đã tồn tại") {
                message.warning("Mã chi tiết hóa đơn đã tồn tại!");
            } else if (res.message == "Đồng bộ thêm chi tiết hóa đơn thành công") {
                message.success(
                    "Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!"
                );
            }
        }
    };
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category={action == "add" ? "Thêm chi tiết" : "Sửa chi tiết"} />
            <Link className="hover:text-blue-600 mb-3" to={`../hoa-don-chi-tiet/${id}`}> Trở về danh sách chi tiết {id}</Link>

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
                    <Col span={12}>
                        <Form.Item
                            name="dongia"
                            label="Đơn giá"
                            rules={[
                                {
                                    required: true,
                                    message: "Hãy chọn đơn giá",
                                },
                            ]}
                        >
                            <Input type="number" placeholder="Nhập đơn giá" />
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

export default ThemHoaDonChiTiet;