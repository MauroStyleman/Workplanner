import {Box, Button, Card, CardActions, CardContent, Typography} from '@mui/material';
import {Workplan} from '../../model/workplan';
import {Link} from "react-router-dom";

interface WorkplanCardProps {
    workplan: Workplan;
    onDelete: (workplan: Workplan) => void;
}

export function WorkplanCard({workplan, onDelete}: WorkplanCardProps) {
    return (

        <Link to={`/workplan/${workplan.id}`} style={{ textDecoration: 'none' }}>
        <Card
            sx={{
                maxWidth: 345,
                marginBottom: 2,
                backgroundColor: "var(--background-secondary)",
                boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)",
                borderRadius: "10px",
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0,
                }}
            >
                <Typography
                    variant="h5"
                    component="div"
                    color="var(--text)"
                    align="center"
                    margin="15px 0 0 0"
                >
                    {workplan.name}
                </Typography>
                <Typography
                    variant="body2"
                    color="var(--text)"
                    fontSize={16}
                    align="center"
                    margin="30px 20px 0 20px"
                    sx={{
                        border: "1px solid var(--accent)",
                        borderRadius: "8px",
                        padding: "16px",
                        backgroundColor: "var(--accent)",
                    }}
                >
                    {new Date(workplan.start).toLocaleDateString()} - {new Date(workplan.end).toLocaleDateString()}
                </Typography>
            </CardContent>
            <CardActions>
                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <Button size="small" color="error" onClick={() => onDelete(workplan)}>
                        Delete
                    </Button>
                </Box>
            </CardActions>
        </Card>

        </Link>
    );
}


export default WorkplanCard;