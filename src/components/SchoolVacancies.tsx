import { Box, Typography } from "@mui/material";

type VacancieKey =
    | "Creche"
    | "Pré-escola"
    | "Infantil"
    | "Fundamental"
    | "Ensino Médio"
    | "EJA Fundamental"
    | "EJA Médio"
    | "Educação Especial";

const VACANCIE_DICTIONARY: Record<VacancieKey, string> = {
    "Creche": "ed_inf_creche_matricula_quantidade",
    "Pré-escola": "ed_inf_pre_escola_matricula_quantidade",
    "Infantil": "ed_inf_matricula_quantidade",
    "Fundamental": "ed_fund_matricula_quantidade",
    "Ensino Médio": "medio_matricula_quantidade",
    "EJA Fundamental": "eja_fund_matricula_quantidade",
    "EJA Médio": "eja_medio_matricula_quantidade",
    "Educação Especial": "ed_especial_matricula_quantidade"
};
    
const SchoolVacancies = () => {
    const entries = Object.entries(VACANCIE_DICTIONARY);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#F4F3F3',
                width: '300px',
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
                Matrículas
            </Typography>
            
            <Box 
                sx={{ 
                    display: 'table', 
                    borderCollapse: 'collapse', 
                    width: '100%' 
                }}
            >
                {entries.map(([key, value], index) => (
                    <Box 
                        key={value} 
                        sx={{ 
                            display: 'table-row', 
                            borderBottom: index < entries.length - 1 ? '1px solid #aaa' : 'none'
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
        </Box>
    );
};

export default SchoolVacancies;