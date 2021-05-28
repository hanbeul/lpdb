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

        setFocus(res.data[lastIndex]);

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
        if (currentPage == 1) { } //do nothing
        else if (currentPage == 2) {
            document.getElementById("leftArrow").classList.add("off");
            setCurrentPage(currentPage - 1);
        }
        else {
            document.getElementById("rightArrow").classList.remove("off");
            setCurrentPage(currentPage - 1);
        }
    }

    const handleRightArrow = () => {
        const lastPage = Math.round(visits.length/10);
        if (currentPage <= 1) {
            setCurrentPage(currentPage + 1);
            document.getElementById("leftArrow").classList.remove("off")
        }
        else if (currentPage == lastPage -1) {
            setCurrentPage(currentPage + 1)
            document.getElementById("rightArrow").classList.add("off")
        }
        else if (currentPage >= lastPage) { }
        else {setCurrentPage(currentPage + 1); console.log(currentPage + '  ' + lastPage)}
    }
        

    return (
        <div className="recentScansPage">
            <div className="recent">
                <FocusedScan />
            </div>
            <div className="pastTitle">
                <div id="leftArrow" className="leftArrow off" onClick={handleLeftArrow}>&lt;</div>
                <Header>Scans #: {startIndex}-{endIndex}</Header>
                <div id="rightArrow" className="rightArrow" onClick={handleRightArrow}>&gt;</div>
            </div>
            <div className="past">
                <ScanList focus={focus} currentPage={currentPage} currentPagesVisits={currentPagesVisits}/>
            </div>
        </div>
        
    )
}

export default RecentScans;