import {useState} from "react";
import {useParams} from "react-router-dom";
import {Box, CircularProgress} from "@mui/material";
import {useWorkplan} from "../../hooks/UseWorkPlans.tsx";
import {Calendar} from "./Calendar";
import {useShifts} from "../../hooks/UseShifts.tsx";
import {Shift} from "../../model/Shift.ts";
import {ShiftList} from "../shift/ShiftList.tsx";

// Helper function to format the date

export function PlanPage() {
    const { id } = useParams<{ id: string }>();
    const {isLoading: workplanLoading, isError: workplanError, workplan} = useWorkplan(id as string);
    const {isLoading: shiftLoading, isError: shiftError, shifts} = useShifts();

// You can now access workplan and shift along with their respective loading and error states


    const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0); // Track the current month index

    if (workplanLoading) {
        return <CircularProgress size={24} sx={{ color: "var(--text)" }} />;
    }

    if (workplanError) {
        return <div>Error loading workplan.</div>;
    }

    if (!workplan) {
        return <p>No workplan found.</p>;
    }

    if (shiftLoading) {
        return <CircularProgress size={24} sx={{color: "var(--text)"}}/>;
    }
    if (shiftError) {
        return <div>Error loading shift.</div>;
    }
    if (!shifts) {
        return <p>No shift found.</p>;
    }

    // Generate all dates within the planning period
    const startDate = new Date(workplan.start);
    const endDate = new Date(workplan.end);
    const allDates: Date[] = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        allDates.push(new Date(d));
    }

    // Group dates by month
    const months: { [key: string]: Date[] } = {};
    allDates.forEach((date) => {
        const key = `${date.getFullYear()}-${date.getMonth()}`;
        if (!months[key]) months[key] = [];
        months[key].push(date);
    });

    const monthKeys = Object.keys(months);
    const displayedMonthKey = monthKeys[currentMonthIndex];
    const displayedDates = months[displayedMonthKey];


// Find the first Monday of the month
    const firstDate = displayedDates[0];
    const firstMonday = new Date(firstDate);
    const diffToMonday = (firstMonday.getDay() === 0 ? 6 : firstMonday.getDay() - 1); // Calculate the offset to Monday
    firstMonday.setDate(firstMonday.getDate() - diffToMonday);

// Fill the first week with nulls if the month doesn't start on Monday
    const daysBeforeMonday = Math.max(0, diffToMonday);
    const filledDates = Array(daysBeforeMonday).fill(null).concat(displayedDates);



// Group the days by weeks, starting from Monday
    const weeks: (Date | null)[][] = [];
    for (let i = 0; i < filledDates.length; i += 7) {
        weeks.push(filledDates.slice(i, i + 7));
    }

    // Check the last week and fill with nulls if it doesn't end on Sunday
    const lastWeek = weeks[weeks.length - 1];
    const daysToFill = 7 - lastWeek.length;
    if (daysToFill > 0) {
        lastWeek.push(...Array(daysToFill).fill(null));
    }

    const currentMonth = new Date(Number(displayedMonthKey.split("-")[0]),
        Number(displayedMonthKey.split("-")[1])).toLocaleString("default",
        { month: "long",
            year: "numeric" });

    // Handle pagination change for months
    const handleMonthChange = (_: React.ChangeEvent<unknown>, newPage: number) => setCurrentMonthIndex(newPage - 1);

    console.log(workplan)

    return (
        <Box sx={{padding: 3, display: 'flex', flexDirection: 'row', gap: 3}}>
            <Box sx={{width: '30%', backgroundColor: "var(--background-secondary)", padding: 2}}>
                <ShiftList shifts={shifts as Shift[]}/>
            </Box>

            <Box sx={{width: '70%'}}>
                <Box sx={{backgroundColor: "var(--background-secondary)", padding: 2}}>
                    <Box sx={{marginBottom: 3}}>
                        <Calendar
                            weeks={weeks}
                            currentMonth={currentMonth}
                            totalMonths={monthKeys.length}
                            currentMonthIndex={currentMonthIndex}
                            handleMonthChange={handleMonthChange}
                            planningShifts={workplan.planningShifts}
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}