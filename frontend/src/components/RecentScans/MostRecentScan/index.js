import React, {useState, useEffect} from 'react';
import sampleLP from '../../../demo/sampleLP.jpg'
import { Button, Icon, Label, Menu, Table } from 'semantic-ui-react'
import axios from 'axios';

function MostRecentScan() {
    const [list, setList] = useState([]); 

    useEffect(async () => {
        const res = await axios(
            'http://localhost:9000/visits',
        );
        setList(res.data);
        console.log(res.data);
    }, []);

    function deleteVisit(id) {
        console.log(id);
    }

    return (
        <div className="mostRecentScanParent">
            {/* <h1></h1>
            <img src={sampleLP} />
            <p>Scanned Plate #:</p>
            <p className="LPnumber">MRSNOOPY</p>
            <Button>Edit</Button> */}

            {/* <ul>
                {list.map(item => {
                    return <li>{item.Customer}</li>
                }
                )}
            </ul> */}

            <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>DateTime</Table.HeaderCell>
                    <Table.HeaderCell>License Plate #</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {list.map(item => {
                        return (
                        <Table.Row>
                            <Table.Cell>{item.id.$oid}</Table.Cell>
                            <Table.Cell>{
                                new Date(item.dateTime.$date).toLocaleString()
                                }
                            </Table.Cell>
                            <Table.Cell>{item.Customer}</Table.Cell>
                            <Table.Cell>
                                <Button onClick={() => deleteVisit(item.id.$oid)}>Delete</Button>    
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

export default MostRecentScan