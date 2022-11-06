/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useRef } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { useLayout } from '../../core'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { AsideMenu } from './AsideMenu'

const AsideDefault: FC = () => {
  const { config, classes } = useLayout()
  const asideRef = useRef<HTMLDivElement | null>(null)
  const { aside } = config

  const minimize = () => {
    asideRef.current?.classList.add('animating')
    setTimeout(() => {
      asideRef.current?.classList.remove('animating')
    }, 300)
  }

  return (
    <div
      id='kt_aside'
      className={clsx('aside', classes.aside.join(' '))}
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction='start'
      data-kt-drawer-toggle='#kt_aside_mobile_toggle'
      ref={asideRef}
    >
      <img
        alt='Logo'
        className='h-180px w-100 logo'
        src={require('../../../assets/image/HotelManagement.jpg')}
      />
      <div className='aside-menu flex-column-fluid'>
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
    // </div>
  )
}

export { AsideDefault }
