import { useState } from "react";
import { Box, Typography } from "@mui/material";

interface ReviewCardProps {
    nota: number;
    texto: string;
    dataPublicacao: string;
    nomeUsuario: string;
};

const MAX_LENGTH = 180;

const ReviewCard: React.FC<ReviewCardProps> = ({ nota, texto, dataPublicacao, nomeUsuario }) => {
    const displayedText = `${texto.substring(0, MAX_LENGTH)}...`;

    return (
        <Box
            sx={{
                bgcolor: 'white',
                width: '411px',
                height: '240px',
                padding: '15px 20px',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Typography
                    sx={{
                        fontFamily: `'Rubik', sans-serif`,
                        fontWeight: '400',
                        color: '#373737',
                        fontSize: '12px',
                        userSelect: 'none'
                    }}
                    variant="body2"
                >
                    {dataPublicacao}
                </Typography>
                <Box
                    sx={{ display: 'flex', gap: '6px', alignItems: 'center' }}
                >
                    <Typography
                        sx={{
                            fontFamily: `'Rubik', sans-serif`,
                            fontWeight: '400',
                            color: '#373737',
                            fontSize: '16px',
                            userSelect: 'none'
                        }}
                        variant="h6"
                    >
                        {nomeUsuario}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: `'Rubik', sans-serif`,
                            fontWeight: '400',
                            color: '#373737',
                            fontSize: '16px',
                            userSelect: 'none'
                        }}
                        variant="h6"
                    >
                        •
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '3px', alignItems: 'center' }} >
                        {
                            [...Array(5)].map((_, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        height: '15px',
                                        width: '15px',
                                        borderRadius: '50%',
                                        bgcolor: index + 1 <= nota ? '#FF7A3A' : '#D9D9D9',
                                    }}
                                />
                            ))
                        }
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                }}
            >
                <Box 
                    sx={{
                      width: 17,
                      height: 14,
                      display: 'flex',
                      backgroundImage: `url('/quote_simbol.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                />
                <Typography
                    sx={{
                        fontFamily: `'Rubik', sans-serif`,
                        fontWeight: '400',
                        color: '#373737',
                        fontSize: '16px',
                        userSelect: 'none'
                    }}
                    variant="body1"
                >
                    {displayedText}
                </Typography>
                {texto.length > MAX_LENGTH && (
                    <Typography
                        sx={{
                            fontFamily: `'Rubik', sans-serif`,
                            fontWeight: '400',
                            color: '#373737',
                            fontSize: '12px',
                            userSelect: 'none',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                        }}
                        variant="body2"
                    >
                        Ler tudo
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default ReviewCard;