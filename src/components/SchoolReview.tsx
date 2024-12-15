import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ReviewCard from "./ReviewCard";

const SchoolReview: React.FC = () => {
    const [order, setOrder] = useState<'Decrescente' | 'Crescente'>('Decrescente');
    const [reviews, setReviews] = useState(() => {
        return [...Array(15)].map((_) => ({
            nota: Math.floor(Math.random() * 5) + 1,
            texto: "Jesus Sena",
            dataPublicacao: "15/12/2024",
            nomeUsuario: "jesusfernandessenasena"
        }));
    });

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (scrollContainerRef.current) {
            e.preventDefault();
            e.stopPropagation();
            scrollContainerRef.current.scrollLeft += e.deltaY;
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (scrollContainerRef.current) {
            isDragging.current = true;
            startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
            scrollLeft.current = scrollContainerRef.current.scrollLeft;
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging.current || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX.current);
        scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUp = () => isDragging.current = false;
    const handleMouseLeave = () => isDragging.current = false;

    useEffect(() => {
        const sortedReviews = [...reviews].sort((a, b) => {
            return order === 'Decrescente' ? b.nota - a.nota : a.nota - b.nota;
        });
        setReviews(sortedReviews);
    }, [order]);

    return (
        <Box
            sx={{
                height: '430px',
                padding: '20px 120px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                bgcolor: '#F4F3F3',
                overflow: 'hidden' 
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
                    Opiniões da população
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
                    Veja abaixo o que as pessoas têm a dizer sobre essa instituição
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '7px'
                }}
            >
                <Typography
                    sx={{
                        fontFamily: `'Rubik', sans-serif`,
                        fontWeight: '400',
                        color: '#80685D',
                        fontSize: '16px',
                        userSelect: 'none'
                    }}
                    variant="h3"
                >
                    Avaliações dos usuários:  <strong style={{ fontWeight: 500, textDecoration: 'underline' }}>4,5</strong>
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '18px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            height: '35px',
                            width: '160px',
                            padding: '8px 20px',
                            borderRadius: '50px',
                            bgcolor: '#FF7A3A',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
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
                            Fazer avaliação
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontWeight: '200',
                                color: '#AD7A62',
                                fontSize: '20px',
                                userSelect: 'none'
                            }}
                            variant="body1"
                        >
                            |
                        </Typography>
                    </Box>
                    <Select
                        value={order}
                        onChange={(e) => setOrder(e.target.value as 'Decrescente' | 'Crescente')}
                        IconComponent={ArrowDropDownIcon}
                        sx={{
                            width: '181px',
                            height: '36px',
                            borderRadius: '50px',
                            fontFamily: `'Rubik', sans-serif`,
                            fontSize: '16px',
                            backgroundColor: '#FFFFFF',
                            '& .MuiSelect-select': {
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 14px',
                                color: '#AD7A62'
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#AD7A62 !important',
                                borderWidth: '1px !important',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#AD7A62 !important',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#AD7A62 !important',
                                borderWidth: '1px !important'
                            },
                            '& .MuiOutlinedInput-root.Mui-focused': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#AD7A62 !important',
                                    borderWidth: '1px !important'
                                }
                            },
                            '& .MuiSvgIcon-root': {
                                fontSize: '26px',
                                color: '#AD7A62',
                            },
                            '&.Mui-focused': {
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#AD7A62 !important',
                                    borderWidth: '1px !important'
                                }
                            }
                        }}
                    >
                        <MenuItem
                            value="Decrescente"
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontSize: '16px',
                                color: '#373737',
                                '&.Mui-selected': {
                                    backgroundColor: '#F4DBCF !important',
                                    color: 'inherit',
                                },
                                '&.Mui-selected:hover': {
                                    backgroundColor: '#F4DBCF !important',
                                    color: 'inherit',
                                },
                                '&:hover': {
                                    backgroundColor: '#FBF2EE',
                                    color: '#373737',
                                },
                            }}
                        >
                            Decrescente
                        </MenuItem>
                        <MenuItem
                            value="Crescente"
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontSize: '16px',
                                color: '#373737',
                                '&.Mui-selected': {
                                    backgroundColor: '#F4DBCF !important',
                                    color: 'inherit',
                                },
                                '&.Mui-selected:hover': {
                                    backgroundColor: '#F4DBCF !important',
                                    color: 'inherit',
                                },
                                '&:hover': {
                                    backgroundColor: '#FBF2EE',
                                    color: '#373737',
                                },
                            }}
                        >
                            Crescente
                        </MenuItem>
                    </Select>
                </Box>
                <Box
                    ref={scrollContainerRef}
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    sx={{
                        display: 'flex',
                        gap: '15px',
                        marginTop: '10px',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        paddingBottom: '10px',
                        cursor: isDragging.current ? 'grabbing' : 'grab',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        },
                        flexWrap: 'nowrap',
                        userSelect: 'none',
                        overscrollBehavior: 'none'
                    }}
                >
                    {reviews.map((review, index) => (
                        <ReviewCard 
                            key={index}
                            nota={review.nota} 
                            texto={review.texto} 
                            dataPublicacao={review.dataPublicacao} 
                            nomeUsuario={review.nomeUsuario}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default SchoolReview;
