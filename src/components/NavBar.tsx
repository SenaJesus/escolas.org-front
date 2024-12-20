import { Box, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const NavBar = () =>
{
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                width: '100%',
                height: '70px',
                bgcolor: '#F3F3F3',
                padding: '0 120px',
                display: 'flex',
                alignItems: 'center',
                gap: '43px',
                flexShrink: 0
            }}
        >
            <Typography
                sx={{
                    fontFamily: `'Rubik', sans-serif`,
                    fontWeight: '700',
                    color: '#373737',
                    fontSize: '24px',
                    lineHeight: '0',
                    userSelect: 'none',
                    cursor: 'pointer'
                }}
                variant="h1"
                onClick={() => navigate('/')}
            >
                ESCOLAS.ORG
            </Typography>
            <Box
                sx={{
                    bgcolor: 'white',
                    height: '37px',
                    width: '474px',
                    borderRadius: '50px',
                    padding: '5px 5px 5px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                }}
            >
                <SearchIcon sx={{ color: '#DCDCDC' }} />
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        flexGrow: 1
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: `'Rubik', sans-serif`,
                            fontWeight: '200',
                            color: '#D57D54',
                            fontSize: '16px',
                            lineHeight: '0',
                            userSelect: 'none'
                        }}
                        variant="h2"
                    >
                        Juntos, podemos construir um <strong>futuro</strong> melhor!
                    </Typography>
                </Box>
                <Box
                    sx={{
                        height: '27px',
                        width: '27px',
                        borderRadius: '50%',
                        backgroundColor: '#34C759',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ArrowForwardIcon sx={{ color: 'white' }}/>
                </Box>
            </Box>
            <Box
                sx={{ display: 'flex', gap: '30px', flexGrow: 1 }}
            >
                <Typography
                    sx={{
                        fontFamily: `'Rubik', sans-serif`,
                        fontWeight: '200',
                        color: '#373737',
                        fontSize: '16px',
                        lineHeight: '0',
                        userSelect: 'none',
                        cursor: 'pointer'
                    }}
                    variant="h2"
                    onClick={() => navigate('/')}
                >
                    Início
                </Typography>
                <Typography
                    sx={{
                        fontFamily: `'Rubik', sans-serif`,
                        fontWeight: '200',
                        color: '#373737',
                        fontSize: '16px',
                        lineHeight: '0',
                        userSelect: 'none',
                        cursor: 'pointer'
                    }}
                    variant="h2"
                >
                    Sobre
                </Typography>
                <Typography
                    sx={{
                        fontFamily: `'Rubik', sans-serif`,
                        fontWeight: '200',
                        color: '#373737',
                        fontSize: '16px',
                        lineHeight: '0',
                        userSelect: 'none',
                        cursor: 'pointer'
                    }}
                    variant="h2"
                >
                    Fale Conosco
                </Typography>
            </Box>
        </Box>
    );
};

export default NavBar;