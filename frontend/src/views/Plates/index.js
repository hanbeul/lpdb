import React, { useState, useEffect } from 'react'
import { Menu, Table, Pagination } from 'semantic-ui-react'
import axios from 'axios'
const {REACT_APP_BACKEND_URL} = process.env;


function Plates() {
    const [platesOfCurrentPage, setPlatesOfCurrentPage] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState([]);

    useEffect(async() => {
        const res = await axios(
            REACT_APP_BACKEND_URL + '/api/plates/page/'+ currentPage
            )
        setPlatesOfCurrentPage(res.data);
        
        const res2 = await axios(
            REACT_APP_BACKEND_URL + '/api/plates/pagecount/total'
        )
        setTotalPages(res2.data)
        }, [currentPage])

    const handlePaginationChange = (e, {activePage}) => {
        let targetValue = Object.values({activePage})
        setCurrentPage(targetValue.toString());
    }
    
    return (
        <Table celled unstackable>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Plate Number</Table.HeaderCell>
                <Table.HeaderCell>Total Visits</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
        
            <Table.Body>
                {platesOfCurrentPage.map(plate => {
                return(
                <Table.Row>
                    <Table.Cell>{plate.plate_id}</Table.Cell>
                    <Table.Cell>{plate.plate_number}</Table.Cell>
                    <Table.Cell>{}</Table.Cell>
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
    )
}

export default Plates;

