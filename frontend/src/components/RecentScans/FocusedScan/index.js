import React, {useState, useEffect} from 'react';
import sampleLP from '../../../demo/sampleLP.jpg'
import { Button, Header, Form } from 'semantic-ui-react'
import axios from 'axios';

function FocusedScan(props) {
    const [focus, setFocus] = useState([]);
    const [totalVisit, setTotalVisit] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState("");

    useEffect(() => {
        setFocus(props.focus);
    },[])

    useEffect(async () => {
        setFocus(props.focus);

        const res = await axios(
            'http://localhost:9000/api/visits/' + props.focus.plate_id
        )
        setTotalVisit(res.data); 
    },[props.focus]);

    useEffect(() => {
        let editModeElements = document.getElementsByClassName("editMode");
        let noEditModeElements = document.getElementsByClassName("noEditMode");
        if (editMode) {
            for (let i = 0 ; i < editModeElements.length ; i++) {
                editModeElements[i].classList.add("on");
                editModeElements[i].classList.remove("off");
            }
            for (let i = 0; i < noEditModeElements.length; i++) {
                noEditModeElements[i].classList.remove("on");
                noEditModeElements[i].classList.add("off");
            }
        }
        if (!editMode) {
            for (let i = 0 ; i < editModeElements.length ; i++) {
                editModeElements[i].classList.remove("on");
                editModeElements[i].classList.add("off");
            }
            for (let i = 0; i < noEditModeElements.length ; i++) {
                noEditModeElements[i].classList.remove("off");
                noEditModeElements[i].classList.add("on");
            }
        }
    }, [editMode])


    function editVisit() {
        if (editMode) { setEditMode(false) }
        if (!editMode) { setEditMode(true) };
    }

    function newPlateId(e) {
        setEditData(e.target.value);
    }

    //Commenting below out for now; I will come back to implementing
    //refreshing the focus update when plate number is edited
    //when API refactor occurs to make smaller, incremental GET requests
    //for the data. As of now, I cannot reasonably add this feature. 
    const updateReq = async () => {
        await axios.put('http://localhost:9000/api/visits/' + focus.visit_id, {plate_number: editData})
        setEditMode(false);
    }

    return (
        <div className="focusedScan">
            <Header as="h1">Scan # {focus.visit_id}</Header>
            <img src={sampleLP} />
            <div className="focusedScanTextArea">
                <Header as="h2"> Plate #: </Header> &nbsp;&nbsp;&nbsp;
                <Header as="h2" className="noEditMode on">{focus.plate_number} </Header> &nbsp;&nbsp;&nbsp;
                <Form className="editMode off">
                    <Form.Field className="editMode off">
                        <input placeholder={focus.plate_number} onChange={newPlateId} />
                    </Form.Field>
                </Form>
                <Button size="mini" className="noEditMode on" onClick={() => editVisit()}>Edit</Button>
                <Button color="green"size="mini" className="editMode off" onClick={() => updateReq()}>Submit</Button>
                <Button color="red" size="mini" className="editMode off" onClick={() => editVisit()}>Cancel</Button>
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