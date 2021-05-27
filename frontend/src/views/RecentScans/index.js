import React, {useState} from 'react';
import FocusedScan from '../../components/RecentScans/FocusedScan'
import ScanList from '../../components/RecentScans/ScanList'

function RecentScans() {
    return (
        <div className="recentScansPage">
            <div className="recent">
                <FocusedScan />
            </div>
            {/* <p className="pastTitle">Past 2nd to 11th visits &nbsp; &gt;</p> */}
            <div className="past">
                <ScanList />
            </div>
        </div>
        
    )
}

export default RecentScans;