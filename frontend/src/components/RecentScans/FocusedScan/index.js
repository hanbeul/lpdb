import React, {useState, useEffect} from 'react';
import { Button, Header, Form, Modal, Icon } from 'semantic-ui-react'
import axios from 'axios';
const {REACT_APP_BACKEND_URL} = process.env;

function FocusedScan(props) {
    const [focus, setFocus] = useState([]);
    const [totalVisit, setTotalVisit] = useState([]);
    const [checkBoxes, setCheckBoxes] = useState([]);           
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(async() => {
        const res = await axios(
            REACT_APP_BACKEND_URL + '/api/visits/' + props.focus.visit_id
        )
        setFocus(res.data)
    },[])

    useEffect(async () => {
        const res = await axios(
            REACT_APP_BACKEND_URL + '/api/visits/' + props.focus.visit_id
        )
        setFocus(res.data)
        const res2 = await axios(
            REACT_APP_BACKEND_URL + '/api/visits/countvisits/' + props.focus.plate_id
        )
        setTotalVisit(res2.data); 
        const checkInCompletion = 10;
        let checkInCount = res2.data[1]['checkInCount'];
        let checkInProgress = [];
        for (let i = 1; i <= checkInCompletion; i++) {
            if (checkInCount >= i) {
                let checkBox = {"checked_in": true}
                checkInProgress.push(checkBox);
            }  
            else {
                let checkBox = {"checked_in": false}
                checkInProgress.push(checkBox);
            };
        }
        setCheckBoxes(checkInProgress);
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
        await axios.put(REACT_APP_BACKEND_URL + '/api/visits/' + focus[0]['visit_id'], {plate_number: editData})
        setEditMode(false);
        props.handleFocusEdit();
        const res = await axios(
            REACT_APP_BACKEND_URL + '/api/visits/countvisits/' + props.focus.plate_id
        )
        setTotalVisit(res.data); 
    }

    const deleteVisit = async () => {
        await axios.delete(REACT_APP_BACKEND_URL + '/api/visits/' + focus[0]['visit_id'])
        setOpen(false);
        props.handleVisitDelete();
    }

    return (
        <div className="focusedScan">
            {/* <Header as="h1">Scan # {focus[0] ? focus[0]['visit_id'] : ""}</Header> */}
            <img src={focus[0] ? REACT_APP_BACKEND_URL + `/images/${focus[0]['visit_image_path']}`: ""} />
            <div className="focusedScanTextArea">
                {/* <Header as="h2"> Plate #: </Header> &nbsp;&nbsp;&nbsp; */}
                <Header as="h2" className="noEditMode on">{focus[0] ? focus[0]['plate_number'] : ""} </Header> &nbsp;&nbsp;&nbsp;
                <Form className="editMode off">
                    <Form.Field className="editMode off">
                        <input placeholder={focus[0] ? focus[0]['plate_number'] : ""} onChange={newPlateId} />
                    </Form.Field>
                </Form>
                <Button size="mini" className="noEditMode on" onClick={() => editVisit()}>Edit</Button>
                <Button color="green"size="mini" className="editMode off" onClick={() => updateReq()}>Submit</Button>
                <Button color="red" size="mini" className="editMode off" onClick={() => editVisit()}>Cancel</Button>
            </div>
            <div className="focusedScanTextArea">
                <Header as="h2">{focus[0] ? new Date(focus[0]['visit_date']).toLocaleString() : ""}</Header>
            </div>
            <div className="focusedScanTextArea">
                <Header as="h2">Free Wash Check-In: &nbsp; {totalVisit[0] ? totalVisit[1]['checkInCount'] : ""} / 10</Header>
            </div>


            <div className="checkBoxDiv">
                {checkBoxes.map(checkBox => {
                    if (checkBox.checked_in) {
                        return(
                        <div class="checkBox-checked">
                            <div class="checkMark"></div>
                        </div>)      
                    }
                    else {
                        return(
                        <div class="checkBox-unchecked">
                            <div class="checkMark"></div>
                        </div>           
                        )
                    }
                })}
            </div>
            <div className="focusedScanTextArea">
            </div>

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
                    Delete This Visit?
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