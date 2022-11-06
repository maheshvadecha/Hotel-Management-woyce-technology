import { KTCard } from "../../../../../_metronic/helpers"
import { ListHeader } from "./components/header/ListHeader"
import { StateListViewProvider, useListView } from "./core/StateListViewProvider"
import { StateQueryRequestProvider } from "./core/StateQueryRequestProvider"
import { StateQueryResponseProvider } from "./core/StateQueryResponseProvider"
import { EditModal } from "./edit-modal/EditModal"
import { Table } from "./table/Table"

const StateList = () => {
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


const StateListWrapper = () => {
    return (
        <StateQueryRequestProvider>
            <StateQueryResponseProvider>
                <StateListViewProvider>
                    <StateList />   
                </StateListViewProvider>
            </StateQueryResponseProvider>
        </StateQueryRequestProvider>
    )
}

export { StateListWrapper }