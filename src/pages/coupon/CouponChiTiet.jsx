import { Button, Col, DatePicker, Form, Input, message, Row, Space } from "antd";
import ServiceCoupon from "../../service/ServiceCoupon";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components";

const CouponChiTiet = () => {
    const [form] = Form.useForm();
    const { id } = useParams()


    useEffect(() => {

        if (id != "add") {
            (async () => {
                const res = await ServiceCoupon.getACoupon(id)

                if (res) {

                    const startDate = dayjs(res[0].NgayApDung, 'YYYY-MM-DD HH:mm');
                    const endDate = dayjs(res[0].NgayHetHan, 'YYYY-MM-DD HH:mm');
                    form.setFieldsValue({

                        magiamgia: res[0].MaGiamGia,
                        tenmgg: res[0].TenMaGG,
                        giatrigiam: res[0].GiaTriGiam,
                        ngayapdung: startDate,
                        ngayhethan: endDate

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
            const ngayapdung = dayjs(values.ngayapdung).format('YYYY-MM-DD')
            const ngayhethan = dayjs(values.ngayhethan).format('YYYY-MM-DD')
            const body = {
                "reqMaGiamGia": values.magiamgia,
                "reqTenMaGG": values.tenmgg,
                "reqGiaTriGiam": values.giatrigiam,
                "reqNgayApDung": ngayapdung,
                "reqNgayHetHan": ngayhethan
            }

            const res = await ServiceCoupon.editCoupon(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {

            const ngayapdung = dayjs(values.ngayapdung).format('YYYY-MM-DD')
            const ngayhethan = dayjs(values.ngayhethan).format('YYYY-MM-DD')

            const body = {
                "reqMaGiamGia": values.magiamgia,
                "reqTenMaGG": values.tenmgg,
                "reqGiaTriGiam": values.giatrigiam,
                "reqNgayApDung": ngayapdung,
                "reqNgayHetHan": ngayhethan

            }

            const res = await ServiceCoupon.createCoupon(body)

            if (res.message == "Đã tồn tại") {
                message.warning("Mã phiếu giảm giá đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm thành công") {
                message.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")
            }

        }
    };

    return (
        <>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Header category={id == "add" ? "Thêm mã giảm giá" : "Sửa mã giảm giá"} />
                <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="magiamgia"
                                label="Mã giảm giá"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập mã giảm giá',
                                    },
                                ]}
                            >
                                <Input disabled={id != "add" ? true : false} placeholder="Nhập mã giảm giá" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="tenmgg"
                                label="Tên mã giảm giá"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập tên mã giảm giá',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tên mã giảm giá" />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item
                                name="giatrigiam"
                                label="Giá trị giảm"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập giá trị giảm',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập giá trị giảm" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="ngayapdung"
                                label="Ngày áp dụng"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy chọn ngày ',
                                    },
                                ]}
                            >
                                <DatePicker
                                    style={{ width: '80%', margin: "auto" }}
                                    placeholder={"Ngày áp dụng"}
                                    format="DD-MM-YYYY" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="ngayhethan"
                                label="Ngày hết hạn"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy chọn ngày ',
                                    },
                                ]}
                            >
                                <DatePicker
                                    style={{ width: '80%', margin: "auto" }}
                                    placeholder={"Ngày hết hạn"}
                                    format="DD-MM-YYYY" />
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
        </>
    );
}

export default CouponChiTiet;