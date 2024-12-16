import { Box, Typography, TextField, CircularProgress } from "@mui/material";
import { useEffect, useState } from 'react';

interface InsertCodeProps {
    codigo: string;
    setCodigo: (c: string) => void;
    onClose: () => void;
    onNext: () => Promise<void>; // agora onNext retorna uma Promise
    onResend: () => Promise<void>; // idem, retorna Promise para podermos controlar o loading
}

const InsertCode: React.FC<InsertCodeProps> = ({ codigo, setCodigo, onClose, onNext, onResend }) => {
    const [seconds, setSeconds] = useState(60);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleResend = async () => {
        if (seconds === 0) {
            try {
                setIsLoading(true);
                await onResend();
                setSeconds(60); // reinicia o contador
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleNext = async () => {
        try {
            setIsLoading(true);
            await onNext();
        } finally {
            setIsLoading(false);
        }
    };

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
                gap: '15px',
                position: 'relative'
            }}
        >
            {isLoading && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                        borderRadius: '10px',
                    }}
                >
                    <CircularProgress sx={{ color: '#D57D54' }} />
                </Box>
            )}
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
                        Confirmação de e-mail
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
                        Insira o código enviado para seu e-mail
                    </Typography>
                </Box>
                <TextField
                    variant="outlined"
                    placeholder="Insira o código aqui"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    sx={{
                        width: '465px',
                        "& .MuiOutlinedInput-root": {
                        borderRadius: '64px',
                        "& fieldset": {
                            borderColor: "#C29B89",
                        },
                        "&:hover fieldset": {
                            borderColor: "#C29B89",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#C29B89",
                            borderWidth: '1px',
                        },
                        color: "#373737",
                        height: '35px',
                        "& .MuiOutlinedInput-input": {
                            padding: '8px 12px',
                            height: '100%',
                            boxSizing: 'border-box',
                            "::placeholder": {
                            color: "#E3D1C8",
                            },
                            color: "#373737",
                        },
                        },
                    }}
                />
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
                        width: '180px',
                        padding: '8px 20px',
                        borderRadius: '50px',
                        borderWidth: '2px',
                        borderColor: '#FF7A3A',
                        borderStyle: 'solid',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: seconds === 0 && !isLoading ? 'pointer' : 'default'
                    }}
                    onClick={handleResend}
                >
                    <Typography
                        sx={{
                            fontFamily: `'Rubik', sans-serif`,
                            fontWeight: '400',
                            color: seconds === 0 ? '#FF7A3A' : '#AD7A62',
                            fontSize: '16px',
                            userSelect: 'none',
                        }}
                        variant="h1"
                    >
                        {seconds > 0 ? `Reenviar em ${seconds}s` : 'Reenviar'}
                    </Typography>
                </Box>
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
                    onClick={handleNext}
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
                        Próximo
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default InsertCode;
