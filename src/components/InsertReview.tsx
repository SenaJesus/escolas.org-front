import { Box, TextField, Typography, CircularProgress } from "@mui/material";
import { useState } from 'react';

interface InsertReviewProps {
    nota: number;
    setNota: (n: number) => void;
    comentario: string;
    setComentario: (c: string) => void;
    onClose: () => void;
    onSubmit: () => Promise<void>; // Agora onSubmit é assíncrono, retorna Promise
}

const InsertReview: React.FC<InsertReviewProps> = ({ nota, setNota, comentario, setComentario, onClose, onSubmit }) => {
    const [hoverNota, setHoverNota] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleClickNota = (value: number) => {
        setNota(value);
    };

    const handleMouseEnter = (value: number) => {
        setHoverNota(value);
    };

    const handleMouseLeave = () => {
        setHoverNota(0);
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            await onSubmit();
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
                        Avaliação
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
                        Dê uma nota e opcionalmente adicione um comentário sobre a escola.
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    gap: '3px'
                }}
            >
                {
                    [...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        const filled = ratingValue <= (hoverNota || nota);
                        return (
                            <Box
                                key={index}
                                sx={{
                                    height: '20px',
                                    width: '20px',
                                    borderRadius: '50%',
                                    bgcolor: filled ? '#FF7A3A' : '#D9D9D9',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleClickNota(ratingValue)}
                                onMouseEnter={() => handleMouseEnter(ratingValue)}
                                onMouseLeave={handleMouseLeave}
                            />
                        );
                    })
                }
            </Box>
            <TextField
                variant="outlined"
                placeholder="Insira seu comentário aqui"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
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
                        cursor: isLoading ? 'default' : 'pointer',
                        opacity: isLoading ? 0.7 : 1
                    }}
                    onClick={isLoading ? undefined : handleSubmit}
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
                        Enviar
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default InsertReview;