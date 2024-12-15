import { useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";
import ResultList from "./ResultList";
import SchoolSearch from "./SchoolSearch";
import { EscolaList, PaginatedEscolasListResponse } from "../types/interfaces";
import { getTodasEscolas } from "../services/escolasService";

const HomePage = () => {
    const [escolas, setEscolas] = useState<EscolaList[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [apiPage, setApiPage] = useState<number>(1);
    const [totalEscolas, setTotalEscolas] = useState<number>(0);
    const [totalApiPages, setTotalApiPages] = useState<number>(0);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const fetchEscolas = async (page: number) => {
        setIsFetching(true);
        const response: PaginatedEscolasListResponse | null = await getTodasEscolas(page);
        if (response) {
            setEscolas(prev => [...prev, ...response.results]);
            setTotalEscolas(response.count);
            setTotalApiPages(Math.ceil(response.count / response.results.length));
        };
        setLoading(false);
        setIsFetching(false);
    };

    useEffect(() => {
        fetchEscolas(apiPage);
    }, [apiPage]);

    const fetchMore = () => {
        if (!isFetching && apiPage < totalApiPages) {
            setApiPage(prev => prev + 1);
        }
    };

    return (
        <Box
            sx={{
                padding: '60px 120px 80px 120px',
                display: 'flex',
                height: '100%',
                gap: '80px'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '380px',
                    flexShrink: 0,
                    gap: '20px'
                }}
            >
                <Typography
                    sx={{
                        fontFamily: `'Rubik', sans-serif`,
                        fontWeight: '700',
                        color: '#373737',
                        fontSize: '32px',
                        userSelect: 'none'
                    }}
                    variant="h1"
                >
                    OLÁ,<br/>ESSE É O ESCOLAS.ORG
                </Typography>
                <Typography
                    sx={{
                        fontFamily: `'Rubik', sans-serif`,
                        fontWeight: '200',
                        color: '#373737',
                        fontSize: '20px',
                        userSelect: 'none'
                    }}
                    variant="h2"
                >
                    Nosso objetivo é facilitar a vida de mães, pais e responsáveis, ajudando você a escolher a melhor escola para seus filhos, independentemente de sua condição econômica ou nível de conhecimento técnico.
                    <br /><br />
                    Explore, descubra e transforme a forma como você escolhe escolas. O futuro começa aqui!
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    flexGrow: 1
                }}
            >
                <SchoolSearch />
                <ResultList
                    escolas={escolas}
                    loading={loading}
                    totalEscolas={totalEscolas}
                    escolasPorPagina={4}
                    fetchMore={fetchMore}
                    isFetching={isFetching}
                />
            </Box>
        </Box>
    );
};

export default HomePage;