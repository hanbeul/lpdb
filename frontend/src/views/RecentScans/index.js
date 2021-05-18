import React, {useState} from 'react';
import MostRecentScan from '../../components/RecentScans/MostRecentScan'

function RecentScans() {
    return (
        <div>
            <div className="recent">
                <MostRecentScan />
            </div>
            <div className="past">
                <p>This is where the past scans will go.</p>
            </div>
        </div>
        
    )
}

export default RecentScans;