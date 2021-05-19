import React, {useState, useEffect} from 'react';
import sampleLP from '../../../demo/sampleLP.jpg'
import { Button } from 'semantic-ui-react'
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

    function editVisit(id) {
        console.log(id);
    }

    return (
        <div className="mostRecentScan">
            <img src={sampleLP} />

            {/* <ul>
                {list.map(item => {
                    return <li>{item.Customer}</li>
                }
                )}
            </ul> */}
            <div className="mostRecentScanTextArea">
                <p>Plate #: &nbsp;</p>
                <p>MRSNOOPY &nbsp;</p>
                <Button size="mini" onClick={() => editVisit('MRSNOOPY')}>Edit</Button>
            </div>
            <div className="mostRecentScanTextArea">
                <p>Date of Visit: &nbsp;</p>
                <p>5/15/2020, 1:19:25 AM</p>
            </div>
            <div className="mostRecentScanTextArea">
                <p>Total Visits: &nbsp;</p>
                <p>16</p>
            </div>
        </div>
    )
}

export default MostRecentScan