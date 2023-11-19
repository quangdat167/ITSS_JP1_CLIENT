import { useState } from "react";
import { MainCalendar } from "./MainCalendar";
import Calendar from "react-calendar";
import ListEvent from "./ListEvent";

function CalendarPage() {
    const [showDetails, setShowDetails] = useState(false);
    const [data, setData] = useState("");

    const showDetailsHandle = (dayStr: string) => {
        setData(dayStr);
        setShowDetails(true);
    };
    return (
        <div className="calendar-wrapper">
            <MainCalendar showDetailsHandle={showDetailsHandle} />
            <div className="calendar-right">
                <Calendar />
                <ListEvent />
            </div>
        </div>
    );
}

export default CalendarPage;
