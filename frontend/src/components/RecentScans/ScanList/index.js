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
                    <Segment className="scan" id={visit.id.$oid == focus.id.$oid ? "focused" : ""}>
                        <div>
                            <img src={sampleLP} className="scanImg"></img>
                        </div>
                        <div>
                            <p>{visit.Customer}</p>
                            <p>{new Date(visit.dateTime.$date).toLocaleString()}</p>
                            <Button size="tiny" value={visit.id.$oid} onClick={props.handleFocusChange}>View</Button>
                        </div>
                    </Segment>
                )
            })}
        </div>
    )
}

export default ScanList;
