import { Box, Typography, TextField } from "@mui/material";

const InsertCode = () => {
    return (
        <Box
            sx={{
                margin: '10px',
                display: 'flex',
                width: '500px',
                height: 'auto',
                bgcolor: '#F3F3F3',
                borderRadius: '10px',
                padding: '15px',
                flexDirection: 'column',
                gap: '15px'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    height: '23px',
                    alignItems: 'center'
                }}
            >
                <Box 
                    sx={{
                        width: 23,
                        height: 23,
                        display: 'flex',
                        backgroundImage: `url('/close.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'right center',
                        backgroundRepeat: 'no-repeat',
                        marginLeft: 'auto',
                        cursor: 'pointer'
                    }}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: `'Rubik', sans-serif`,
                            fontWeight: '600',
                            color: '#80685D',
                            fontSize: '20px',
                            userSelect: 'none'
                        }}
                        variant="h1"
                    >
                        Confirmação de e-mail
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: `'Rubik', sans-serif`,
                            fontWeight: '200',
                            color: '#373737',
                            fontSize: '16px',
                            userSelect: 'none'
                        }}
                        variant="h2"
                    >
                        Insira o código enviado para seu e-mail
                    </Typography>
                </Box>
                <TextField
                    variant="outlined"
                    placeholder="Insira o código aqui"
                    sx={{
                        width: '465px',
                        "& .MuiOutlinedInput-root": {
                        borderRadius: '64px',
                        "& fieldset": {
                            borderColor: "#C29B89",
                        },
                        "&:hover fieldset": {
                            borderColor: "#C29B89",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#C29B89",
                            borderWidth: '1px',
                        },
                        color: "#373737",
                        height: '35px',
                        "& .MuiOutlinedInput-input": {
                            padding: '8px 12px',
                            height: '100%',
                            boxSizing: 'border-box',
                            "::placeholder": {
                            color: "#E3D1C8",
                            },
                            color: "#373737",
                        },
                        },
                    }}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '10px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        height: '35px',
                        width: '180px',
                        padding: '8px 20px',
                        borderRadius: '50px',
                        borderWidth: '2px',
                        borderColor: '#FF7A3A',
                        borderStyle: 'solid',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: `'Rubik', sans-serif`,
                            fontWeight: '400',
                            color: '#FF7A3A',
                            fontSize: '16px',
                            userSelect: 'none',
                        }}
                        variant="h1"
                    >
                        Reenviar em 30s
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        height: '35px',
                        width: '102px',
                        padding: '8px 20px',
                        borderRadius: '50px',
                        bgcolor: '#FF7A3A',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}
                >
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
                        Próximo
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default InsertCode;
