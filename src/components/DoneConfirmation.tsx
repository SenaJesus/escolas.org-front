import { Box, Typography } from "@mui/material";

interface DoneConfirmationProps {
    onClose: () => void;
    onNext: () => void;
}

const DoneConfirmation: React.FC<DoneConfirmationProps> = ({ onClose, onNext }) => {
    return (
        <Box
            sx={{
                margin: '10px',
                display: 'flex',
                width: '500px',
                height: 'auto',
                bgcolor: '#F3F3F3',
                borderRadius: '10px',
                padding: '15px',
                flexDirection: 'column',
                gap: '15px'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    height: '23px',
                    alignItems: 'center'
                }}
            >
                <Box 
                    sx={{
                        width: 23,
                        height: 23,
                        display: 'flex',
                        backgroundImage: `url('/close.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'right center',
                        backgroundRepeat: 'no-repeat',
                        marginLeft: 'auto',
                        cursor: 'pointer'
                    }}
                    onClick={onClose}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: `'Rubik', sans-serif`,
                            fontWeight: '600',
                            color: '#80685D',
                            fontSize: '20px',
                            userSelect: 'none'
                        }}
                        variant="h1"
                    >
                        Sucesso
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: `'Rubik', sans-serif`,
                            fontWeight: '200',
                            color: '#373737',
                            fontSize: '16px',
                            userSelect: 'none'
                        }}
                        variant="h2"
                    >
                        Seu e-mail foi confirmado e você está apto para avaliar essa escola!
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '10px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        height: '35px',
                        width: '102px',
                        padding: '8px 20px',
                        borderRadius: '50px',
                        bgcolor: '#FF7A3A',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={onNext}
                >
                    <Typography
                        sx={{
                            fontFamily: `'Rubik', sans-serif`,
                            fontWeight: '400',
                            color: 'white',
                            fontSize: '16px',
                            userSelect: 'none'
                        }}
                        variant="body1"
                    >
                        Avaliar
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default DoneConfirmation;