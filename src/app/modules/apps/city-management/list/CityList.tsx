import { KTCard } from "../../../../../_metronic/helpers"
import { ListHeader } from "./components/header/ListHeader"
import { CityListViewProvider, useListView } from "./core/CityListViewProvider"
import { CityQueryRequestProvider } from "./core/CityQueryRequestProvider"
import { CityQueryResponseProvider } from "./core/CityQueryResponseProvider"
import { EditModal } from "./edit-modal/EditModal"
import { Table } from "./table/Table"

const CityList = () => {
        const {itemIdForUpdate} = useListView()
    return (
        <>
            <KTCard>
                <ListHeader />
                <Table />
            </KTCard>
            {itemIdForUpdate !== undefined && <EditModal />}
        </>
    )

}


const CityListWrapper = () => {
    return (
        <CityQueryRequestProvider>
            <CityQueryResponseProvider>
                <CityListViewProvider>
                    <CityList />   
                </CityListViewProvider>
            </CityQueryResponseProvider>
        </CityQueryRequestProvider>
    )
}

export { CityListWrapper }