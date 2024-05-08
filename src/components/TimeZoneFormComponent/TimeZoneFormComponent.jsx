import React, { useState, useEffect } from 'react'
import "./TimeZoneFormComponent.css"
import moment from 'moment-timezone'
import axios from 'axios'

const TimeZoneFormComponent = () => {

    const [currentTimeZone, setCurrentTimeZone] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [timeZones, setTimeZones] = useState([])

    useEffect(() => {
        const allTimeZones = moment.tz.names()
        const flattenedTimeZones = allTimeZones.flat()
        setTimeZones(flattenedTimeZones)
    }, [])

    const getOffset = (timeZone) => {
        const offset = moment.tz(timeZone).utcOffset();
        return offset;
    };

    const handleTimeZoneChange = (event) => {
        console.log(event.target.value)
        setCurrentTimeZone(event.target.value)
    }

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value)
    }
    
    const handleEndDateChange = (event) => {
        setEndDate(event.target.value)
    }

    const handleSubmit = () => {
        console.log("clicked")
        console.log(currentTimeZone, startDate, endDate)
        axios
            .post('http://localhost:3500/api/v1/add-time', 
                { 
                    timeZone: currentTimeZone,
                    startDate,
                    endDate
                }
            )
            .then( (response) => {
                console.log(response.data)
                if(response.status == 201) {
                    location.href = "/preview"
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="form-container">
            <div className="form-header">
                <label htmlFor="timeZone">Time Zone:</label>
                <select id="timeZone" onChange={handleTimeZoneChange}>
                    <option value="choose">-----------------------Choose one----------------------</option>
                    {timeZones.map((timeZone, index) => (
                    <option key={index} value={timeZone} >
            (UTC{getOffset(timeZone) >= 0 ? '+' : ''}{getOffset(timeZone)}) {timeZone} 
                    </option>
                    ))}
                </select>
            </div>
                
            <div className="form-body">
                <div className="start-date">
                    <label htmlFor="">Start Date: </label>
                    <input 
                        type="datetime-local" 
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                </div>
                <div className="end-date">
                    <label htmlFor="">End Date: </label>
                    <input 
                        type="datetime-local" 
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>
            </div>
            <div className="form-button">
                <button onClick={handleSubmit}>Save</button>
            </div>
        </div>
    )
}

export default TimeZoneFormComponent
