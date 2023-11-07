import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar, Edit } from '@syncfusion/ej2-react-grids';
import { Link } from "react-router-dom";
import { Header } from "../../components"
import ServiceSanPham from "../../service/ServiceSanPham";
import { useEffect, useState } from 'react';
import { message } from 'antd';
import { useStateContext } from '../../contexts/ContextProvider';


const SanPham = () => {
    const [sanPham, setSanPham] = useState([])
    const toolbarOptions = ['Delete', 'Search'];
    const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true };
    const {
        currentColor,
    } = useStateContext();

    const buttonActionEdit = (props) => (
        <Link to={`../san-pham/${props.MaMH}`}>
            <button
                type="button"
                style={{
                    background: currentColor,
                }}
                className="text-white py-1 px-2 capitalize rounded-2xl text-md"
            >
                Sửa
            </button>
        </Link>
    );


    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {

        const res = await ServiceSanPham.getAllSanPham()
        setSanPham(res)

    }
    const dataSourceChanged = async (state) => {
        if (state.requestType === "delete") {
            const id = state.data[0].MaMH

            const res = await ServiceSanPham.deleteSanPham(id)
            if (res.message == "Đồng bộ xóa thành công")
                message.success("Xóa dữ liệu thành công")
            else
                message.error("Lỗi xóa dữ liệu")

        }
    }



    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Danh sách" title="Sản phẩm" />
            <Link to={`../san-pham/add`}>
                <button style={{
                    background: currentColor,
                }} className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded mb-4" >Thêm</button>
            </Link>
            <GridComponent
                dataSource={sanPham}
                width="auto"
                allowPaging
                allowSorting
                pageSettings={{ pageCount: 5 }}
                editSettings={editOptions}
                toolbar={toolbarOptions}
                actionComplete={dataSourceChanged}
            >
                <ColumnsDirective>
                    <ColumnDirective field='MaMH' headerText='Mã sản phẩm' textAlign='Right' width='100' isPrimaryKey={true} />
                    <ColumnDirective field='TenMH' headerText='Tên sản phẩm' width='200' />
                    <ColumnDirective field='TenLH' headerText='Danh mục' width='150' />
                    <ColumnDirective field='TenNH' headerText='Nhãn hàng' width='150' />
                    <ColumnDirective field='GiamGia' headerText='Giá' width='100' />
                    <ColumnDirective field='MaGiamGia' headerText='Mã giảm giá' width='100' />
                    <ColumnDirective field='MoTa' headerText='Mô tả' width='150' />
                    <ColumnDirective field='DVT' headerText='Đvt' width='100' />
                    <ColumnDirective headerText='Hành động' width='100' template={buttonActionEdit} />
                </ColumnsDirective>
                <Inject services={[Edit, Search, Page, Toolbar]} />

            </GridComponent>
        </div>
    )
}
export default SanPham