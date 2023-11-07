import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar, Edit } from '@syncfusion/ej2-react-grids';
import { Link, useParams } from "react-router-dom";
import { Header } from "../../components"
import ServiceSanPham from "../../service/ServiceSanPham";
import { useEffect, useState } from 'react';
import { message } from 'antd';
import ServiceCoupon from '../../service/ServiceCoupon';
import ServiceOrder from '../../service/ServiceOrder';


const HoaDonChiTiet = () => {
    const { id } = useParams()
    const [data, setData] = useState([])
    const toolbarOptions = ['Delete', 'Search'];
    const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true };


    const buttonActionEdit = (props) => (
        <Link to={`../them-hoa-don-chi-tiet?id=${props.MaHD}&&MaSP=${props.MaMH}&&action=edit`}>
            <button
                type="button"
                className="text-white bg-green-500 py-1 px-2 capitalize rounded-2xl text-md"
            >
                Sửa
            </button>
        </Link>
    );


    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {

        const res = await ServiceOrder.getAOrderDetail(id)
        setData(res)

    }
    const dataSourceChanged = async (state) => {
        if (state.requestType === "delete") {
            const id = state.data[0].MaHD
            const MaMH = state.data[0].MaMH
            const body = {
                "id": id,
                "reqMaMH": MaMH
            }
            const res = await ServiceOrder.deleteOrderDetail(body)
            if (res.message == "Đồng bộ xóa chi tiết hóa đơn thành công")
                message.success("Xóa dữ liệu thành công")
            else
                message.error("Lỗi xóa dữ liệu")

        }
    }



    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Danh sách" title="Hóa đơn chi tiết" />
            <Link to={`../them-hoa-don-chi-tiet?id=${id}&&action=add`}>
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
                    <ColumnDirective field='MaMH' headerText='Sản phẩm' width='200' />
                    <ColumnDirective field='SoLuong' headerText='Số lượng' width='150' />
                    <ColumnDirective field='DonGia' headerText='Giá' width='150' />
                    <ColumnDirective field='ThanhTien' headerText='Thành tiền' width='100' />
                    <ColumnDirective headerText='Hành động' width='100' template={buttonActionEdit} />

                </ColumnsDirective>
                <Inject services={[Edit, Search, Page, Toolbar]} />

            </GridComponent>
        </div>
    )
}
export default HoaDonChiTiet