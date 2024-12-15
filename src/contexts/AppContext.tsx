import React, { createContext, useEffect, useState, useContext } from 'react';
import { Estado, Cidade } from '../types/interfaces';
import { getEstados, getCidades } from '../services/escolasService';

interface AppContextData {
  estados: Estado[];
  cidades: Cidade[];
  loading: boolean;
}

const AppContext = createContext<AppContextData>({
  estados: [],
  cidades: [],
  loading: true,
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [estadosData, cidadesData] = await Promise.all([getEstados(), getCidades()]);
        if (estadosData) setEstados(estadosData);
        if (cidadesData) setCidades(cidadesData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <AppContext.Provider value={{ estados, cidades, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
