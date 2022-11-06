import { useQuery } from 'react-query'
import { EditModalForm } from './EditModalForm'
import { isNotEmpty, QUERIES } from '../../../../../../_metronic/helpers'
import { useListView } from '../core/ListViewProvider'
import { getHotelById, getRoomType, } from '../core/_requests'

const EditModalFormWrapper = () => {
  const { itemIdForUpdate, setItemIdForUpdate } = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: user,
    error,
  } = useQuery(
    `${QUERIES.HOTELS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getHotelById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )


  if (!itemIdForUpdate) {
    return <EditModalForm isUserLoading={isLoading} user={{ id: undefined, roomtype:[], hotel_image:'', meal:[{name:'', price:0}]}}/>
  }

  if (!isLoading && !error && user) {
    return <EditModalForm isUserLoading={isLoading} user={user} />
  }

  return null
}

export { EditModalFormWrapper }
