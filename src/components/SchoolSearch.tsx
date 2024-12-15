import { Box, Typography } from "@mui/material";
import ChangedAutoComplete from "./ChangedAutoComplete";
import SearchIcon from '@mui/icons-material/Search';

const SchoolSearch = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
            }}
        >
            <Typography
                sx={{
                    fontFamily: `'Rubik', sans-serif`,
                    fontWeight: '500',
                    color: '#AD7A62',
                    fontSize: '20px',
                    userSelect: 'none'
                }}
                variant="h2"
            >
                Realize sua busca
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: '8px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1px'
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontWeight: '500',
                                color: '#AD7A62',
                                fontSize: '16px',
                                userSelect: 'none'
                            }}
                            variant="h3"
                        >
                            Estado
                        </Typography>
                        <ChangedAutoComplete width={'204px'} />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1px'
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontWeight: '500',
                                color: '#AD7A62',
                                fontSize: '16px',
                                userSelect: 'none'
                            }}
                            variant="h3"
                        >
                            Cidade
                        </Typography>
                        <ChangedAutoComplete width={'258px'} />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1px'
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontWeight: '500',
                                color: '#AD7A62',
                                fontSize: '16px',
                                userSelect: 'none'
                            }}
                            variant="h3"
                        >
                            Bairro
                        </Typography>
                        <ChangedAutoComplete width={'258px'} />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '8px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1px'
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontWeight: '500',
                                color: '#AD7A62',
                                fontSize: '16px',
                                userSelect: 'none'
                            }}
                            variant="h3"
                        >
                            Nome da Escola
                        </Typography>
                        <ChangedAutoComplete width={'400px'} />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'end',
                            paddingBottom: '2px'
                        }}
                    >
                        <Box
                            sx={{
                                height: '34px',
                                width: '34px',
                                borderRadius: '50%',
                                backgroundColor: '#AD7A62',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <SearchIcon sx={{ color: 'white' }}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SchoolSearch;