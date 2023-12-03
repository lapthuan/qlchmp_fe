import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components";
import useAsync from "../../hook/useAsync";
import ServiceBranch from "../../service/ServiceBranch";
import ServiceWarehouse from "../../service/ServiceWarehouse";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import ServicekhuVuc from "../../service/ServiceKhuVuc";
const { Option } = Select;

const ChiNhanhChiTiet = () => {
    const [form] = Form.useForm();
    const { id } = useParams()
    const { data: khuVuc } = useAsync(() => ServicekhuVuc.getAllkhuVuc())
    useEffect(() => {
        if (id != "add") {
            (async () => {
                const res = await ServiceBranch.getBranch(id)
                if (res) {
                    form.setFieldsValue({
                        reqMaCN: res[0].MaCN,
                        reqTenCN: res[0].TenCN,
                        reqDiaChi: res[0].DiaChi,
                        reqSdt: res[0].Sdt,
                        reqMaKV: res[0].MaKV,
                        reqGhiChu: res[0].GhiChu,

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
                "reqMaCN": values.reqMaCN,
                "reqTenCN": values.reqTenCN,
                "reqDiaChi": values.reqDiaChi,
                "reqSdt": values.reqSdt,
                "reqMaKV": values.reqMaKV,
                "reqGhiChu": values.reqGhiChu,
            }

            const res = await ServiceBranch.editBranch(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {

            const body = {
                "reqMaCN": values.reqMaCN,
                "reqTenCN": values.reqTenCN,
                "reqDiaChi": values.reqDiaChi,
                "reqSdt": values.reqSdt,
                "reqMaKV": values.reqMaKV,
                "reqGhiChu": values.reqGhiChu,
            }

            const res = await ServiceBranch.createBranch(body)

            if (res.message == "Đã tồn tại") {
                message.warning("Mã kho đã tồn tại!")
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
                            name="reqMaCN"
                            label="Mã chi nhánh"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập Mã chi nhánh',
                                },
                            ]}
                        >
                            <Input disabled={id != "add" ? true : false} placeholder="Nhập Mã chi nhánh" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="reqTenCN"
                            label="Tên chi nhánh"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập Tên chi nhánh',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập Tên chi nhánh" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>

                    <Col span={12}>
                        <Form.Item
                            name="reqMaKV"
                            label="Khu vực"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn khu vực',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn khu vực">
                                {
                                    Array.isArray(khuVuc) &&
                                    khuVuc?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaKV}>{item.TenKV}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="reqSdt"
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
                            name="reqGhiChu"
                            label="Ghi chú"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập Ghi chú',
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="Nhập Ghi chú" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="reqDiaChi"
                            label="Địa chỉ"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập địa chỉ',
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="Nhập địa chỉ" />
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

export default ChiNhanhChiTiet;  