import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { StateListWrapper } from './list/StateList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'State Management',
    path: '/state-management/state',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const StatePage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='state'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>State list</PageTitle>
              <StateListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/state-management/state' />} />
    </Routes>
  )
}

export default StatePage;