import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar, Edit } from '@syncfusion/ej2-react-grids';
import { Link } from "react-router-dom";
import { Header } from "../../components"

import { useEffect, useState } from 'react';
import { message } from 'antd';

import ServiceBranch from '../../service/ServiceBranch';


const ChiNhanh = () => {
    const [data, setData] = useState([])
    const toolbarOptions = ['Delete', 'Search'];
    const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true };

    const buttonActionEdit = (props) => (
        <Link to={`../chi-nhanh/${props.MaCN}`}>
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

        const res = await ServiceBranch.getAllBranch()
        setData(res)

    }

    const dataSourceChanged = async (state) => {
       
        if (state.requestType === "delete") {
            const id = state.data[0].MaCN
        
            const res = await ServiceBranch.deleteBranch(id)
            if (res.message == "Đồng bộ xóa thành công!")
                message.success("Xóa dữ liệu thành công")
            else
                message.error("Lỗi xóa dữ liệu")

        }
    }


    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Danh sách" title="Chi nhánh" />
            <Link to={`../chi-nhanh/add`}>
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
                    <ColumnDirective field='MaCN' headerText='Mã chi nhánh' textAlign='Right' width='100' isPrimaryKey={true} />
                    <ColumnDirective field='TenCN' headerText='Tên chi nhánh' />
                    <ColumnDirective field='DiaChi' headerText='Địa chỉ' />
                    <ColumnDirective field='Sdt' headerText='SĐT' />
                    <ColumnDirective field='MaKV' headerText='Khu vực' width='150' />
                    <ColumnDirective field='GhiChu' headerText='Ghi chú' width='150' />
                    <ColumnDirective headerText='Hành động' width='100' template={buttonActionEdit} />
                </ColumnsDirective>
                <Inject services={[Edit, Search, Page, Toolbar]} />

            </GridComponent>
        </div>
    )
}
export default ChiNhanh