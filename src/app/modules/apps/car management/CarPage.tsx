import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { CarListWrapper } from './list/CarList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Car Management',
    path: '/car-management/car',
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

const CarPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='car'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Car list</PageTitle>
              <CarListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/car-management/car' />} />
    </Routes>
  )
}

export default CarPage;