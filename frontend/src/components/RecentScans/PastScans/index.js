import React, {useState, useEffect} from 'react';
import { Segment, Button } from 'semantic-ui-react'
import axios from 'axios';
import sampleLP from '../../../demo/sampleLP.jpg'


function PastScans() {
    const [visits, setVisits] = useState([]);

    useEffect(async () => {
        const res = await axios(
            'http://localhost:9000/visits', 
        );
        setVisits(res.data.slice(0,10));
    }, []);

    return (
        <div className="pastScans">
            {visits.map(visit => {
                return (
                    <Segment className="pastScan">
                        <div>
                            <img src={sampleLP} className="pastScanImg"></img>
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

export default PastScans;