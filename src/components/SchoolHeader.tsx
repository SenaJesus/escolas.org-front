import { Box, Typography } from "@mui/material";
import SchoolItem from "./SchoolItem";

const SchoolHeader = () => {
    const itens = ['Laboratório de Química', 'Laboratório de Informática', 'Pátio Coberto', 'Arborização', 'Biblioteca', 'Internet', 'Refeitório', 'Quadra Esportiva', 'Parquinho']

    return (
        <Box
            sx={{
                height: '350px',
                padding: '50px 120px 60px 120px',
                display: 'flex',
                gap: '20px'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '35px',
                    paddingTop: '20px',
                    flex: '1'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: `'Rubik', sans-serif`,
                            fontWeight: '800',
                            color: '#373737',
                            fontSize: '32px'
                        }}
                        variant="h1"
                    >
                        E. E. Manuel Albaladeijo Fernandes
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: `'Rubik', sans-serif`,
                            fontWeight: '400',
                            color: '#373737',
                            fontSize: '16px'
                        }}
                        variant="h2"
                    >
                        Avenida Emílio Bosco, nº 830 - Campinas (SP)
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: `'Rubik', sans-serif`,
                            fontWeight: '200',
                            color: '#373737',
                            fontSize: '16px',
                            marginTop: '6px'
                        }}
                        variant="h3"
                    >
                        (19) 98440-6234
                    </Typography>
                </Box>
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '8px',
                            height: '35px',
                            width: '360px',
                            padding: '8px 16px',
                            borderRadius: '40px',
                            bgcolor: '#FF7A3A',
                            alignItems: 'center'
                        }}
                    >
                        <Box 
                            sx={{
                                width: 15,
                                height: 15,
                                display: 'flex',
                                backgroundImage: `url('/notifications.png')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                        <Typography
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontWeight: '400',
                                color: 'white',
                                fontSize: '16px',
                                userSelect: 'none'
                            }}
                            variant="body1"
                        >
                            Receber atualizações sobre essa escola
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '8px',
                            height: '35px',
                            width: '220px',
                            padding: '8px 16px',
                            borderRadius: '40px',
                            bgcolor: '#D57D54',
                            alignItems: 'center'
                        }}
                    >
                        <Box 
                            sx={{
                                width: 15,
                                height: 15,
                                display: 'flex',
                                backgroundImage: `url('/document.png')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                        <Typography
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontWeight: '400',
                                color: 'white',
                                fontSize: '16px',
                                userSelect: 'none'
                            }}
                            variant="body1"
                        >
                            Baixar relatório geral
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flex: '1',
                    width: '650px',
                    gap: '5px',
                    flexWrap: 'wrap',
                    paddingTop: '20px',
                    alignContent: 'flex-start'
                }}
            >
                {
                    itens.map(item => <SchoolItem description={item} />)
                }
            </Box>
        </Box>
    );
};

export default SchoolHeader;