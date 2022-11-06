/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useQueryResponseLoading, useQueryResponsePagination} from '../../core/QueryResponseProvider'
import {useQueryRequest} from '../../core/QueryRequestProvider'

const mappedLabel = (label: string): string => {
  if (label === '&laquo; Previous') {
    return 'Previous'
  }

  if (label === 'Next &raquo;') {
    return 'Next'
  }

  return label
}

const ListPagination = () => {
  const pagination = useQueryResponsePagination()
  const isLoading = useQueryResponseLoading()
  const {updateState} = useQueryRequest()
  const updatePage = (page: number | null, from: any) => {
    // console.log('********************', page, from)
    // if(from === 'Next' && page && !isNaN(Number(page))){
    //   page = Number(page) + 1
    // }
    // console.log('asdfasdf adf df ', page)
    if (!page || isLoading || pagination.page == page) {
      return
    }
    updateState({page, items_per_page: 10})
  }
  // console.log('********************* pagenatioin', pagination)

  return (
    <div className='row'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start mt-20'></div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <div id='kt_table_users_paginate'>
          <ul className='pagination'>
            {pagination.links
              ?.map((link) => {
                return {...link, label: mappedLabel(link.label)}
              })
              .map((link) => (
                <li
                  key={link.label}
                  className={clsx('page-item', {
                    active: link.active,
                    disabled: isLoading,
                    previous: link.label === 'Previous',
                    next: link.label === 'Next',
                  })}
                >
                  <a
                    className={clsx('page-link', {
                      'page-text': link.label === 'Previous' || link.label === 'Next',
                      'me-5': link.label === 'Previous',
                    })}
                  
                    onClick={() => updatePage(link.page, link.label)}
                    style={{cursor: 'pointer'}}
                  >
                    {mappedLabel(link.label)}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export {ListPagination}
