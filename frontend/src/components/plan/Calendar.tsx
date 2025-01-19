import { Box, Paper, Typography } from "@mui/material";
import {CalendarPagination} from "./Calendarpagination.tsx";

// Helper function to format the date
const formatDate = (date: Date) => date.getDate();

interface CalendarProps {
    weeks: (Date | null)[][],
    currentMonth: string;
    totalMonths: number;
    currentMonthIndex: number;
    handleMonthChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}



export const Calendar = ({ weeks, currentMonth, totalMonths, currentMonthIndex, handleMonthChange }: CalendarProps) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
                                    <Paper
                                        elevation={2}
                                        sx={{
                                            padding: 1,
                                            width: {xs: 35, sm: 50, md: 70, lg: 90},
                                            height: {xs: 35, sm: 50, md: 70, lg: 90},
                                            backgroundColor: "var(--text)",
                                            color: "var(--text)",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
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
                                    </Paper>
                                </td>
                            ) : (
                                <td key={idx} style={{textAlign: "center", padding: 2, margin: 0}}>
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
