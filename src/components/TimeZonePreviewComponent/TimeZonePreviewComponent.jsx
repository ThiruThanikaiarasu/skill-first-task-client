import axios from 'axios'
import moment from 'moment-timezone'
import React, { useEffect, useState } from 'react'
import "./TimeZonePreviewComponent.css"
import ConvertedTimeZoneComponent from '../ConvertedTimeZoneComponent/ConvertedTimeZoneComponent'

const TimeZonePreviewComponent = () => {

    const [timeZone, setTimeZone] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [isEditDisabled, setIsEditDisabled] = useState(true)

    useEffect( () => {
        axios
        .get('http://localhost:3500/api/v1/latest-time-shedule')
            .then((response) => {
                const data = response.data.data[0]
                setTimeZone(data.timeZone)
                setStartDate(data.startDate)
                setEndDate(data.endDate)
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            })

            const intervalId = setInterval(() => {
                // Get the current date and time according to the user's browser timezone
                const currentDateTime = moment();

                const convertDate = (date) => {
                    const momentObj = moment(date);
                    const outputData = momentObj.clone().tz("Asia");
                    return outputData.format('DD-MM-YYYY');
                };

                // Check if current date is within the range of start date and end date
                setIsEditDisabled(!currentDateTime.isBetween(convertDate(startDate), convertDate(endDate)));
            }, 1000);
    }, [])

    const convertDate = async (country) => {
        const momentObj = moment(startDate)
        const outputData = await momentObj.clone().tz(country)
        // console.log(outputData.format('YYYY-MM-DD HH:mm:ss'))
        return outputData.format('DD-MM-YYYY')
    }
    // convertDate()

    return (
        <div className="preview-container">
            <h2>Preview</h2>
            <div className="preview">
            <div className="country-container">
                <p className="country-name">IST</p>
                <ConvertedTimeZoneComponent country="Asia/Kolkatha" startDate={startDate} endDate={endDate}  />
            </div>
            <div className="country-container">
                <p className="country-name">JST</p>
                <ConvertedTimeZoneComponent country="Japan" startDate={startDate} endDate={endDate} />
            </div>
            <div className="country-container">
                <p className="country-name">GMT</p>
                <ConvertedTimeZoneComponent country="GMT0" startDate={startDate} endDate={endDate} />
            </div>
            <div className="country-container">
                <p className="country-name">Pacific</p>
                <ConvertedTimeZoneComponent country="Pacific" startDate={startDate} endDate={endDate} />
            </div>
            </div>
            <div className="edit-button">
                <button disabled={isEditDisabled}>edit</button>
            </div>
        </div> 
    )
}

export default TimeZonePreviewComponent