import {useQueryClient, useMutation} from 'react-query'
import {QUERIES} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/CityListViewProvider'
import {useQueryResponse} from '../../core/CityQueryResponseProvider'
// import {deleteSelectedUserRoles} from '../../core/_requests'

const ListGrouping = () => {
  const {selected, clearSelected} = useListView()
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()

  // const deleteSelectedItems = useMutation(() => deleteSelectedUserRoles(selected), {
  //   // 💡 response of the mutation is passed to onSuccess
  //   onSuccess: () => {
  //     // ✅ update detail view directly
  //     queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
  //     clearSelected()
  //   },
  // })

  return (
    <div className='d-flex justify-content-end align-items-center'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span> Selected
      </div>

      {/* <button
        type='button'
        className='btn btn-danger'
        onClick={async () => await deleteSelectedItems.mutateAsync()}
      >
        Delete Selected
      </button> */}
    </div>
  )
}

export {ListGrouping}
