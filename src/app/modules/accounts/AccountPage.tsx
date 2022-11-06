import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { AuthLayout } from '../auth'
// import {Overview} from './components/Overview'
// import {Settings} from './components/settings/Settings'
import {AccountHeader} from './AccountHeader'
import { ResetPassword } from './ResetPassword'

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'ResetPassword',
    path: '/crafted/account/settings',
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

const AccountPage: React.FC = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
      <Route
        element={
          <>
            <AccountHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='settings'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Reset Password</PageTitle>
              <ResetPassword/>
            </>

          }
        />
        <Route index element={<Navigate to='/crafted/account/settings' />} />
      </Route>
      </Route>
      
    </Routes>
  )
}

export default AccountPage;
