import {Box, Button, Card, CardActions, CardContent, Typography} from '@mui/material';
import {WorkplanData} from '../../model/workplan'; // Assuming this is your model

interface WorkplanCardProps {
    workplan: WorkplanData;
    onDelete: (workplan: WorkplanData) => void;
}

export function WorkplanCard({workplan, onDelete}: WorkplanCardProps) {
    return (
        <Card sx={{maxWidth: 345, marginBottom: 2}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {workplan.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{marginTop: 1}}>
                    <strong>Start Date:</strong> {new Date(workplan.start).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>End Date:</strong> {new Date(workplan.end).toLocaleDateString()}
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
    );
}


export default WorkplanCard;