import React, {useState, useEffect} from 'react';
import { Header, Pagination } from 'semantic-ui-react'
import FocusedScan from '../../components/RecentScans/FocusedScan'
import ScanList from '../../components/RecentScans/ScanList'
import axios from 'axios';

function RecentScans() {
    const [focus, setFocus] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPagesVisits, setCurrentPagesVisits] = useState([]);
    const [totalPages, setTotalPages] = useState([]);

    useEffect(async () => {
        const res = await axios(
            'http://localhost:9000/api/visits/page/' + currentPage,
        );
        if (res.data.length === 0) return;
        setCurrentPagesVisits(res.data);
        let initialFocus = res.data[0];
        setFocus(initialFocus);

        const res2 = await axios(
            'http://localhost:9000/api/visits/pagecount/total'
        )
        setTotalPages(res2.data)
    },[]);

    useEffect(() => {
        setFocus(focus);
    },[focus])

    useEffect(async () => {
        const res = await axios(
            'http://localhost:9000/api/visits/page/' + currentPage
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

    const handlePaginationChange = (e, {activePage}) => {
        let targetValue = Object.values({activePage})
        setCurrentPage(targetValue.toString());
    }
        
    return (
        <div className="recentScansPage">
            <div className="recent">
                <FocusedScan focus={focus}/>
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
                <ScanList focus={focus} handleFocusChange={handleFocusChange} currentPagesVisits={currentPagesVisits}/>
            </div>
        </div>
        
    )
}

export default RecentScans;
