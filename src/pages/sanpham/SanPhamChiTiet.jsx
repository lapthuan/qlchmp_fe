import { useParams } from "react-router-dom";
import { Header } from "../../components";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import useAsync from "../../hook/useAsync";
import { useEffect, useState } from "react";
import ServiceDanhMuc from "../../service/ServiceDanhMuc";
import ServiceNhanHang from "../../service/ServiceNhanHang";
import ServiceCoupon from "../../service/ServiceCoupon";
import ServiceSanPham from "../../service/ServiceSanPham";

const { Option } = Select;


const SanPhamChiTiet = () => {
    const { id } = useParams()
    const [form] = Form.useForm();
    const { data: DanhMuc } = useAsync(() => ServiceDanhMuc.getAllDanhMuc())
    const { data: Coupon } = useAsync(() => ServiceCoupon.getAllCoupon())
    const { data: NhanHang } = useAsync(() => ServiceNhanHang.getAllNhanHang())
    useEffect(() => {
        if (id != "add") {
            (async () => {
                const res = await ServiceSanPham.getSanPham(id)
                if (res) {
                    form.setFieldsValue({
                        mamh: res[0].MaMH,
                        tenmh: res[0].TenMH,
                        malh: res[0].MaLH,
                        manh: res[0].MaNH,
                        mota: res[0].MoTa,
                        giamgia: res[0].GiamGia,
                        magiamgia: res[0].MaGiamGia,
                        dvt: res[0].DVT,
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
                "reqMaMH": values.mamh,
                "reqMaLH": values.malh,
                "reqMaNH": values.manh,
                "reqMaGiamGia": values.magiamgia,
                "reqTenMH": values.tenmh,
                "reqGiamGia": values.giamgia,
                "reqMoTa": values.mota,
                "reqDVT": values.dvt,
            }

            const res = await ServiceSanPham.editSanPham(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {
            const body = {
                "reqMaMH": values.mamh,
                "reqMaLH": values.malh,
                "reqMaNH": values.manh,
                "reqMaGiamGia": values.magiamgia,
                "reqTenMH": values.tenmh,
                "reqGiamGia": values.giamgia,
                "reqMoTa": values.mota,
                "reqDVT": values.dvt,
            }

            const res = await ServiceSanPham.createSanPham(body)

            if (res.message == "Đã tồn tại") {
                message.warning("Mã sản phẩm đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm thành công") {
                message.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }
        }


    };
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category={id == "add" ? "Thêm sản phẩm" : "Sửa sản phẩm"} />
            <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="mamh"
                            label="Mã sản phẩm"

                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã sản phẩm',
                                },
                            ]}
                        >
                            <Input disabled={id != "add" ? true : false} placeholder="Nhập mã sản phẩm" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="tenmh"
                            label="Tên sản phẩm"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên sản phẩm',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên sản phẩm" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="malh"
                            label="Danh mục"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn danh mục',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn danh mục">
                                {
                                    Array.isArray(DanhMuc) &&
                                    DanhMuc?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaLH}>{item.TenLH}</Option>

                                    ))}

                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="magiamgia"
                            label="Mã giảm giá"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn mã giảm giá',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn mã giảm giá">
                                {
                                    Array.isArray(Coupon) &&
                                    Coupon?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaGiamGia}>{item.TenMaGG}</Option>

                                    ))}

                            </Select>
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="manh"
                            label="Nhãn hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn nhãn hàng',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn nhãn hàng">
                                {
                                    Array.isArray(NhanHang) &&
                                    NhanHang?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaNH}>{item.TenNH}</Option>

                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
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
                    <Col span={12}>
                        <Form.Item
                            name="giamgia"
                            label="Giá"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập giá',
                                },
                            ]}
                        >
                            <Input type="number" placeholder="Nhập giá sản phẩm" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="mota"
                            label="Mô tả"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mô tả',
                                },
                            ]}
                        >
                            <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item

                >
                    <Space align="end">

                        <Button htmlType="submit" primary>
                            {id != "add" ? "Sửa" : " Thêm"}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>


    );
}

export default SanPhamChiTiet;