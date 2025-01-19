import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useWorkplan } from "../../hooks/UseWorkPlans.tsx";
import { Calendar } from "./Calendar";

// Helper function to format the date

export function PlanPage() {
    const { id } = useParams<{ id: string }>();
    const { isLoading, isError, workplan } = useWorkplan(id as string);

    const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0); // Track the current month index

    if (isLoading) {
        return <CircularProgress size={24} sx={{ color: "var(--text)" }} />;
    }

    if (isError) {
        return <div>Error loading workplan.</div>;
    }

    if (!workplan) {
        return <p>No workplan found.</p>;
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
        Number(displayedMonthKey.split("-")[1]) - 1).toLocaleString("default",
        { month: "long",
            year: "numeric" });

    // Handle pagination change for months
    const handleMonthChange = (_: React.ChangeEvent<unknown>, newPage: number) => setCurrentMonthIndex(newPage - 1);

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                {workplan.name}
            </Typography>

            <Box sx={{ backgroundColor: "var(--background-secondary)", padding: 2 }}>
                <Box sx={{ marginBottom: 3 }}>
                    <Calendar
                        weeks={weeks}
                        currentMonth={currentMonth}
                        totalMonths={monthKeys.length}
                        currentMonthIndex={currentMonthIndex}
                        handleMonthChange={handleMonthChange}
                    />
                </Box>
            </Box>
        </Box>
    );
};