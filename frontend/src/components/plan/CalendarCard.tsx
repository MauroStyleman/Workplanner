import { Paper, Typography } from "@mui/material";
import { ShiftIndicator } from "./ShiftIndicator";

interface Shift {
    name: string;
    color: string;
}

interface CalendarCardProps {
    date: Date;
    shifts?: Shift[];
    onDateClick?: (date: Date) => void;
    onShiftClick?: (shift: Shift, index: number) => void;
}

export const CalendarCard = ({ date, shifts, onDateClick, onShiftClick }: CalendarCardProps) => {
    const formatDate = (date: Date) => date.getDate();
    return (
        <Paper
            elevation={2}
            sx={{
                padding: 1,
                width: { xs: 35, sm: 50, md: 70, lg: 90 },
                height: { xs: 35, sm: 50, md: 70, lg: 90 },
                backgroundColor: "var(--text)",
                color: "var(--text)",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                flexDirection: "column",
                cursor: "pointer",
                "&:hover": {
                   backgroundColor: "var(--primary)",
                },
            }}
            onClick={() => onDateClick && onDateClick(date)}
        >
            <Typography
                variant="body1"
                sx={{
                    border: "2px solid var(--secondary)",
                    borderRadius: "50%",
                    backgroundColor: "var(--accent)",
                    width: 10,
                    height: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 1,
                }}
            >
                {formatDate(date)}
            </Typography>
            {shifts && (
                <ShiftIndicator
                    shifts={shifts}
                    onClick={onShiftClick}
                />
            )}
        </Paper>
    );
};

export const OffSetCalendarCard = () => {
    return(
        <Paper
            sx={{
                padding: 1,
                width: {xs: 35, sm: 50, md: 70, lg: 90},
                height: {xs: 35, sm: 50, md: 70, lg: 90},
                backgroundColor: "var(--accent)",
                display: "flex",
                justifyContent: "center",
            }}
        >
        </Paper>
    )
}
