import { PaginatedEscolasListResponse, Escola, Estado, Cidade } from '../types/interfaces';
import api from './api';

export const getEstados = async (): Promise<Estado[] | null> => {
    try {
        const response = await api.get<Estado[]>('estados');
        return response.data;
    } catch (error: any) {
        console.error('Erro ao buscar estados:', error);
        return null;
    }
};

export const getCidades = async (): Promise<Cidade[] | null> => {
    try {
        const response = await api.get<Cidade[]>('cidades');
        return response.data;
    } catch (error: any) {
        console.error('Erro ao buscar cidades:', error);
        return null;
    }
};

export const getEscolasComFiltros = async (params: URLSearchParams): Promise<PaginatedEscolasListResponse | null> => {
    try {
        const response = await api.get<PaginatedEscolasListResponse>(`escolas/listar?${params.toString()}`);
        return response.data;
    } catch (error: any) {
        console.error('Erro ao buscar escolas com filtros:', error);
        return null;
    }
};

export const getTodasEscolas = async (urlOrPage?: string | number): Promise<PaginatedEscolasListResponse | null> => {
    try {
        let url = 'escolas/todas';
        if (typeof urlOrPage === 'number') {
            url += `?page=${urlOrPage}`;
        } else if (typeof urlOrPage === 'string') {
            url = urlOrPage.replace('http://127.0.0.1:8000/api/', '');
        }
        const response = await api.get<PaginatedEscolasListResponse>(url);
        return response.data;
    } catch (error: any) {
        console.error('Erro ao buscar todas as escolas:', error);
        return null;
    }
};

export const getEscola = async (escolaId: number): Promise<Escola | null> => {
    try {
        const response = await api.get<Escola>(`escolas/${escolaId}`);
        return response.data;
    } catch (error: any) {
        console.error('Erro ao buscar escolas com filtros:', error);
        return null;
    }
};
