import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar, Edit } from '@syncfusion/ej2-react-grids';
import { Link } from "react-router-dom";
import { Header } from "../components"

import { useEffect, useState } from 'react';
import { message } from 'antd';

import ServiceBranch from '../service/ServiceBranch';
import ServicekhuVuc from '../service/ServiceKhuVuc';


const KhuVuc = () => {
    const [data, setData] = useState([])
    const toolbarOptions = ['Search'];
    const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true };



    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {

        const res = await ServicekhuVuc.getAllkhuVuc()
        setData(res)

    }




    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Danh sách" title="Khu vực" />

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
                    <ColumnDirective field='MaKV' headerText='Mã khu vực' textAlign='Right'  isPrimaryKey={true} />
                    <ColumnDirective field='TenKV' headerText='Tên khu vực' />
                    <ColumnDirective field='GhiChu' headerText='Ghi chú' />

                </ColumnsDirective>
                <Inject services={[Search, Page, Toolbar]} />

            </GridComponent>
        </div>
    )
}
export default KhuVuc