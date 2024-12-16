import { Box, Typography } from "@mui/material";
import { Educacao } from "../types/interfaces";

type TeacherKey =
    | "Creche"
    | "Pré-escola"
    | "Infantil"
    | "Fundamental"
    | "Ensino Médio"
    | "EJA Fundamental"
    | "EJA Médio"
    | "Educação Especial";

const TEACHER_DICTIONARY: Record<TeacherKey, keyof Educacao> = {
    "Creche": "ed_inf_creche_docentes_quantidade",
    "Pré-escola": "ed_inf_pre_escola_docentes_quantidade",
    "Infantil": "ed_inf_docentes_quantidade",
    "Fundamental": "ed_fund_docentes_quantidade",
    "Ensino Médio": "medio_docentes_quantidade",
    "EJA Fundamental": "eja_fund_docentes_quantidade",
    "EJA Médio": "eja_medio_docentes_quantidade",
    "Educação Especial": "ed_especial_docentes_quantidade"
};

interface SchoolTeachersProps {
    educacao: Educacao;
};

const SchoolTeachers: React.FC<SchoolTeachersProps> = ({ educacao }) => {
    const entries = Object.entries(TEACHER_DICTIONARY);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#F4F3F3',
                width: '300px',
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
                Docentes
            </Typography>
            
            <Box 
                sx={{ 
                    display: 'table', 
                    borderCollapse: 'collapse', 
                    width: '100%' 
                }}
            >
                {entries.map(([label, fieldKey], index) => {
                
                    const value = String(educacao[fieldKey]);
                    return (
                        <Box 
                            key={fieldKey} 
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
        </Box>
    );
};

export default SchoolTeachers;