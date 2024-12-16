import { Box, Typography } from "@mui/material";
import { Acessibilidade } from "../types/interfaces";

type AccessibilityKey = 
    | "Corrimão"
    | "Elevador"
    | "Pisos táteis"
    | "Vão livre"
    | "Rampas"
    | "Sinal sonoro"
    | "Sinal tátil"
    | "Sinal visual";

const ACCESSIBILITY_DICTIONARY: Record<AccessibilityKey, keyof Acessibilidade> = {
    "Corrimão": "corrimao",
    "Elevador": "elevador",
    "Pisos táteis": "pisos_tateis",
    "Vão livre": "vao_livre",
    "Rampas": "rampas",
    "Sinal sonoro": "sinal_sonoro",
    "Sinal tátil": "sinal_tatil",
    "Sinal visual": "sinal_visual"
};

interface SchoolAccessibilityProps {
    acessibilidade: Acessibilidade;
}

const SchoolAccessibility: React.FC<SchoolAccessibilityProps> = ({ acessibilidade }) => {
    const entries = Object.entries(ACCESSIBILITY_DICTIONARY);

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
                Acessibilidade
            </Typography>
            
            <Box 
                sx={{ 
                    display: 'table', 
                    borderCollapse: 'collapse', 
                    width: '100%' 
                }}
            >
                {entries.map(([label, fieldKey], index) => {
                    const hasFeature = acessibilidade[fieldKey];
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
                                    padding: '5px 0',
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
                                    <></>
                                )}
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default SchoolAccessibility;