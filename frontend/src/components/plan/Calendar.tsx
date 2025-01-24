import {Box, Typography} from "@mui/material";
import {CalendarPagination} from "./Calendarpagination.tsx";
import {PlanningShift} from "../../model/PlanningShift.ts";
import {CalendarCard, OffSetCalendarCard} from "./CalendarCard.tsx";

// Helper function to format the date

interface CalendarProps {
    weeks: (Date | null)[][],
    currentMonth: string;
    totalMonths: number;
    currentMonthIndex: number;
    handleMonthChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    planningShifts: PlanningShift[];
}


export const Calendar = ({
                             weeks,
                             currentMonth,
                             totalMonths,
                             currentMonthIndex,
                             handleMonthChange,
                             planningShifts
                         }: CalendarProps) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const shiftsByDate = planningShifts.reduce((acc, shift) => {
        if (!acc[shift.date]) {
            acc[shift.date] = [];
        }
        acc[shift.date].push(shift.shift);
        acc[shift.date].sort((a, b) => a.name.localeCompare(b.name));
        return acc;
    }, {} as { [key: string]: PlanningShift["shift"][] });



    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            width: "100%"
        }}>
            <Typography variant="h6" sx={{marginBottom: 2, fontWeight: 'bold'}}>{currentMonth}</Typography>

            <CalendarPagination count={totalMonths} currentMonthIndex={currentMonthIndex} onChange={handleMonthChange}/>


            <table style={{borderCollapse: "collapse"}}>
                <thead>
                <tr>
                    {daysOfWeek.map((day, index) => (
                        <th
                            key={index}
                            style={{
                                textAlign: "center",
                                padding: 5,
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    color: "var(--primary)",
                                }}
                            >
                                {day}
                            </Typography>
                        </th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {weeks.map((week, index) => (
                    <tr key={index}>
                        {week.map((date, idx) => (
                            date ? (
                                <td key={idx} style={{textAlign: "center", padding: 2, margin: 0}}>
                                    <CalendarCard
                                        date={date}
                                        shifts={shiftsByDate[date.toISOString().split('T')[0]]}
                                        onDateClick={(selectedDate) => {
                                            console.log(`Clicked on date: ${selectedDate}`);
                                        }}
                                        onShiftClick={(shift, index) => {
                                            console.log(`Clicked on shift: ${shift.name}, Index: ${index}`);
                                        }}
                                    />
                                </td>
                            ) : (
                                <td key={idx} style={{textAlign: "center", padding: 2, margin: 0}}>
                                        <OffSetCalendarCard></OffSetCalendarCard>
                                </td>
                            )
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </Box>
    );
};
