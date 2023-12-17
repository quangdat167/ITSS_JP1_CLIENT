import { useEffect, useState } from "react";
import { MainCalendar } from "./MainCalendar";
import Calendar from "react-calendar";
import ListEvent from "./ListEvent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { getAllEventByUserIdApi } from "service/event.service";
import { IEvent, addEvent } from "redux/reducer/event";

function CalendarPage() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state?.userInfoState);
    const [showDetails, setShowDetails] = useState(false);
    const [data, setData] = useState("");
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const showDetailsHandle = (dayStr: string) => {
        setData(dayStr);
        setShowDetails(true);
    };

    useEffect(() => {
        const getEvent = async () => {
            let events: IEvent[] = await getAllEventByUserIdApi({ userId: userInfo?._id });
            if (events.length > 0) {
                events = events.sort((a, b) =>
                    a.startTime < b.startTime ? -1 : a.startTime > b.startTime ? 1 : 0,
                );
                dispatch(addEvent(events));
            }
        };
        userInfo?.email && getEvent();
    }, [userInfo?.email]);

    return (
        <div className="calendar-wrapper">
            <MainCalendar
                showDetailsHandle={showDetailsHandle}
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
            />
            <div className="calendar-right">
                <div className="react-calendar">
                    <Calendar
                        onClickDay={(e) => {
                            setCurrentMonth(e);
                        }}
                    />
                </div>
                <ListEvent />
            </div>
        </div>
    );
}

export default CalendarPage;
