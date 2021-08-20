import React, {useState, useEffect} from 'react';
import { Pagination } from 'semantic-ui-react'
import FocusedScan from '../../components/RecentScans/FocusedScan'
import ScanList from '../../components/RecentScans/ScanList'
import axios from 'axios';
const {REACT_APP_BACKEND_URL} = process.env;


function RecentScans() {
    console.log(REACT_APP_BACKEND_URL)
    const [focus, setFocus] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPagesVisits, setCurrentPagesVisits] = useState([]);
    const [totalPages, setTotalPages] = useState([]);

    useEffect(async () => {
        const res = await axios(
            REACT_APP_BACKEND_URL + '/api/visits/page/' + currentPage
        );
        if (res.data.length === 0) return;
        setCurrentPagesVisits(res.data);
        let initialFocus = res.data[0];
        setFocus(initialFocus);

        const res2 = await axios(
            REACT_APP_BACKEND_URL + '/api/visits/pagecount/total'
        )
        setTotalPages(res2.data)
    },[]);

    useEffect(() => {
        setFocus(focus);
    },[focus])

    useEffect(async () => {
        const res = await axios(
            REACT_APP_BACKEND_URL + '/api/visits/page/' + currentPage
        )
        setCurrentPagesVisits(res.data);

    },[currentPage])

    const handleFocusChange = e => {
        let focusedElementId = e.target.value;
        for (let i=0; i < currentPagesVisits.length; i++ ) {
            if (focusedElementId == currentPagesVisits[i].visit_id) {
                setFocus(currentPagesVisits[i]);
                break;
            }
        } 
    };


    const handleFocusEdit = async () => {
        const res = await axios(
            REACT_APP_BACKEND_URL + '/api/visits/' + focus.visit_id
        );
        console.log(res.data[0]);
        setFocus(res.data[0]);
    }

    const handleVisitDelete = async () => {
        const res = await axios(
            REACT_APP_BACKEND_URL + '/api/visits/page/' + currentPage
        );
        if (res.data.length === 0) return;
        setCurrentPagesVisits(res.data);
        setFocus(res.data[0]);
    }

    const handlePaginationChange = (e, {activePage}) => {
        let targetValue = Object.values({activePage})
        setCurrentPage(targetValue.toString());
    }
        
    return (
        <div className="recentScansPage">
            <div className="recent">
                <FocusedScan 
                    focus={focus} 
                    handleFocusEdit={handleFocusEdit}
                    handleVisitDelete = {handleVisitDelete} 
                />
            </div>
            <div className="pastTitle">
                <Pagination
                    activePage={currentPage}
                    onPageChange={handlePaginationChange}
                    boundaryRange={0}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    siblingRange={1}
                    totalPages={totalPages.total}
                />
            </div>
            <div className="past">
                <div className="pastTitleLgMedia">
                      <Pagination
                        activePage={currentPage}
                        onPageChange={handlePaginationChange}
                        boundaryRange={0}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={1}
                        totalPages={totalPages.total}
                    />
                </div>
                <ScanList 
                    focus={focus} 
                    handleFocusChange={handleFocusChange} 
                    currentPagesVisits={currentPagesVisits}
                />
            </div>
        </div>
        
    )
}

export default RecentScans;
