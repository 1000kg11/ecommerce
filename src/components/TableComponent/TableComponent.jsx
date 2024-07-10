import { Table } from 'antd';
import Loading from '../LoadingComponent/Loading';
import { useMemo, useState } from 'react';
import { Excel } from "antd-table-saveas-excel";
const TableComponent = (props) => {
    const {selectionType = 'checkbox', data: dataSource = [], isPending= false, columns= [], handleDeleteMany} = props;
    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
    const newColumnExport = useMemo(() =>{
        const arr  = columns?.filter((col) => col.dataIndex !== 'action')
        return arr
    }, [columns])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setRowSelectedKeys(selectedRowKeys);
        },
        // getCheckboxProps: (record) => ({
        //   disabled: record.name === 'Disabled User',
        //   // Column configuration not to be checked
        //   name: record.name,
        // }),
    };

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys)
    }

    const exportExcel = () => {
        const excel = new Excel();
        excel
          .addSheet("test")
          .addColumns(newColumnExport)
          .addDataSource(dataSource, {
            str2Percent: true
          })
          .saveAs("Excel.xlsx");
      };

    return (
        <Loading isPending={isPending}>
            {rowSelectedKeys.length > 0 && (
                <div
                    style={{
                        background: '#1d1ddd',
                        color: '#fff',
                        fontWeight: 'bold',
                        padding: '10px',
                        cursor: 'pointer'
                    }}
                    onClick={handleDeleteAll}
                >
                    xóa tất cả
                </div>
            )}
            <button onClick={exportExcel} > Export Excel</button>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={dataSource}
                {...props}
            />
        </Loading>
    );
}

export default TableComponent;
