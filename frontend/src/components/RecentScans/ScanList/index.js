import React, {useState, useEffect} from 'react';
import { Segment, Button } from 'semantic-ui-react'
import axios from 'axios';
import sampleLP from '../../../demo/sampleLP.jpg'


function ScanList() {
    const [visits, setVisits] = useState([]);

    useEffect(async () => {
        const res = await axios(
            'http://localhost:9000/api/visits', 
        );
        setVisits(res.data.slice(0,10));
        console.log(res.data.slice(0,10));
    }, []);

    return (
        <div className="scanList">
            {visits.map(visit => {
                return (
                    <Segment className="scan">
                        <div>
                            <img src={sampleLP} className="scanImg"></img>
                        </div>
                        <div>
                            <p>{visit.Customer}</p>
                            <p>{new Date(visit.dateTime.$date).toLocaleString()}</p>
                            <Button size="tiny">View</Button>
                        </div>
                    </Segment>
                )
            })}
        </div>
    )
}

export default ScanList;