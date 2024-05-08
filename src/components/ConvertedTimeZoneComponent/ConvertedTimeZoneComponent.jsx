import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import "../TimeZonePreviewComponent/TimeZonePreviewComponent.css"

const ConvertedTimeZoneComponent = ({ country, startDate, endDate }) => {
    const [convertedStartDate, setConvertedStartDate] = useState(null);
    const [convertedEndDate, setConvertedEndDate] = useState(null);
    const [convertedStartTime, setConvertedStartTime] = useState(null);
    const [convertedEndTime, setConvertedEndTime] = useState(null);

    useEffect(() => {
        const convertDate = (date) => {
            const momentObj = moment(date);
            const outputData = momentObj.clone().tz(country);
            return outputData.format('DD-MM-YYYY');
        };

        const convertTime = (date) => {
            const momentObj = moment(date);
            const outputData = momentObj.clone().tz(country);
            return outputData.format('HH:mm');
        };

        // Call conversion functions and set state
        setConvertedStartDate(convertDate(startDate));
        setConvertedEndDate(convertDate(endDate));
        setConvertedStartTime(convertTime(startDate));
        setConvertedEndTime(convertTime(endDate));
    }, [country, startDate, endDate]); // Add dependencies to useEffect

    return (
        <div className="converted-time-container">
            {convertedStartDate && <p>{convertedStartDate}</p>}
            {convertedStartTime && <span>{convertedStartTime}</span>}

            {convertedEndDate && <p className="end-date">{convertedEndDate}</p>}
            {convertedEndTime && <span>{convertedEndTime}</span>}
        </div>
    );
};


export default ConvertedTimeZoneComponent;
