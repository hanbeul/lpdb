import React, {useState, useEffect} from 'react';
import sampleLP from '../../../demo/sampleLP.jpg'
import { Button } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'
import axios from 'axios';

function FocusedScan(props) {
    const [focus, setFocus] = useState([]);
    const [totalVisit, setTotalVisit] = useState([]);

    useEffect(() => {
        setFocus(props.focus);
    },[])

    useEffect(async () => {
        setFocus(props.focus);

        const res = await axios(
            'http://localhost:9000/api/visits/' + props.focus.plate_id
        )
        console.log(res.data)
        setTotalVisit(res.data); 
    },[props.focus]);


    function editVisit(id) {
        console.log(id);
    }

    return (
        <div className="focusedScan">
            <Header as="h1">Scan # {focus.visit_id}</Header>
            <img src={sampleLP} />
            <div className="focusedScanTextArea">
                <Header as="h2"> Plate #: {focus.plate_number} </Header> 
                &nbsp;&nbsp;&nbsp;
                <Button size="mini" onClick={() => editVisit('MRSNOOPY')}>Edit</Button>
            </div>
            <div className="focusedScanTextArea">
                <Header as="h2">Date of Visit: {focus.visit_date ? new Date(focus.visit_date).toLocaleString() : ""}</Header>
            </div>
            <div className="focusedScanTextArea">
                <Header as="h2">Total Visits: &nbsp; {totalVisit[0] ? totalVisit[0]['COUNT(*)'] : ""}</Header>
            </div>
            <Button size="large"color="red"onClick={() => editVisit('MRSNOOPY')}>Delete</Button>
        </div>
    )
}

export default FocusedScan