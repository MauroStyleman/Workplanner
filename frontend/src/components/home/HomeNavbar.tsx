import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {TimePeriodModal} from "./TimePeriodModal.tsx";




export default function HomeNavbar() {
    return (
        <Box sx={{ flexGrow: 1, mb: 2 }}>
            <AppBar
                position="static"
                sx={{
                    bgcolor: 'var(--background)',
                    color: 'var(--text)',
                    boxShadow: 'none',
                    borderBottom: '2px solid var(--primary)'
                }}
            >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Workplanning
                    </Typography>
                    <TimePeriodModal />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
