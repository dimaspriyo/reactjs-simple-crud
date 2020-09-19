import React from 'react'
import styled from 'styled-components'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table'
import {HttpGet,HttpPost} from '../utils/Req'


const Styles = styled.div`
padding: 1rem;
table {
  border-spacing: 0;
  border: 1px solid black;
  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }
  th,
  td {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    :last-child {
      border-right: 0;
    }
  } 
}
`

const columns = [
  {
    Header: 'Name',
    accessor: 'colName',
  },
  {
    Header: 'Email',
    accessor: 'colEmail',
  },
  {
    Header: 'Country',
    accessor: 'colCountry',
  },
  {
    Header: 'Married',
    accessor: 'colMarried',
  },
  {
    Header: '',
    accessor: 'colUpdate',
  },
  {
    Header: '',
    accessor: 'colDelete',
  },
];



function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)
  
  return (
    <span>
    Search:{' '}
    <input
    value={value || ""}
    onChange={e => {
      setValue(e.target.value);
      onChange(e.target.value);
    }}
    placeholder={`Search Here....`}
    style={{
      fontSize: '1.1rem',
      border: '2px solid',
    }}
    />
    </span>
    )
  }
  
  function Raw({ columns, data }) {
    
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      preGlobalFilteredRows,
      setGlobalFilter,
      visibleColumns,
      state: { pageIndex, pageSize },
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      page
    } = useTable({
      columns,
      data,
      initialState: {pageSize: 5}
    },
    useFilters,
    useGlobalFilter,
    usePagination
    )
    
    // Render the UI for your table
    return (
      
      <div>
      <div
      className="p-1 border-0 d-flex"
      colSpan={visibleColumns.length}
      >
      <GlobalFilter
      preGlobalFilteredRows={preGlobalFilteredRows}
      setGlobalFilter={setGlobalFilter}
      />
      </div>
      <table {...getTableProps()}>
      <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map(column => (
          <th {...column.getHeaderProps()}>{column.render('Header')}</th>
          ))}
          </tr>
          ))}
          </thead>
          <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
              </tr>
              )
            })}
            </tbody>
            </table>
            <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
   
            </div>
            )
          }
          
          export default class Table extends React.Component {
            constructor(props){
              super(props);
              
              this.state = {
                data: [],
                columns: '',
              }
              
              var tempData = [];
              HttpGet('http://localhost:3001').then((value) => {
              return value.json();
            }).then((value) => {
              
              value.forEach((v) => {
                
                tempData.push({
                  colName: v.name,
                  colEmail: v.email,
                  colCountry: v.country,
                  colMarried: v.married,
                  colUpdate: <button className="btn btn-primary" onClick={(value) => this.clickUpdateButton(v.id)}>Update</button>,
                  colDelete: <button className="btn btn-danger" onClick={(value) => this.clickDeleteButton(v.id)}>Delete</button>
                });
              });
              this.setState({
                data: tempData
              });
            });
          }
          

          updateTable(){

            var tempData = [];
              HttpGet('http://localhost:3001').then((value) => {
              return value.json();
            }).then((value) => {
              
              value.forEach((v) => {
                
                tempData.push({
                  colName: v.name,
                  colEmail: v.email,
                  colCountry: v.country,
                  colMarried: v.married,
                  colUpdate: <button className="btn btn-primary" onClick={(value) => this.clickUpdateButton(v.id)}>Update</button>,
                  colDelete: <button className="btn btn-danger" onClick={(value) => this.clickDeleteButton(v.id)}>Delete</button>
                });
              });
              this.setState({
                data: tempData
              });
            });
          }

          clickUpdateButton(value) {
            this.props.onUpdateButton(value);
          }
          
          clickDeleteButton = (value) => {
            this.props.onDeleteButton(value);
          }
          
          render() {
            return (
              <Styles>
              <Raw columns={columns} data={this.state.data}/>
              </Styles>
              );
            }
          }
          