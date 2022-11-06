/* eslint-disable react/jsx-no-target-blank */
import { useIntl } from 'react-intl'
import { AsideMenuItem } from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>

    <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
     />

      <AsideMenuItem
        icon='/media/icons/new/hotel.svg'
        to='/hotel-management'
        title='Hotel Management'
      />

      <AsideMenuItem
        icon='/media/icons/new/car.svg'
        to='/car-management'
        title='Car Management'
      />


      <AsideMenuItem
        icon='/media/icons/new/state.svg'
        to='/state-management'
        title='State Management'
      />

      <AsideMenuItem
        icon='/media/icons/new/city.svg'
        to='/city-management'
        title='City Management'
      />
    </>
  )
}
