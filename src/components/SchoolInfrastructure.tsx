import { Box, Typography } from "@mui/material";

type InfraestructureKey =
    | "Água potável"
    | "Alimentação"
    | "Almoxarifado"
    | "Área verde"
    | "Auditório"
    | "Banheiro"
    | "Banheiro infantil"
    | "Banheiro Funcionários"
    | "Banheiro PNE"
    | "Chuveiro"
    | "Biblioteca"
    | "Cozinha"
    | "Dormitório aluno"
    | "Dormitório professor"
    | "Lab. Ciências"
    | "Lab. Informática"
    | "Pátio Coberto"
    | "Pátio Descoberto"
    | "Parque infantil"
    | "Piscina"
    | "Quadra coberta"
    | "Quadra descoberta"
    | "Sala de Artes"
    | "Sala de Música"
    | "Sala de Dança"
    | "Sala Recreativa"
    | "Sala de Leitura"
    | "Sala de Professores"
    | "Sala de Repouso"
    | "Sala Secretaria"
    | "Terreirão Recreativo"
    | "Redes Sociais";

const INFRAESTRUCTURE_DICTIONARY: Record<InfraestructureKey, string> = {
    "Água potável": "agua_potavel",
    "Alimentação": "alimentacao",
    "Almoxarifado": "almoxarifado",
    "Área verde": "area_verde",
    "Auditório": "auditorio",
    "Banheiro": "banheiro",
    "Banheiro infantil": "banheiro_infantil",
    "Banheiro Funcionários": "banheiro_funcionarios",
    "Banheiro PNE": "banheiro_pne",
    "Chuveiro": "banheiro_chuveiro",
    "Biblioteca": "biblioteca",
    "Cozinha": "cozinha",
    "Dormitório aluno": "dormitorio_aluno",
    "Dormitório professor": "dormitorio_professor",
    "Lab. Ciências": "lab_ciencias",
    "Lab. Informática": "lab_informatica",
    "Pátio Coberto": "patio_coberto",
    "Pátio Descoberto": "patio_descoberto",
    "Parque infantil": "parque_infantil",
    "Piscina": "piscina",
    "Quadra coberta": "quadra_esportes_coberta",
    "Quadra descoberta": "quadra_esportes_descoberta",
    "Sala de Artes": "sala_artes",
    "Sala de Música": "sala_musica",
    "Sala de Dança": "sala_danca",
    "Sala Recreativa": "sala_recreativa",
    "Sala de Leitura": "sala_leitura",
    "Sala de Professores": "sala_professor",
    "Sala de Repouso": "sala_repouso_aluno",
    "Sala Secretaria": "sala_secretaria",
    "Terreirão Recreativo": "terreirao_recreativo",
    "Redes Sociais": "rede_social"
};

const SchoolInfraestructure = () => {
    const entries = Object.entries(INFRAESTRUCTURE_DICTIONARY);

    // Dividimos em 4 colunas, cada uma com até 8 itens
    const columnSize = 8;
    const firstColumnEntries = entries.slice(0, columnSize);
    const secondColumnEntries = entries.slice(columnSize, columnSize * 2);
    const thirdColumnEntries = entries.slice(columnSize * 2, columnSize * 3);
    const fourthColumnEntries = entries.slice(columnSize * 3, columnSize * 4);

    const renderTable = (columnEntries: [string, string][]) => (
        <Box 
            sx={{ 
                display: 'table', 
                borderCollapse: 'collapse', 
                width: '100%'
            }}
        >
            {columnEntries.map(([key, value], index) => (
                <Box 
                    key={value} 
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
                            {key}
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
                        <Box
                            sx={{
                                width: 15,
                                height: 15,
                                display: 'inline-flex',
                                backgroundImage: `url('/checkmark_color.png')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                margin: 'auto'
                            }}
                        />
                    </Box>
                </Box>
            ))}
        </Box>
    );

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#F4F3F3',
                width: '1000px',
                padding: '25px',
                borderRadius: '10px',
                gap: '10px'
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
                Infraestrutura
            </Typography>
            
            <Box sx={{ display: 'flex', gap: '20px' }}>
                <Box sx={{ flex: 1 }}>{renderTable(firstColumnEntries)}</Box>
                <Box sx={{ flex: 1 }}>{renderTable(secondColumnEntries)}</Box>
                <Box sx={{ flex: 1 }}>{renderTable(thirdColumnEntries)}</Box>
                <Box sx={{ flex: 1 }}>{renderTable(fourthColumnEntries)}</Box>
            </Box>
        </Box>
    );
};

export default SchoolInfraestructure;