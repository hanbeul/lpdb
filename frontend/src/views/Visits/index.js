import React, {useState, useEffect} from 'react';
import { Button, Icon, Menu, Table } from 'semantic-ui-react'
import axios from 'axios';



function Visits() {
    const [list, setList] = useState([]); 

    useEffect(async () => {
        const res = await axios(
            'http://localhost:9000/api/visits',
        );
        setList(res.data);
        console.log(res.data);
    }, []);

    function deleteVisit(id) {
        console.log(id);
    }

    return (
        <div className="mostRecentScanParent">

            <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>DateTime</Table.HeaderCell>
                    <Table.HeaderCell>License Plate #</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {list.map(visit => {
                        return (
                        <Table.Row>
                            <Table.Cell>{visit.id.$oid}</Table.Cell>
                            <Table.Cell>{
                                new Date(visit.dateTime.$date).toLocaleString()
                                }
                            </Table.Cell>
                            <Table.Cell>{visit.Customer}</Table.Cell>
                            <Table.Cell>
                                <Button onClick={() => deleteVisit(visit.id.$oid)}>Delete</Button>    
                            </Table.Cell>
                        </Table.Row>
                        )
                    }
                    )}
                </Table.Body>

                <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='3'>
                    <Menu floated='right' pagination>
                        <Menu.Item as='a' icon>
                        <Icon name='chevron left' />
                        </Menu.Item>
                        <Menu.Item as='a'>1</Menu.Item>
                        <Menu.Item as='a'>2</Menu.Item>
                        <Menu.Item as='a'>3</Menu.Item>
                        <Menu.Item as='a'>4</Menu.Item>
                        <Menu.Item as='a' icon>
                        <Icon name='chevron right' />
                        </Menu.Item>
                    </Menu>
                    </Table.HeaderCell>
                </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    )
}

export default Visits;

