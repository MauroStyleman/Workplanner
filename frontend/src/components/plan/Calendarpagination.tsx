import {Box, Pagination} from "@mui/material";

export function CalendarPagination(props: {
    count: number,
    currentMonthIndex: number,
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void
}) {
    return <Box sx={{
        marginTop: 3,
        marginBottom: 3,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "var(--accent)"
    }}>
        <Pagination
            count={props.count}
            page={props.currentMonthIndex + 1}
            onChange={props.onChange}
            sx={{
                "& .MuiPaginationItem-root": {
                    color: "white",
                    backgroundColor: "transparent",
                    "&:hover": {
                        backgroundColor: "var(--secondary)",
                        color: "white",
                    },
                    "&.Mui-selected": {
                        backgroundColor: "var(--secondary)",
                        color: "white",
                    },
                },
            }}
        />
    </Box>;
}