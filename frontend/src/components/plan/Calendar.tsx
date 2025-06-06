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
    startDate: Date;
    endDate: Date;
}


export const Calendar = ({
                             weeks,
                             currentMonth,
                             totalMonths,
                             currentMonthIndex,
                             handleMonthChange,
                             planningShifts, startDate, endDate,

                         }: CalendarProps) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const shiftsByDate = planningShifts.reduce((acc, shift) => {
        if (!acc[shift.startDate]) {
            acc[shift.startDate] = [];
        }
        acc[shift.startDate].push(shift.shift);
        acc[shift.startDate].sort((a, b) => a.name.localeCompare(b.name));
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
                                        onShiftClick={(shift, index) => {
                                            console.log(`Clicked on shift: ${shift.name}, Index: ${index}`);
                                        }}
                                        startDate={startDate}
                                        endDate={endDate}
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
