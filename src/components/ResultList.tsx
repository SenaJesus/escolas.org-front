import { Box, Typography, CircularProgress } from "@mui/material";
import SchoolCard from "./SchoolCard";
import Paginator from "./Paginator";
import { EscolaList } from '../types/interfaces';
import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";

interface ResultListProps {
    escolas: EscolaList[];
    loading: boolean;
    totalEscolas: number;
    escolasPorPagina: number;
    fetchMore: () => void;
    isFetching: boolean;
};

const ResultList: React.FC<ResultListProps> = ({ escolas, loading, totalEscolas, escolasPorPagina, fetchMore, isFetching }) => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [currentEscolas, setCurrentEscolas] = useState<EscolaList[]>([]);

    const totalFrontendPages = Math.ceil(totalEscolas / escolasPorPagina);

    useEffect(() => {
        const startIndex = currentPage * escolasPorPagina;
        const endIndex = startIndex + escolasPorPagina;
        const escolasDaPagina = escolas.slice(startIndex, endIndex);
        setCurrentEscolas(escolasDaPagina);

        if (escolas.length - endIndex < escolasPorPagina && escolas.length < totalEscolas && !isFetching) fetchMore();
    }, [currentPage, escolas, totalEscolas, escolasPorPagina, fetchMore, isFetching]);

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <CircularProgress sx={{ color: '#D57D54' }} />
            </Box>
        );
    };

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '25px'
            }}
        >
            {isFetching && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(255,255,255,0.7)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 10
                    }}
                >
                    <CircularProgress sx={{ color: '#D57D54' }} />
                </Box>
            )}
            <Box>
                <Typography
                    sx={{
                        fontFamily: `'Rubik', sans-serif`,
                        fontWeight: '500',
                        color: '#AD7A62',
                        fontSize: '20px',
                        userSelect: 'none'
                    }}
                    variant="h2"
                >
                    Lista dos resultados
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
                    Preencha os campos e veja os resultados aqui!
                </Typography>
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
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        paddingBottom: currentEscolas.length !== 0 && currentEscolas.length <= escolasPorPagina / 2 ? '116px' : '0',
                        gap: 2
                    }}
                >
                    {
                        currentEscolas.map((escola, index) => (
                            <SchoolCard key={index} escola={escola} />
                        ))
                    }
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Paginator
                        currentPage={currentPage}
                        totalPages={totalFrontendPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ResultList;
