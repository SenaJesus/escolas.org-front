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

    const [filtered, setFiltered] = useState<boolean>(false);
    const [filteredEscolas, setFilteredEscolas] = useState<EscolaList[]>([]);
    const [filteredCount, setFilteredCount] = useState<number>(0);
    const [filteredNextUrl, setFilteredNextUrl] = useState<string | null>(null);
    const [isFiltering, setIsFiltering] = useState<boolean>(false);
    const ESCOLAS_POR_PAGINA = 4;

    const [searchKey, setSearchKey] = useState<number>(0);

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
        if (!filtered) {
            fetchEscolas(apiPage);
        }
    }, [apiPage, filtered]);

    const fetchMoreAll = () => {
        if (!isFetching && apiPage < totalApiPages) {
            setApiPage(prev => prev + 1);
        }
    };

    const handleSearchComplete = (data: PaginatedEscolasListResponse | null, allResults: EscolaList[], searching: boolean) => {
        setSearchKey(prev => prev + 1);
        setIsFiltering(searching);
        if (data) {
            setFiltered(true);
            setFilteredEscolas(allResults);
            setFilteredCount(data.count);
            setFilteredNextUrl(data.next);
        } else {
            setFiltered(true);
            setFilteredEscolas([]);
            setFilteredCount(0);
            setFilteredNextUrl(null);
        }
    };

    const fetchMoreFiltered = async () => {
        if (!filteredNextUrl || isFiltering) return;
        setIsFiltering(true);
        try {
            const res = await fetch(filteredNextUrl);
            if (!res.ok) throw new Error('Falha ao carregar mais escolas filtradas');
            const data: PaginatedEscolasListResponse = await res.json();
            setFilteredEscolas(prev => [...prev, ...data.results]);
            setFilteredCount(data.count);
            setFilteredNextUrl(data.next);
        } catch (error) {
            console.error("Erro ao paginar filtradas:", error);
        } finally {
            setIsFiltering(false);
        }
    };

    return (
        <Box
            sx={{
                padding: '60px 120px 80px 120px',
                display: 'flex',
                height: '100%',
                gap: '80px',
                overflow: 'hidden'
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
                <SchoolSearch onSearchComplete={handleSearchComplete} />
                {filtered ? (
                    <ResultList
                        key={`filtered-${searchKey}`}
                        escolas={filteredEscolas}
                        loading={isFiltering}
                        totalEscolas={filteredCount}
                        escolasPorPagina={ESCOLAS_POR_PAGINA}
                        fetchMore={fetchMoreFiltered}
                        isFetching={isFiltering}
                    />
                ) : (
                    <ResultList
                        key={`all-${searchKey}`}
                        escolas={escolas}
                        loading={loading}
                        totalEscolas={totalEscolas}
                        escolasPorPagina={ESCOLAS_POR_PAGINA}
                        fetchMore={fetchMoreAll}
                        isFetching={isFetching}
                    />
                )}
            </Box>
        </Box>
    );
};

export default HomePage;
