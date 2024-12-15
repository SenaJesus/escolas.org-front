import { PaginatedEscolasListResponse } from '../types/interfaces';
import api from './api';

export const getTodasEscolas = async (page: number): Promise<PaginatedEscolasListResponse | null> => {
    try {
        const response = await api.get<PaginatedEscolasListResponse>(`escolas/todas?page=${page}`);
        return response.data;
    } catch (error: any) {
        console.error('Erro ao buscar escolas:', error);
        return null;
    }
};