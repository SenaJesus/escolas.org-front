import { Box, Typography } from "@mui/material";
import { Funcionarios } from "../types/interfaces"; 

type FuncionarioKey =
    | "Administrativos"
    | "Serviço Geral"
    | "Bibliotecário"
    | "Saúde"
    | "Coordenador"
    | "Fonoaudiólogo"
    | "Nutricionista"
    | "Psicólogo"
    | "Alimentação"
    | "Pedagogia"
    | "Secretário"
    | "Segurança"
    | "Monitores"
    | "Gestão"
    | "Assistente Social";

const FUNCIONARIOS_DICTIONARY: Record<FuncionarioKey, keyof Funcionarios> = {
    "Administrativos": "administrativos_quantidade",
    "Serviço Geral": "servico_geral_quantidade",
    "Bibliotecário": "bibliotecario_quantidade",
    "Saúde": "saude_quantidade",
    "Coordenador": "coordenador_quantidade",
    "Fonoaudiólogo": "fonoaudiologo_quantidade",
    "Nutricionista": "nutricionista_quantidade",
    "Psicólogo": "psicologo_quantidade",
    "Alimentação": "alimentacao_quantidade",
    "Pedagogia": "pedagogia_quantidade",
    "Secretário": "secretario_quantidade",
    "Segurança": "seguranca_quantidade",
    "Monitores": "monitores_quantidade",
    "Gestão": "gestao_quantidade",
    "Assistente Social": "assistente_social_quantidade"
};

interface SchoolCollaboratorsProps {
    funcionarios: Funcionarios;
}

const SchoolCollaborators: React.FC<SchoolCollaboratorsProps> = ({ funcionarios }) => {
    const entries = Object.entries(FUNCIONARIOS_DICTIONARY);
    const half = Math.ceil(entries.length / 2);
    const firstColumnEntries = entries.slice(0, half);
    const secondColumnEntries = entries.slice(half);

    const renderTable = (columnEntries: [string, keyof Funcionarios][]) => (
        <Box 
            sx={{ 
                display: 'table', 
                borderCollapse: 'collapse', 
                width: '100%'
            }}
        >
            {columnEntries.map(([label, fieldKey], index) => {
                const value = funcionarios[fieldKey];
                return (
                    <Box 
                        key={fieldKey} 
                        sx={{ 
                            display: 'table-row', 
                            borderBottom: index < columnEntries.length - 1 ? '1px solid #aaa' : 'none'
                        }}
                    >
                        <Box 
                            sx={{ 
                                display: 'table-cell', 
                                padding: '5px 0', 
                                borderRight: '1px solid #aaa',
                                verticalAlign: 'middle'
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: `'Rubik', sans-serif`,
                                    fontWeight: '400',
                                    color: '#80685D',
                                    fontSize: '16px',
                                    userSelect: 'none'
                                }}
                                variant="body1"
                            >
                                {label}
                            </Typography>
                        </Box>
                        <Box 
                            sx={{ 
                                display: 'table-cell', 
                                padding: '5px 5px', 
                                verticalAlign: 'middle',
                                textAlign: 'center'
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: `'Rubik', sans-serif`,
                                    fontWeight: '400',
                                    color: '#80685D',
                                    fontSize: '16px',
                                    userSelect: 'none'
                                }}
                                variant="body1"
                            >
                                {value}
                            </Typography>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#F4F3F3',
                width: '500px',
                padding: '25px',
                borderRadius: '10px',
                gap: '10px',
                flexShrink: 0
            }}
        >
            <Typography
                sx={{
                    fontFamily: `'Rubik', sans-serif`,
                    fontWeight: '600',
                    color: '#373737',
                    fontSize: '20px',
                    userSelect: 'none'
                }}
                variant="h1"
            >
                Colaboradores
            </Typography>
            
            <Box sx={{ display: 'flex', gap: '20px' }}>
                <Box sx={{ flex: 1 }}>
                    {renderTable(firstColumnEntries)}
                </Box>

                <Box sx={{ flex: 1 }}>
                    {renderTable(secondColumnEntries)}
                </Box>
            </Box>
        </Box>
    );
};

export default SchoolCollaborators;