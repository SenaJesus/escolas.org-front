import { useNavigate, useParams } from 'react-router-dom';
import { Box } from "@mui/material";
import SchoolHeader from "./SchoolHeader";
import SchoolReview from './SchoolReview';
import SchoolCensus from './SchoolCensus';
import { useEffect, useState } from 'react';
import { Escola } from '../types/interfaces';
import { getEscola } from '../services/escolasService';

const SchoolPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [escola, setEscola] = useState<Escola | null>(null);

    const fetchEscola = async () => {
        const escolaId = Number(id);
        if (isNaN(escolaId) || escolaId < 0) {
            navigate('/');
            return;
        };

        const data = await getEscola(escolaId);

        if (!data) {
            navigate('/');
            return;
        };
        
        setEscola(data);
    };

    useEffect(() => {
        fetchEscola();
    }, [id, navigate]);

    if (!escola) return <h1>Carregando</h1>

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <SchoolHeader escola={escola} />
            <SchoolReview escola={escola} />
            <SchoolCensus escola={escola} />
        </Box>
    );
};

export default SchoolPage;