import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";
import ServiceDistributed from "../service/ServiceDistributed";
import useAsync from "../hook/useAsync"

const { Option } = Select;


const PhanTan = () => {
    const [form] = Form.useForm();
    const [bang, setBang] = useState()
    const [cot, setCot] = useState()
    const [dieukien, setDieukien] = useState("")
    const [cotvitu, setCotvitu] = useState()
    const [dieukienvitu, setDieukienvitu] = useState("")
    const [columnOptionTable, setColumnOptionTable] = useState([])
    const [columnOption, setColumnOption] = useState([])
    const [columnOptionDatabase, setColumnOptionDatabase] = useState([])
    const [isLogin, setIsLogin] = useState(false)
    const [host, setHost] = useState()
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [database, setDataBase] = useState()
    const [tanNgang, setTanNgang] = useState(false)
    const [loading, setLoading] = useState(false)
    const { data: chiNhanh } = useAsync(() => ServiceDistributed.ShowColumn("chinhanh"))

    useEffect(() => {
        if (bang) {
            (async () => {

                const resColumn = await ServiceDistributed.ShowColumn(bang)

                setColumnOption(resColumn?.columns)
            })()
        } else {
            setColumnOption([])
        }
    }, [bang])
    const loginMysql = async (values) => {

        const body = {
            "host": host,
            "username": userName,
            "password": password,

        }

        const res = await ServiceDistributed.LoginMysql(body)
        console.log('res', res)
        if (res.databases) {

            setColumnOptionDatabase(res.databases)
            message.success("Đăng nhập thành công")

        } else {
            setColumnOptionDatabase([])
            message.warning("Đăng nhập thất bại, kiểm tra lại tài khoản và mật khẩu!")
        }

    }

    const connectDatabase = async () => {
        console.log('database', database)
        const res = await ServiceDistributed.ShowTable(database)
        if (res.table) {

            setColumnOptionTable(res.table)
            message.success("Truy cập thành công")
            setIsLogin(true)

        } else {
            message.warning("Database này không được hỗ trợ phân tán!")
        }

    }

    const phanTan = async () => {
        message.loading("Đang thực hiện phân tán dữ liệu")
        setLoading(true)

        const body = {
            "bang": "khuvuc",
            "cot": cot,
            "phantan": dieukien,
            "bangvitu": "chinhanh",
            "cotvitu": cotvitu,
            "dieukienvitu": dieukienvitu
        }
        const bodyNull = {
            "bang": "khuvuc",
            "cot": cot,
            "phantan": dieukien,
        }

        const res = await ServiceDistributed.PhanTanNgang(dieukienvitu ? body : bodyNull)
        console.log('res ', res)
        if (res.message) {
            message.success("Phân tán thành công")
            setLoading(false)
        }
        setLoading(false)

    }



    const handleChange = (value) => {
        setDataBase(value)
    }
    const handleChangeTable = (value) => {
        setBang(value)
    }
    const handleChangeCotVitu = (value) => {
        setCotvitu(value)
    }
    const handleChangeCot = (value) => {
        setCot(value)
    }
    return (
        <>{
            isLogin == false ?
                <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  '>
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    name="host"
                                    onChange={(e) => setHost(e.target.value)}
                                    label="Host"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Hãy nhập Host',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập tên tài khoản" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="username"
                                    label="User name"
                                    onChange={(e) => setUserName(e.target.value)}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Hãy nhập User name',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập User name" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}

                                >
                                    <Input.Password placeholder="Nhập Password" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16} align={"middle"}>
                            <Col span={8} >
                                <button onClick={loginMysql} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" >Đăng nhập</button>
                            </Col>
                        </Row>

                    </Form>
                    <br />
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16} align={"middle"}>
                            <Col span={12}>
                                <Form.Item
                                    name="database"
                                    label="Database"

                                    rules={[
                                        {
                                            required: true,
                                            message: 'Hãy chọn Database',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Chọn Database" onChange={handleChange}>
                                        {

                                            columnOptionDatabase?.map((item, i) => (
                                                <Option key={i + 1} value={item}>{item}</Option>
                                            ))}


                                    </Select>
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={16} align={"middle"}>
                            <Col span={8} >
                                <button onClick={connectDatabase} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                >Kết nối</button>
                            </Col>
                        </Row>
                    </Form>
                </div> : isLogin == true && tanNgang == false ?
                    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl flex justify-center '>

                        <div style={{
                            width: "150px",
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <button onClick={() => setTanNgang(true)} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                            >Tán Ngang</button>
                        </div>
                        <div style={{
                            width: "150px",
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <button disabled className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                            >Tán Dọc</button>
                        </div>


                    </div> : isLogin == true && tanNgang == true &&
                    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl '>
                        <Form layout="vertical" hideRequiredMark>
                            <Row gutter={16} align={"middle"}>
                                <Col span={12}>
                                    <Form.Item
                                        name="bang"
                                        label="Bảng"

                                        rules={[
                                            {
                                                required: true,
                                                message: 'Hãy chọn bảng',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Chọn bảng" onChange={handleChangeTable}>
                                            {

                                                columnOptionTable?.map((item, i) => (
                                                    <Option key={i + 1} value={item}>{item}</Option>
                                                ))}


                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="cot"
                                        label="Cột"

                                        rules={[
                                            {
                                                required: true,
                                                message: 'Hãy chọn cột',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Chọn cột" onChange={handleChangeCot}>
                                            {

                                                columnOption?.map((item, i) => (
                                                    <Option key={i + 1} value={item}>{item}</Option>
                                                ))}


                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16} align={"middle"}>

                                <Col span={24}>
                                    <Form.Item
                                        name="dieukien"
                                        label="Điều kiện"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Hãy điều kiện',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nhập điều kiện" onChange={(e) => setDieukien(e.target.value)} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16} align={"middle"}>
                                <Col span={12}>
                                    <Form.Item
                                        name="Bảng"
                                        onChange={(e) => setHost(e.target.value)}
                                        label="Bảng"

                                    >
                                        <Input disabled defaultValue={"chinhanh"} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="cotvitu"
                                        label="Cột"

                                    >
                                        <Select placeholder="Chọn cột" onChange={handleChangeCotVitu}>
                                            {

                                                chiNhanh?.columns?.map((item, i) => (
                                                    <Option key={i + 1} value={item}>{item}</Option>
                                                ))}


                                        </Select>
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row gutter={16} align={"middle"}>
                                <Col span={24}>
                                    <Form.Item
                                        name="dieukienvitu"
                                        label="Điều kiện"

                                    >
                                        <Input placeholder="Nhập điều kiện" onChange={(e) => setDieukienvitu(e.target.value)} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16} align={"middle"}>
                                <Col span={8} >
                                    <button onClick={phanTan} disabled={loading} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                    >{loading === true ? "Đang phân tán" : "Phán tán"}</button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
        }
        </>
    );
}

export default PhanTan;