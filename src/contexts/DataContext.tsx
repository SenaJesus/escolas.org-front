import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Estado, Cidade } from '../types/interfaces';
import axios from 'axios';

interface DataContextProps {
    estados: Estado[];
    cidades: Cidade[];
    loading: boolean;
    error: string | null;
};

export const DataContext = createContext<DataContextProps>({
    estados: [],
    cidades: [],
    loading: false,
    error: null,
});

interface DataProviderProps {
    children: ReactNode;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [estados, setEstados] = useState<Estado[]>([]);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEstadosECidades = async () => {
            setLoading(true);
            try {
                const [estadosResponse, cidadesResponse] = await Promise.all([
                    axios.get<Estado[]>('/estados'),
                    axios.get<Cidade[]>('/cidades'),
                ]);
                setEstados(estadosResponse.data);
                setCidades(cidadesResponse.data);
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar estados e cidades.');
                setLoading(false);
            }
        };

        fetchEstadosECidades();
    }, []);

    return (
        <DataContext.Provider value={{ estados, cidades, loading, error }}>
            {children}
        </DataContext.Provider>
    );
};