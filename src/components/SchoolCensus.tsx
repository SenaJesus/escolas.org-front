import { Box, MenuItem, Select, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SchoolAccessibility from "./SchoolAccessibility";
import SchoolInternet from "./SchoolInternet";
import SchoolCollaborators from "./SchoolCollaborators";
import SchoolTeachers from "./SchoolTeachers";
import SchoolVacancies from "./SchoolVacancies";
import SchoolInfraestructure from "./SchoolInfrastructure";
import SchoolEquipments from "./SchoolEquipments";
import { Escola } from "../types/interfaces";
import React, { useState, useMemo, useRef, useEffect } from "react";

interface SchoolCensusProps {
    escola: Escola;
};

const SchoolCensus: React.FC<SchoolCensusProps> = ({ escola }) => {
    const [order, setOrder] = useState<'Decrescente' | 'Crescente'>('Decrescente');

    const latestCenso = useMemo(() => {
        if (!escola.censos || escola.censos.length === 0) return null;
        return escola.censos.reduce((prev, curr) => (curr.ano > prev.ano ? curr : prev), escola.censos[0]);
    }, [escola]);

    // Defina todos os Hooks antes de retornar condicionais
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
        // Caso precise rodar algo quando order mudar
    }, [order]);

    // Somente agora, após definir todos os Hooks, checamos se latestCenso é nulo
    if (!latestCenso) {
        return (
            <Box
                sx={{
                    height: '550px',
                    padding: '35px 120px 60px 120px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
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
                >
                    Censo escolar
                </Typography>
                <Typography
                    sx={{
                        fontFamily: `'Rubik', sans-serif`,
                        fontWeight: '200',
                        color: '#373737',
                        fontSize: '16px',
                        userSelect: 'none'
                    }}
                >
                    Não há dados de censo disponíveis para esta escola.
                </Typography>
            </Box>
        );
    }

    const infra = latestCenso.infraestrutura;
    const acessibilidade = infra.acessibilidade;
    const funcionarios = infra.funcionarios;
    const educacao = latestCenso.educacao;

    return (
        <Box
            sx={{
                height: '550px',
                padding: '35px 120px 60px 120px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
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
                    Censo escolar
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
                    Acompanhe abaixo as informações detalhadas sobre essa instituição
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: '18px'
                    }}
                >
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
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '8px',
                            height: '35px',
                            width: '265px',
                            padding: '8px 16px',
                            borderRadius: '40px',
                            bgcolor: '#FF7A3A',
                            alignItems: 'center'
                        }}
                    >
                        <Box 
                            sx={{
                                width: 21,
                                height: 21,
                                display: 'flex',
                                backgroundImage: `url('/analytics.png')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
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
                            Baixar relatório dos dados
                        </Typography>
                    </Box>
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
                        gap: '12px',
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
                    <SchoolAccessibility acessibilidade={acessibilidade} />
                    <SchoolInternet internet={infra.internet_aluno} />
                    <SchoolCollaborators funcionarios={funcionarios} />
                    <SchoolTeachers educacao={educacao} />
                    <SchoolInfraestructure infra={infra} />
                    <SchoolVacancies educacao={educacao} />
                    <SchoolEquipments infra={infra} />
                </Box>
            </Box>
        </Box>
    );
};

export default SchoolCensus;
