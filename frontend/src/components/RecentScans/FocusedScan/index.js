import React, {useState, useEffect} from 'react';
import sampleLP from '../../../demo/sampleLP.jpg'
import { Button } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'

function FocusedScan(props) {
    const [focus, setFocus] = useState([]);

    useEffect(() => {
        setFocus(props.focus);
    },[])

    useEffect(() => {
        setFocus(props.focus);
    },[props.focus]);


    function editVisit(id) {
        console.log(id);
    }

    return (
        <div className="focusedScan">
            <Header as="h1">Scan # {focus.index}</Header>
            <img src={sampleLP} />
            <div className="focusedScanTextArea">
                <Header as="h2"> Plate #: {focus.Customer} </Header> 
                &nbsp;&nbsp;&nbsp;
                <Button size="mini" onClick={() => editVisit('MRSNOOPY')}>Edit</Button>
            </div>
            <div className="focusedScanTextArea">
                <Header as="h2">Date of Visit: {focus.dateTime ? new Date(focus.dateTime.$date).toLocaleString() : ""}</Header>
            </div>
            <div className="focusedScanTextArea">
                <Header as="h2">Total Visits: &nbsp; </Header>
            </div>
            <Button size="large"color="red"onClick={() => editVisit('MRSNOOPY')}>Delete</Button>
        </div>
    )
}

export default FocusedScan