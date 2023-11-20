import {
    addDays,
    addMonths,
    addWeeks,
    format,
    getWeek,
    isSameDay,
    lastDayOfWeek,
    startOfWeek,
    subMonths,
    subWeeks,
} from "date-fns";
import { useState } from "react";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import moment from "moment";
import { useSelector } from "react-redux";
import { IEvent } from "redux/reducer/event";
import { RootState } from "redux/store";
import Config from "utils/Config";
import PopupAddEvent from "./popup/addEventPopup";
import "./styles.scss";

export const MainCalendar = ({ showDetailsHandle }: { showDetailsHandle: Function }) => {
    const listEvent = useSelector((state: RootState) => state.eventState);
    const [openPopupAddEvent, setOpenPopupAddEvent] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({} as IEvent);
    const [mode, setMode] = useState("");
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
    const [selectedDate, setSelectedDate] = useState(new Date());
    const changeMonthHandle = (btnType: string) => {
        if (btnType === "prev") {
            setCurrentMonth(subMonths(currentMonth, 1));
        }
        if (btnType === "next") {
            setCurrentMonth(addMonths(currentMonth, 1));
        }
    };

    const changeWeekHandle = (btnType: string) => {
        //console.log("current week", currentWeek);
        if (btnType === "prev") {
            //console.log(subWeeks(currentMonth, 1));
            setCurrentMonth(subWeeks(currentMonth, 1));
            setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
        }
        if (btnType === "next") {
            //console.log(addWeeks(currentMonth, 1));
            setCurrentMonth(addWeeks(currentMonth, 1));
            setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
        }
    };

    const onDateClickHandle = (day: Date, dayStr: string) => {
        setSelectedDate(day);
        showDetailsHandle(dayStr);
    };

    const renderHeader = () => {
        const dateFormat = "MMMM yyyy";
        // console.log("selected day", selectedDate);
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    {/* <div className="icon" onClick={() => changeMonthHandle("prev")}>
		  prev month
		</div> */}
                </div>
                <div className="col col-center">
                    <span>{format(currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end">
                    {/* <div className="icon" onClick={() => changeMonthHandle("next")}>next month</div> */}
                </div>
            </div>
        );
    };
    const renderDays = () => {
        const dateFormat = "EEE";
        const days = [];
        let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>,
            );
        }
        return <div className="days row">{days}</div>;
    };
    const renderCells = () => {
        const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
        const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${
                            isSameDay(day, new Date())
                                ? "today"
                                : isSameDay(day, selectedDate)
                                ? "selected"
                                : ""
                        }`}
                        key={i}
                        onClick={() => {
                            // const dayStr = format(cloneDay, "ccc dd MMM yy");
                            // onDateClickHandle(cloneDay, dayStr);
                        }}
                    >
                        <span className="number">{formattedDate}</span>
                        {/* <span className="bg">{formattedDate}</span> */}
                        <div className="list-event">
                            {listEvent.map((event, index) => {
                                const eventDate = moment(event.startTime);
                                const cloneDate = moment(cloneDay);

                                if (eventDate.isSame(cloneDate, "day")) {
                                    return (
                                        <ListItem className="item" disablePadding key={event._id}>
                                            <ListItemButton
                                                onClick={() => {
                                                    setOpenPopupAddEvent(true);
                                                    setSelectedEvent(event);
                                                    setMode(Config.MODE_VIEW_EVENT);
                                                }}
                                            >
                                                <ListItemText primary={event.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                }
                            })}
                        </div>
                    </div>,
                );
                day = addDays(day, 1);
            }

            rows.push(
                <div className="row" key={1}>
                    {days}
                </div>,
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    };
    const renderFooter = () => {
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={() => changeWeekHandle("prev")}>
                        prev week
                    </div>
                </div>
                <div className="current-week">{currentWeek}</div>
                <div className="col col-end" onClick={() => changeWeekHandle("next")}>
                    <div className="icon">next week</div>
                </div>
            </div>
        );
    };
    return (
        <div className="calendar">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
            {renderFooter()}
            <PopupAddEvent
                selectedEvent={selectedEvent}
                mode={mode}
                setMode={setMode}
                open={openPopupAddEvent}
                setOpen={setOpenPopupAddEvent}
            />
        </div>
    );
};
