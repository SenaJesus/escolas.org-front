import { Box, Typography } from "@mui/material";
import { Internet } from "../types/interfaces";

type InternetKey = 
    | "Alunos"
    | "Administrativo"
    | "Aprendizagem"
    | "Comunidade"
    | "Computador pessoal do aluno";

const INTERNET_DICTIONARY: Record<InternetKey, keyof Internet> = {
    "Alunos": "internet_aluno",
    "Administrativo": "internet_administrativo",
    "Aprendizagem": "internet_aprendizagem",
    "Comunidade": "internet_comunidade",
    "Computador pessoal do aluno": "internet_computador_pessoal_aluno"
};

interface SchoolInternetProps {
    internet: Internet;
}

const SchoolInternet: React.FC<SchoolInternetProps> = ({ internet }) => {
    const entries = Object.entries(INTERNET_DICTIONARY);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#F4F3F3',
                width: '380px',
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
                Acesso à internet
            </Typography>
            
            <Box 
                sx={{ 
                    display: 'table', 
                    borderCollapse: 'collapse', 
                    width: '100%' 
                }}
            >
                {entries.map(([label, fieldKey], index) => {
                    const hasFeature = internet[fieldKey] === true;
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
                                {hasFeature ? (
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
                                ) : (
                                    <Box 
                                        sx={{
                                            width: 15,
                                            height: 15,
                                            display: 'inline-flex',
                                            backgroundImage: `url('/close_red.png')`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            margin: 'auto'
                                        }}
                                    />
                                )}
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default SchoolInternet;