import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar, Edit } from '@syncfusion/ej2-react-grids';
import { Link } from "react-router-dom";
import { Header } from "../../components"
import ServiceSanPham from "../../service/ServiceSanPham";
import { useEffect, useState } from 'react';
import { message } from 'antd';
import ServiceCoupon from '../../service/ServiceCoupon';
import ServiceOrder from '../../service/ServiceOrder';


const HoaDon = () => {
    const [data, setData] = useState([])
    const toolbarOptions = ['Delete', 'Search'];
    const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true };


    const buttonActionEdit = (props) => (
        <Link to={`../hoa-don/${props.MaHD}`}>
            <button
                type="button"
                className="text-white bg-green-500 py-1 px-2 capitalize rounded-2xl text-md"
            >
                Sửa
            </button>
        </Link>
    );

    const buttonActionSeen = (props) => (
        <Link to={`../hoa-don-chi-tiet/${props.MaHD}`}>
            <button
                type="button"
                className="text-white bg-yellow-500 py-1 px-2 capitalize rounded-2xl text-md"
            >
                Xem chi tiết
            </button>
        </Link>
    );

    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {

        const res = await ServiceOrder.getAllOrder()
        setData(res)

    }
    const dataSourceChanged = async (state) => {
        if (state.requestType === "delete") {
            const id = state.data[0].MaHD

            const res = await ServiceOrder.deleteOrder(id)
            if (res.message == "Đồng bộ xóa hóa đơn thành công")
                message.success("Xóa dữ liệu thành công")
            else
                message.error("Lỗi xóa dữ liệu")

        }
    }



    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Danh sách" title="Hóa đơn" />
            <Link to={`../hoa-don/add`}>
                <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded mb-4" >Thêm</button>
            </Link>
            <GridComponent
                dataSource={data}
                width="auto"
                allowPaging
                allowSorting
                pageSettings={{ pageCount: 5 }}
                editSettings={editOptions}
                toolbar={toolbarOptions}
                actionComplete={dataSourceChanged}
            >
                <ColumnsDirective>
                    <ColumnDirective field='MaHD' headerText='Mã Hóa đơn' textAlign='Right' width='100' isPrimaryKey={true} />
                    <ColumnDirective field='TenNV' headerText='Tên nhân viên' width='200' />
                    <ColumnDirective field='TenKH' headerText='Tên khách hàng' width='150' />
                    <ColumnDirective field='HinhThucTT' headerText='Hình thức TT' width='150' />
                    <ColumnDirective field='NgayLap' headerText='Ngày lập' width='100' type='date' format='dd/MM/yyyy' />
                    <ColumnDirective headerText='Xem chi tiết' width='150' template={buttonActionSeen} />
                    <ColumnDirective headerText='Hành động' width='100' template={buttonActionEdit} />

                </ColumnsDirective>
                <Inject services={[Edit, Search, Page, Toolbar]} />

            </GridComponent>
        </div>
    )
}
export default HoaDon