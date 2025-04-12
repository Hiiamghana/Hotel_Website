import React, { useState } from 'react';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from 'react-date-range';

const DateSlider = ({ onDateChange, onFilterChange }) => {
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
        key: "selection"
    });

    const handleSelect = (ranges) => {
        if (!ranges || !ranges.selection) {
            console.error("Invalid date selection:", ranges);
            return;
        }

        const { startDate, endDate } = ranges.selection;
        setDateRange({ startDate, endDate, key: "selection" });

        if (onDateChange) onDateChange(startDate, endDate);
        if (onFilterChange) onFilterChange(startDate, endDate);
    };

    const handleClearFilter = () => {
        setDateRange({ startDate: null, endDate: null, key: "selection" });

        if (onDateChange) onDateChange(null, null);
        if (onFilterChange) onFilterChange(null, null);
    };

    return (
        <>
            <h5>Filter bookings by date</h5>
            <DateRangePicker 
                ranges={[dateRange]} 
                onChange={handleSelect} 
                className="mb-4" 
            />
            <button className="btn btn-secondary" onClick={handleClearFilter}>
                Clear Filter
            </button>
        </>
    );
};

export default DateSlider;


// import React, { useState } from 'react';
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { DateRangePicker } from 'react-date-range';

// const DateSlider = ({ onDateChange, onFilterChange }) => {
//     const [dateRange, setDateRange] = useState({
//         startDate: new Date(),
//         endDate: new Date(),
//         key: "selection"
//     });

//     const handleSelect = (ranges) => {
//         if (!ranges || !ranges.selection) {
//             console.error("Invalid date selection:", ranges);
//             return;
//         }

//         const { startDate, endDate } = ranges.selection;
//         setDateRange({ startDate, endDate, key: "selection" });

//         if (onDateChange) onDateChange(startDate, endDate);
//         if (onFilterChange) onFilterChange(startDate, endDate);
//     };

//     const handleClearFilter = () => {
//         const today = new Date();
//         setDateRange({
//             startDate: today,
//             endDate: today,
//             key: "selection"
//         });

//         if (onDateChange) onDateChange(null, null);
//         if (onFilterChange) onFilterChange(null, null);
//     };

//     return (
//         <div className="mb-4">
//             <h5>Filter bookings by date</h5>
//             <DateRangePicker
//                 ranges={[dateRange]}
//                 onChange={handleSelect}
//                 className="mb-3"
//             />
//             {(dateRange.startDate || dateRange.endDate) && (
//                 <button className="btn btn-secondary" onClick={handleClearFilter}>
//                     Clear Filter
//                 </button>
//             )}
//         </div>
//     );
// };

// export default DateSlider;

