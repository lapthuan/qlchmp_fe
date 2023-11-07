import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components";
import useAsync from "../../hook/useAsync";
import ServiceBranch from "../../service/ServiceBranch";
import ServiceWarehouse from "../../service/ServiceWarehouse";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
const { Option } = Select;

const KhoChiTiet = () => {
    const [form] = Form.useForm();
    const { id } = useParams()
    const { data: branch } = useAsync(() => ServiceBranch.getAllBranch())
    useEffect(() => {
        if (id != "add") {
            (async () => {
                const res = await ServiceWarehouse.getWarehouse(id)
                if (res) {
                    form.setFieldsValue({
                        makho: res[0].MaKho,
                        machinhanh: res[0].MaCN,
                        tenkho: res[0].TenKho,
                        diachi: res[0].DiaChi,

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
                "reqMaKho": values.makho,
                "reqMaCN": values.machinhanh,
                "reqTenKho": values.tenkho,
                "reqDiaChi": values.diachi,
            }

            const res = await ServiceWarehouse.editWarehouse(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {

            const body = {
                "reqMaKho": values.makho,
                "reqMaCN": values.machinhanh,
                "reqTenKho": values.tenkho,
                "reqDiaChi": values.diachi,

            }

            const res = await ServiceWarehouse.createWarehouse(body)

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
                            name="makho"
                            label="Mã kho"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã kho',
                                },
                            ]}
                        >
                            <Input disabled={id != "add" ? true : false} placeholder="Nhập mã kho" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="tenkho"
                            label="Tên kho"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên kho',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên kho" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>

                    <Col span={12}>
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
                                    branch?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaCN}>{item.TenCN}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
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

export default KhoChiTiet;  