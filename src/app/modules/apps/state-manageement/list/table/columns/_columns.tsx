// @ts-nocheck
import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {ActionsCell} from './ActionsCell'
import {CustomHeader} from './CustomHeader'
import {User} from '../../core/_models'
import { truncateSync } from 'fs'

const tableColumns: ReadonlyArray<Column<User>> = [
   {
    Header: (props) => <CustomHeader tableProps={props} title='State Name' className='min-w-125px' />,
    id: 'state',
    Cell: ({...props}) => <p>{props.data[props.row.index].state}</p>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='status' className='min-w-125px' />,
    id: 'status',
    Cell: ({...props}) => {return props.data[props.row.index].status == 0 ? <span className="badge badge-warning">InActive</span> : <span className="badge badge-success">Active</span>},
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-center min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index]} />,
  },
]

export {tableColumns}
 