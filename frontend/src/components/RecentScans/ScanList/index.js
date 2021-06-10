import React, {useState, useEffect} from 'react';
import { Segment, Button } from 'semantic-ui-react'
import sampleLP from '../../../demo/sampleLP.jpg'


function ScanList(props) {
    const [currentPagesVisits, setCurrentPagesVisits] = useState([]);
    const [focus, setFocus] = useState([]);

    useEffect(() => {
        setCurrentPagesVisits(props.currentPagesVisits);
    },[props.currentPagesVisits])

    useEffect(() => {
        setFocus(props.focus);
    },[props.focus])

    return (
        <div className="scanList">
            {currentPagesVisits.map(visit => {
                return (
                    <Segment className="scan" id={visit.visit_id == focus.visit_id ? "focused" : ""}>
                        <div>
                            <img src={sampleLP} className="scanImg"></img>
                        </div>
                        <div>
                            <p>{visit.plate_number}</p>
                            <p>{new Date(visit.visit_date).toLocaleString()}</p>
                            <Button size="tiny" value={visit.visit_id} onClick={props.handleFocusChange}>View</Button>
                        </div>
                    </Segment>
                )
            })}
        </div>
    )
}

export default ScanList;
