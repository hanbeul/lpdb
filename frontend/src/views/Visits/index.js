import React, { useState, useEffect } from 'react'
import { Menu, Table, Pagination } from 'semantic-ui-react'
import axios from 'axios'
import SearchBar from '../../components/Visits/SearchBar'
const {REACT_APP_BACKEND_URL} = process.env;

function Visits() {
    const [visitsOfCurrentPage, setVisitsOfCurrentPage] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState([]);

    useEffect(async() => {
        const res = await axios(
            REACT_APP_BACKEND_URL + '/api/visits/page/'+ currentPage
            )
        setVisitsOfCurrentPage(res.data);
        
        const res2 = await axios(
            REACT_APP_BACKEND_URL + '/api/plates/visits/total'
        )
        setTotalPages(res2.data)
        }, [currentPage])

    const handlePaginationChange = (e, {activePage}) => {
        let targetValue = Object.values({activePage})
        setCurrentPage(targetValue.toString());
    }
    
    return (
        <div>
            <SearchBar />
            <Table celled unstackable>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Visit ID</Table.HeaderCell>
                    <Table.HeaderCell>Visit Image</Table.HeaderCell>
                    <Table.HeaderCell>License Plate Number</Table.HeaderCell>
                    <Table.HeaderCell>Visit Date</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
            
                <Table.Body>
                    {visitsOfCurrentPage.map(visit => {
                    return(
                    <Table.Row>
                        <Table.Cell>{visit.visit_id}</Table.Cell>
                        <Table.Cell><img src={visit ? `${REACT_APP_BACKEND_URL}/images/${visit.visit_image_path}`: ""} className="scanImg"/></Table.Cell>
                        <Table.Cell>{visit.plate_number}</Table.Cell>
                        <Table.Cell>{new Date(visit.visit_date).toLocaleString()}</Table.Cell>
                    </Table.Row>
                    )
                })}
                </Table.Body>
            
                <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='3'>
                    <Menu floated='right' pagination>
                        <Pagination
                                activePage={currentPage}
                                onPageChange={handlePaginationChange}
                                boundaryRange={0}
                                ellipsisItem={null}
                                firstItem={null}
                                lastItem={null}
                                siblingRange={1}
                                totalPages={totalPages.total}
                            />
                    </Menu>
                    </Table.HeaderCell>
                </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    )
}

export default Visits;

