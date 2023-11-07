import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar, Edit } from '@syncfusion/ej2-react-grids';
import { Link } from "react-router-dom";
import { Header } from "../components"

import { useEffect, useState } from 'react';
import { message } from 'antd';

import ServiceBranch from '../service/ServiceBranch';


const ChiNhanh = () => {
    const [data, setData] = useState([])
    const toolbarOptions = ['Search'];
    const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true };



    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {

        const res = await ServiceBranch.getAllBranch()
        setData(res)

    }




    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Danh sách" title="Chi nhánh" />

            <GridComponent
                dataSource={data}
                width="auto"
                allowPaging
                allowSorting
                pageSettings={{ pageCount: 5 }}
                editSettings={editOptions}
                toolbar={toolbarOptions}

            >
                <ColumnsDirective>
                    <ColumnDirective field='MaCN' headerText='Mã chi nhánh' textAlign='Right' width='100' isPrimaryKey={true} />
                    <ColumnDirective field='TenCN' headerText='Tên chi nhánh' />
                    <ColumnDirective field='DiaChi' headerText='Địa chỉ' />
                    <ColumnDirective field='Sdt' headerText='SĐT' />
                    <ColumnDirective field='MaKV' headerText='Khu vực' width='150' />
                    <ColumnDirective field='GhiChu' headerText='Ghi chú' width='150' />

                </ColumnsDirective>
                <Inject services={[Search, Page, Toolbar]} />

            </GridComponent>
        </div>
    )
}
export default ChiNhanh