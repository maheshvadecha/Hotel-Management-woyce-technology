/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useContext, useState, useEffect, useMemo} from 'react'
import {useQuery} from 'react-query'
import {
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  PaginationState,
  QUERIES,
  WithChildren,
} from '../../../../../../_metronic/helpers'
import {useQueryRequest} from './CityQueryRequestProvider'
import { getCityList } from './_requests'

const QueryResponseContext = createResponseContext<any>(initialQueryResponse)
const CityQueryResponseProvider: FC<WithChildren> = ({children}) => {
  const {state} = useQueryRequest()
  const [query, setQuery] = useState<any>(state)
  const updatedQuery = useMemo(() => state, [state])

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
      setTimeout(() => {
        refetch()
      }, 500)
    }
  }, [updatedQuery])

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${QUERIES.CITY_LIST}-${query}`,
    () => {
      return getCityList (query)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  return (
    <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
      {children}
    </QueryResponseContext.Provider>
  )
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
  const {response} = useQueryResponse()
  if (!response) {
    return []
  }

  return response?.data || []
}

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = {
    links: [],
    ...initialQueryState,
  }

  const {response} = useQueryResponse()
  if (!response || !response.pager) {
    return defaultPaginationState
  }
  let linkArray = []
  const numberOfPage = Math.ceil(response.pager?.totalRecords / response.pager?.pageSize)
  //console.log('numberof page', numberOfPage, typeof response.pager.pageNo, response.pager.pageNo + 1)
  for (let index = 1; index <= numberOfPage; index++) {
      linkArray.push({
        url: '/?page=' + index,
        label: `${index}`,
        active: response.pager.pageNo == index,
        page: index,
      })
  }
  let start = 0
  let end = 0
  if(response.pager.pageNo == 1){
    start = 0
    end = 3
  }else if(response.pager.pageNo == numberOfPage)
  {
    start = numberOfPage - 3
    end = numberOfPage
  }
  else{
    start = Number(response.pager.pageNo) - 2
    end = start + 3
  }

  linkArray = linkArray.slice(start, end)

  // linkArray = linkArray.slice(response.pager.pageNo == 1 ? 0: response.pager.pageNo - 2 ,Number(response.pager.pageNo)+3)
  const newPagination = {
    page: response.pager.pageNo,
    items_per_page: response.pager.pageSize,
    last_page: numberOfPage,
    total: response.pager.totalRecords,
    links: [
      ...response.pager.pageNo == 1 ? []:[{
        url: null,
        label: '&laquo; Previous',
        active: false,
        page: Number(response.pager.pageNo) - 1 < 1 ? Number(response.pager.pageNo) : Number(response.pager.pageNo) - 1,
      }],
      ...linkArray,
      ...response.pager.pageNo == numberOfPage ? []:[{
        url: '/?page=2',
        label: 'Next &raquo;',
        active: false,
        page:
          Number(response.pager.pageNo) + 1 > numberOfPage
            ? Number(response.pager.pageNo) 
            : Number(response.pager.pageNo) + 1,
      }],
    ],
  }
  return newPagination
}

const useQueryResponseLoading = (): boolean => {
  const {isLoading} = useQueryResponse()
  return isLoading
}

export {
  CityQueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
}
