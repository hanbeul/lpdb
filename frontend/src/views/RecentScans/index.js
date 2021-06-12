import React, {useState, useEffect} from 'react';
import { Header } from 'semantic-ui-react'
import FocusedScan from '../../components/RecentScans/FocusedScan'
import ScanList from '../../components/RecentScans/ScanList'
import axios from 'axios';

function RecentScans() {
    const [visits, setVisits] = useState([]);
    const [focus, setFocus] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPagesVisits, setCurrentPagesVisits] = useState([]);
    const [startIndex, setStartIndex] = useState([]);
    const [endIndex, setEndIndex] = useState([]);

    useEffect(async () => {
        const res = await axios(
            'http://localhost:9000/api/visits',
        );
        setVisits(res.data);

        let lastIndex = res.data.length - 1; //this part gets the newest scan, assuming newest scan will be the last object in the JSON.
        let initialFocus = res.data[lastIndex];
        initialFocus.index = lastIndex; //assigns index as part of data, so I can use it in the child component
        setFocus(initialFocus);

        //Below is a sad hack, since I can't get the visits state to update the first time around properly.
        //This part updates the currentPagesVisits state at component mounting, then 
        //the following useEffect updates it each time currentPage is updated. 
        //I feel like there would be a better way to do this...
        const startIndex = res.data.length - Number((currentPage - 1) + '1'); 
        setStartIndex(startIndex);
        const endIndex = res.data.length - (currentPage * 10);
        setEndIndex(endIndex);
        const selectedVisits = res.data.slice(endIndex, startIndex).reverse();
        console.log('this updates once during component mounting')
        setCurrentPagesVisits(selectedVisits);
    },[]);

    useEffect(() => {
        setFocus(focus);
    },[focus])

    useEffect(() => {
        const startIndex = visits.length - Number((currentPage - 1) + '1');
        setStartIndex(startIndex);
        const endIndex = visits.length - (currentPage * 10);
        setEndIndex(endIndex);
        const selectedVisits = visits.slice(endIndex, startIndex).reverse();
        console.log('this updates in the beginning, then whenever currentPage gets updated. It resolves sooner then above at start because above needs to fetch data')
        setCurrentPagesVisits(selectedVisits);
    },[currentPage])

    const handleLeftArrow = () => {
        //some of the mess below is to change the arrow colors when there is no more pages to turn to. 
        let leftArrows = document.getElementsByClassName("leftArrow");
        let rightArrows = document.getElementsByClassName("rightArrow");
        if (currentPage == 1) { } //do nothing
        else if (currentPage == 2) {
            for (let i=0; i<leftArrows.length; i++) {
                leftArrows[i].classList.add("off");
            }
            setCurrentPage(currentPage - 1);
        }
        else {
            for (let i=0; i<rightArrows.length; i++) {
                rightArrows[i].classList.remove("off");
            }
            setCurrentPage(currentPage - 1);
        }
    }

    const handleRightArrow = () => {
        let leftArrows = document.getElementsByClassName("leftArrow");
        let rightArrows = document.getElementsByClassName("rightArrow");
        const lastPage = Math.round(visits.length/10);
        if (currentPage <= 1) {
            setCurrentPage(currentPage + 1);
            for (let i=0; i<leftArrows.length; i++) {
                leftArrows[i].classList.remove("off");
            }
        }
        else if (currentPage == lastPage -1) {
            setCurrentPage(currentPage + 1)
            for (let i=0; i<rightArrows.length; i++) {
                rightArrows[i].classList.add("off");
            }
        }
        else if (currentPage >= lastPage) { }
        else {setCurrentPage(currentPage + 1);}
    }

    const handleFocusChange = e => {
        let focusedElementId = e.target.value;
        for (let i=0; i < currentPagesVisits.length; i++ ) {
            if (focusedElementId == currentPagesVisits[i].visit_id) {
                setFocus(currentPagesVisits[i]);
                break;
            }
        } 
    };

    //Commenting below out for now; I will come back to implementing
    //refreshing the focus update when plate number is edited
    //when API refactor occurs to make smaller, incremental GET requests
    //for the data. As of now, I cannot reasonably add this feature. 
    // const handleFocusEdit = async (updateFocus) => {
    //     const res = await axios(
    //         'http://localhost:9000/api/visits',
    //     );
    //     setVisits(res.data);
    //     updateFocus()
    // }
        
    return (
        <div className="recentScansPage">
            <div className="recent">
                <FocusedScan focus={focus}/>
            </div>
            <div className="pastTitle">
                <div id="leftArrow" className="leftArrow off noselect" onClick={handleLeftArrow}>&lt;</div>
                <Header>Scans #: {startIndex}-{endIndex}</Header>
                <div id="rightArrow" className="rightArrow noselect" onClick={handleRightArrow}>&gt;</div>
            </div>
            <div className="past">
                <div className="pastTitleLgMedia">
                    <div id="leftArrow" className="leftArrow off noselect " onClick={handleLeftArrow}>&lt;</div>
                    <Header>Scans #: {startIndex}-{endIndex}</Header>
                    <div id="rightArrow" className="rightArrow noselect" onClick={handleRightArrow}>&gt;</div>
                </div>
                <ScanList focus={focus} handleFocusChange={handleFocusChange} currentPagesVisits={currentPagesVisits}/>
            </div>
        </div>
        
    )
}

export default RecentScans;