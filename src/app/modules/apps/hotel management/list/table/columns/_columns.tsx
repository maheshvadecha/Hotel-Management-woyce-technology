// @ts-nocheck
import { Column } from 'react-table'
import { ActionsCell } from './ActionsCell'
import { CustomHeader } from './CustomHeader'
import { User } from '../../core/_models'

const tableColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='State Name' className='min-w-125px' />,
    id: 'state_id',
    Cell: ({ ...props }) => <p>{props.data[props.row.index].state_name}</p>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Hotel Name' className='min-w-125px' />,
    id: 'hotel_name',
    Cell: ({ ...props }) => <p>{props.data[props.row.index].hotel_name}</p>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Hotel Image' className='min-w-125px' />,
    id: 'hotel_image',
    Cell: ({ ...props }) => <img src={props.data[props.row.index].hotel_image} width={60} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Hotel Room Type' className='min-w-125px' />,
    id: 'room_type',
    Cell: ({ ...props }) => <p>{props.data[props.row.index].room_type}</p>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Meal Plan' className='min-w-150px' />,
    id: 'meal',
    Cell: ({ ...props }) => props.data[props.row.index].meal ? props.data[props.row.index].meal.map((item: any, i: number) => item.name ?
      <p key={i}>{item.name} ({item.price})</p> : <p style={{ color: 'red' }}> Null</p>
    ) : null
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Price' className='min-w-125px' />,
    id: 'price',
    Cell: ({ ...props }) => <p>{props.data[props.row.index].price}</p>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Pickup Price' className='min-w-125px' />,
    id: 'pickup_price',
    Cell: ({ ...props }) => <p>{props.data[props.row.index].pickup_price}</p>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Drop Price' className='min-w-125px' />,
    id: 'drop_price',
    Cell: ({ ...props }) => <p>{props.data[props.row.index].drop_price}</p>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Adult with mattress Price' className='min-w-125px' />,
    id: 'adult_with_mattress',
    Cell: ({ ...props }) => <p>{props.data[props.row.index].adult_with_mattress}</p>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Child with mattress Price' className='min-w-125px' />,
    id: 'child_with_mattress',
    Cell: ({ ...props }) => <p>{props.data[props.row.index].child_with_mattress}</p>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Stars' className='min-w-125px' />,
    id: 'star',
    Cell: ({ ...props }) => <p>{props.data[props.row.index].star}</p>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Availability' className='min-w-125px' />,
    id: 'status',
    Cell: ({ ...props }) => { return props.data[props.row.index].status == 0 ? <span className="badge badge-warning">UnAvailable</span> : <span className="badge badge-success">Available</span> },
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-center min-w-100px' />
    ),
    id: 'actions',
    Cell: ({ ...props }) => <ActionsCell id={props.data[props.row.index]} />,
  },
]

export { tableColumns }
