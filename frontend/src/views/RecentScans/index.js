import React, {useState} from 'react';
import MostRecentScan from '../../components/RecentScans/MostRecentScan'
import PastScans from '../../components/RecentScans/PastScans'

function RecentScans() {
    return (
        <div className="recentScansPage">
            <div className="recent">
                <MostRecentScan />
            </div>
            <p className="pastTitle">Past 2nd to 11th visits &nbsp; &gt;</p>
            <div className="past">
                <PastScans />
            </div>
        </div>
        
    )
}

export default RecentScans;