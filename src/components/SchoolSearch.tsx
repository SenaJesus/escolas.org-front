import { Box, Typography } from "@mui/material";
import ChangedAutoComplete from "./ChangedAutoComplete";
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { Cidade, Estado, PaginatedEscolasListResponse, EscolaList } from "../types/interfaces";
import { getEscolasComFiltros, getTodasEscolas } from "../services/escolasService";

interface SchoolSearchProps {
    onSearchComplete: (data: PaginatedEscolasListResponse | null, allEscolas: EscolaList[], searching: boolean) => void;
};

const removeAccents = (str: string): string => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const SchoolSearch: React.FC<SchoolSearchProps> = ({ onSearchComplete }) => {
    const { estados, cidades, loading } = useAppContext();
    const [selectedEstado, setSelectedEstado] = useState<Estado | null>(null);
    const [selectedCidade, setSelectedCidade] = useState<Cidade | null>(null);
    const [selectedBairro, setSelectedBairro] = useState<string | null>(null);
    const [nomeEscola, setNomeEscola] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async () => {
        setIsSearching(true);
        try {
            const noFilters = !selectedEstado && !selectedCidade && !selectedBairro && !nomeEscola;
            let data: PaginatedEscolasListResponse | null = null;
            let allEscolas: EscolaList[] = [];

            if (noFilters) {
                data = await getTodasEscolas(1);
            } else {
                const params = new URLSearchParams();
                if (selectedEstado) {
                    params.append('estado', selectedEstado.nome);
                }
                if (selectedCidade) {
                    params.append('cidade', selectedCidade.nome);
                }
                if (selectedBairro) {
                    params.append('bairro', removeAccents(selectedBairro));
                }
                if (nomeEscola) {
                    params.append('nome', removeAccents(nomeEscola));
                }
                params.append('page', '1');
                data = await getEscolasComFiltros(params);
            }

            if (data) {
                allEscolas = data.results;
            }

            onSearchComplete(data, allEscolas, false);
        } catch (error) {
            console.error("Erro ao buscar escolas:", error);
            onSearchComplete(null, [], false);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
            }}
        >
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
                Realize sua busca
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: '8px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1px'
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontWeight: '500',
                                color: '#AD7A62',
                                fontSize: '16px',
                                userSelect: 'none'
                            }}
                            variant="h3"
                        >
                            Estado
                        </Typography>
                        <ChangedAutoComplete<Estado>
                            width={'204px'} 
                            options={estados}
                            getOptionLabel={(option) => option.nome}
                            value={selectedEstado}
                            onChange={(event, newValue) => {
                                setSelectedEstado(newValue);
                                setSelectedCidade(null);
                            }}
                            freeSolo={false}
                            loading={loading}
                            placeholder="Selecione o estado"
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1px'
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontWeight: '500',
                                color: '#AD7A62',
                                fontSize: '16px',
                                userSelect: 'none'
                            }}
                            variant="h3"
                        >
                            Cidade
                        </Typography>
                        <ChangedAutoComplete<Cidade>
                            width={'258px'} 
                            options={selectedEstado ? cidades.filter(c => c.estado.id === selectedEstado.id) : []}
                            getOptionLabel={(option) => option.nome}
                            value={selectedCidade}
                            onChange={(event, newValue) => setSelectedCidade(newValue)}
                            freeSolo={false}
                            disabled={!selectedEstado || loading}
                            loading={loading}
                            placeholder={!selectedEstado ? "Selecione um estado" : "Selecione a cidade"}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1px'
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontWeight: '500',
                                color: '#AD7A62',
                                fontSize: '16px',
                                userSelect: 'none'
                            }}
                            variant="h3"
                        >
                            Bairro
                        </Typography>
                        <ChangedAutoComplete<string>
                            width={'258px'}
                            options={[]} 
                            freeSolo={true}
                            value={selectedBairro}
                            onChange={(event, newValue) => setSelectedBairro(newValue)}
                            onInputChange={(event, newInputValue) => setSelectedBairro(newInputValue)}
                            placeholder="Digite o bairro"
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '8px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1px'
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontWeight: '500',
                                color: '#AD7A62',
                                fontSize: '16px',
                                userSelect: 'none'
                            }}
                            variant="h3"
                        >
                            Nome da Escola
                        </Typography>
                        <ChangedAutoComplete<string>
                            width={'400px'} 
                            options={[]} 
                            freeSolo={true}
                            value={nomeEscola}
                            onChange={(event, newValue) => setNomeEscola(newValue)}
                            onInputChange={(event, newInputValue) => setNomeEscola(newInputValue)}
                            placeholder="Digite o nome da escola"
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'end',
                            paddingBottom: '2px'
                        }}
                    >
                        <Box
                            sx={{
                                height: '34px',
                                width: '34px',
                                borderRadius: '50%',
                                backgroundColor: '#AD7A62',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer'
                            }}
                            onClick={handleSearch}
                        >
                            <SearchIcon sx={{ color: 'white' }}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SchoolSearch;
