import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { HotelListWrapper } from './list/HotelList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Hotel Management',
    path: '/hotel-management/hotel',
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

const HotelPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='hotel'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Hotel list</PageTitle>
              <HotelListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/hotel-management/hotel' />} />
    </Routes>
  )
}
export default HotelPage;