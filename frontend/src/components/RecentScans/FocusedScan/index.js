import React, {useState, useEffect} from 'react';
import sampleLP from '../../../demo/Image-Coming-Soon.jpg'
import { Button, Header, Form, Modal, Icon } from 'semantic-ui-react'
import axios from 'axios';

function FocusedScan(props) {
    const [focus, setFocus] = useState([]);
    const [totalVisit, setTotalVisit] = useState([]);           
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setFocus(props.focus);
    },[])

    useEffect(async () => {
        setFocus(props.focus);
        const res = await axios(
            'http://localhost:9000/api/visits/countvisits/' + props.focus.plate_id
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


    const updateReq = async () => {
        await axios.put('http://localhost:9000/api/visits/' + focus.visit_id, {plate_number: editData})
        setEditMode(false);
    }

    const deleteVisit = async () => {
        await axios.delete('http://localhost:9000/api/visits/' + focus.visit_id)
        setOpen(false)
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
            {/* <Button size="large"color="red"onClick={() => editVisit('MRSNOOPY')}>Delete</Button> */}
            <Modal
                basic
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                size='small'
                trigger={<Button color="red">Delete</Button>}
                >
                <Header icon>
                    <Icon name='trash' />
                    Delete This Scan?
                </Header>
                <Modal.Content>
                    <p>
                    Delete the record of scan ID {focus.visit_id}?
                    THIS OPERATION IS IRREVERSIBLE.
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpen(false)}>
                    <Icon name='remove' /> No
                    </Button>
                    <Button color='green' inverted onClick={() => deleteVisit()}>
                    <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default FocusedScan