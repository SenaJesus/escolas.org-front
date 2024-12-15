import { Box, Typography } from "@mui/material";
import { EscolaList } from '../types/interfaces';
import { useNavigate } from 'react-router-dom';

interface SchoolCardProps {
    escola: EscolaList;
};

const titleCase = (str: string): string => {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const SchoolCard: React.FC<SchoolCardProps> = ({ escola }) => {
    const navigate = useNavigate();

    const handleClick = () => navigate(`/escolas/${escola.id}`);

    const enderecoFormatado = titleCase(escola.bairro);
    const truncatedNome = escola.nome.length > 30
        ? escola.nome.substring(0, 30) + '...'
        : escola.nome;

    return (
        <Box
            sx={{
                width: '100%',
                height: '100px',
                bgcolor: '#F3F3F3',
                cursor: 'pointer',
                padding: '16px 20px',
                userSelect: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                borderRadius: '8px',
                transition: 'background-color 0.3s',
                '&:hover': {
                    backgroundColor: '#EDEDED',
                },
            }}
            onClick={handleClick}
        >
            <Box>
                <Typography
                    sx={{
                        fontFamily: `'Rubik', sans-serif`,
                        fontWeight: '500',
                        color: '#373737',
                        fontSize: '16px'
                    }}
                    variant="h1"
                >
                    {truncatedNome}
                </Typography>
                <Typography
                    sx={{
                        fontFamily: `'Rubik', sans-serif`,
                        fontWeight: '200',
                        color: '#373737',
                        fontSize: '16px'
                    }}
                    variant="h1"
                >
                    {
                        enderecoFormatado === '' ? `${escola.cidade.nome}, ${escola.cidade.estado.sigla}` :
                        `${enderecoFormatado}, ${escola.cidade.nome}, ${escola.cidade.estado.sigla}`
                    }
                </Typography>
            </Box>
            <Typography
                sx={{
                    fontFamily: `'Rubik', sans-serif`,
                    fontWeight: '200',
                    color: '#80685D',
                    fontSize: '16px'
                }}
                variant="h1"
            >
                Avaliações dos usuários: <strong>{!escola.average_avaliacoes ? 'N/A' : escola.average_avaliacoes.toFixed(1)}</strong>
            </Typography>
        </Box>
    );
};

export default SchoolCard;