import {ListToolbar} from './ListToolbar'
import {ListSearchComponent} from './ListSearchComponent'

const ListHeader = () => {
  return (
    <div className='card-header border-0 pt-6'>
      <ListSearchComponent />
      <div className='card-toolbar'>
       <ListToolbar />
       </div>
    </div>
  )
}

export {ListHeader}
