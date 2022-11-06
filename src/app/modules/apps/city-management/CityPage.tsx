import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { CityListWrapper } from './list/CityList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'City Management',
    path: '/city-management/city',
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

const CityPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='city'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>City list</PageTitle>
              <CityListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/city-management/city' />} />
    </Routes>
  )
}

export default CityPage;