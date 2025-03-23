import {Box, Button, CircularProgress, Modal, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useUsers} from "../../hooks/UseUsers.ts";
import {userData} from "../../model/User.ts";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'var(--background-secondary)',
    boxShadow: '0px 20px 20px rgba(0, 0, 0, 0.6)',
    p: 4,
    borderRadius: 2,
};

function CloseButton(props: { onClick: () => void, disabled: false | true }) {
    return <Button
        variant="outlined"
        onClick={props.onClick}
        disabled={props.disabled}
        sx={{
            color: "var(--secondary)",
            borderColor: "var(--secondary)",
            "&:hover": {
                backgroundColor: "var(--accent)",
                color: "var(--text)",
            },
        }}
    >
        Close
    </Button>;
}

function CreateButton(props: { onClick: () => void, disabled: false | true }) {
    return <Button
        variant="contained"
        onClick={props.onClick}
        disabled={props.disabled}
        sx={{
            backgroundColor: "var(--primary)",
            color: "var(--text)",
            "&:hover": {
                backgroundColor: "var(--accent)",
            },
        }}
    >
        {props.disabled ? (
            <CircularProgress size={24} sx={{color: "var(--text)"}}/>
        ) : (
            "Create"
        )}
    </Button>;
}

export function UserModal() {
    const {addUser, isAddingUser, isErrorUser} = useUsers();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string | null>('');
    const [lastName, setLastName] = useState<string | null>('');
    const [email, setEmail] = useState<string | null>('')

    const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    }
    const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }
    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleOpen = () => {
        setFirstName('');
        setLastName(null);
        setEmail(null);
        setOpen(true);
    };

    const handleClose = () => {
        if (!isAddingUser) {
            setOpen(false);
            setError(null);
        }
    };

    const handleCreate = () => {
        if (!firstName || !lastName || !email) {
            setError('All fields are required.');
            return;
        }

        const newUser: userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
        }

        addUser(newUser, {
            onSuccess: () => {
                setOpen(false);
                setError(null);
            },
            onError: () => {
                setError("Failed to create user. Please try again.");
            },
        });
    }

    return (
        <div>
            <Button
                onClick={handleOpen}
                sx={{
                    color: 'var(--text)',
                    backgroundColor: 'var(--primary)',
                    '&:hover': {
                        backgroundColor: 'var(--accent)',
                        color: 'var(--text)',
                    },
                }}
            >
                Create User
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" color="var(--text)" sx={{mb: 2}}>
                        Create User
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="First Name"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            variant="outlined"
                            fullWidth
                            sx={{
                                '& .MuiInputLabel-root': { color: 'var(--primary)' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'var(--secondary)' },
                                    '&:hover fieldset': { borderColor: 'var(--accent)' },
                                    '&.Mui-focused fieldset': { borderColor: 'var(--accent)' },
                                    '& input': { color: 'var(--primary)' },
                                },
                            }}
                        />
                        <TextField
                            label="Last Name"
                            value={lastName}
                            onChange={handleLastNameChange}
                            variant="outlined"
                            fullWidth
                            sx={{
                                '& .MuiInputLabel-root': { color: 'var(--primary)' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'var(--secondary)' },
                                    '&:hover fieldset': { borderColor: 'var(--accent)' },
                                    '&.Mui-focused fieldset': { borderColor: 'var(--accent)' },
                                    '& input': { color: 'var(--primary)' },
                                },
                            }}
                        />
                        <TextField
                            label="Email"
                            value={email}
                            onChange={handleEmailChange}
                            variant="outlined"
                            fullWidth
                            sx={{
                                '& .MuiInputLabel-root': { color: 'var(--primary)' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'var(--secondary)' },
                                    '&:hover fieldset': { borderColor: 'var(--accent)' },
                                    '&.Mui-focused fieldset': { borderColor: 'var(--accent)' },
                                    '& input': { color: 'var(--primary)' },
                                },
                            }}
                        />
                    </Box>
                    {error && (
                        <Typography color="error" sx={{mt: 2}}>
                            {error}
                        </Typography>
                    )}
                    {isErrorUser && (
                        <Typography color="error" sx={{mt: 2}}>
                            Failed to create user. Please try again.
                        </Typography>
                    )}
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3}}>
                        <CloseButton onClick={handleClose} disabled={isAddingUser}/>
                        <CreateButton onClick={handleCreate} disabled={isAddingUser}/>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}