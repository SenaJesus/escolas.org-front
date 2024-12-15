import { Box, Typography } from "@mui/material";

type EquipmentsKey =
    | "Sala"
    | "Sala dentro do prédio"
    | "Sala fora do prédio"
    | "Sala climatizada"
    | "Sala acessível"
    | "DVD"
    | "Som"
    | "TV"
    | "Lousa digital"
    | "Projetor"
    | "Computador"
    | "Notebook"
    | "Tablet";

const EQUIPMENTS_DICTIONARY: Record<EquipmentsKey, string> = {
    "Sala": "salas_quantidade",
    "Sala dentro do prédio": "salas_quantidade_dentro",
    "Sala fora do prédio": "salas_quantidade_fora",
    "Sala climatizada": "salas_climatizadas",
    "Sala acessível": "salas_acessibilidade",
    "DVD": "dvd_quantidade",
    "Som": "som_quantidade",
    "TV": "tv_quantidade",
    "Lousa digital": "lousa_digital_quantidade",
    "Projetor": "projetor_quantidade",
    "Computador": "computador_quantidade",
    "Notebook": "notebook_quantidade",
    "Tablet": "tablet_quantidade"
};

const SchoolCollaborators = () => {
    const entries = Object.entries(EQUIPMENTS_DICTIONARY);
    const half = 8;
    const firstColumnEntries = entries.slice(0, half);
    const secondColumnEntries = entries.slice(half);

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
            ))}
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
                Recursos físicos
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