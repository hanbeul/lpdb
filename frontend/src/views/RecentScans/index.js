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
        const endIndex = res.data.length - (currentPage * 10);
        const selectedVisits = res.data.slice(endIndex, startIndex).reverse();
        console.log('this updates once during component mounting')
        setCurrentPagesVisits(selectedVisits);
    },[]);

    useEffect(() => {
        const startIndex = visits.length - Number((currentPage - 1) + '1');
        const endIndex = visits.length - (currentPage * 10);
        const selectedVisits = visits.slice(endIndex, startIndex).reverse();
        console.log('this updates in the beginning, then whenever currentPage gets updated. It resolves sooner then above at start because above needs to fetch data')
        setCurrentPagesVisits(selectedVisits);
    },[currentPage])

    const handleLeftArrow = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleRightArrow = () => {
        setCurrentPage(currentPage + 1);
    }

    return (
        <div className="recentScansPage">
            <div className="recent">
                <FocusedScan />
            </div>
            <div className="pastTitle">
                <div className="leftArrow" onClick={handleLeftArrow}>&lt;</div>
                <Header>Scans #: 943-953</Header>
                <div className="rightArrow" onClick={handleRightArrow}>&gt;</div>
            </div>
            <div className="past">
                <ScanList focus={focus} currentPage={currentPage} currentPagesVisits={currentPagesVisits}/>
            </div>
        </div>
        
    )
}

export default RecentScans;