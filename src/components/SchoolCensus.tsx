import { Box, MenuItem, Select, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SchoolAccessibility from "./SchoolAccessibility";
import SchoolInternet from "./SchoolInternet";
import SchoolCollaborators from "./SchoolCollaborators";
import SchoolTeachers from "./SchoolTeachers";
import SchoolVacancies from "./SchoolVacancies";
import SchoolInfraestructure from "./SchoolInfrastructure";
import SchoolEquipments from "./SchoolEquipments";

const SchoolCensus = () => {
    return (
        <Box
            sx={{
                height: '550px',
                padding: '35px 120px 60px 120px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
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
                    Censo escolar
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
                    Acompanhe abaixo as informações detalhadas sobre essa instituição
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: '18px'
                    }}
                >
                    <Select
                        IconComponent={ArrowDropDownIcon}
                        sx={{
                            width: '181px',
                            height: '36px',
                            borderRadius: '50px',
                            fontFamily: `'Rubik', sans-serif`,
                            fontSize: '16px',
                            backgroundColor: '#FFFFFF',
                            '& .MuiSelect-select': {
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 14px',
                                color: '#AD7A62'
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#AD7A62 !important',
                                borderWidth: '1px !important',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#AD7A62 !important',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#AD7A62 !important',
                                borderWidth: '1px !important'
                            },
                            '& .MuiOutlinedInput-root.Mui-focused': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#AD7A62 !important',
                                    borderWidth: '1px !important'
                                }
                            },
                            '& .MuiSvgIcon-root': {
                                fontSize: '26px',
                                color: '#AD7A62',
                            },
                            '&.Mui-focused': {
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#AD7A62 !important',
                                    borderWidth: '1px !important'
                                }
                            }
                        }}
                    >
                        <MenuItem
                            value="Decrescente"
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontSize: '16px',
                                color: '#373737',
                                '&.Mui-selected': {
                                    backgroundColor: '#F4DBCF !important',
                                    color: 'inherit',
                                },
                                '&.Mui-selected:hover': {
                                    backgroundColor: '#F4DBCF !important',
                                    color: 'inherit',
                                },
                                '&:hover': {
                                    backgroundColor: '#FBF2EE',
                                    color: '#373737',
                                },
                            }}
                        >
                            Decrescente
                        </MenuItem>
                        <MenuItem
                            value="Crescente"
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontSize: '16px',
                                color: '#373737',
                                '&.Mui-selected': {
                                    backgroundColor: '#F4DBCF !important',
                                    color: 'inherit',
                                },
                                '&.Mui-selected:hover': {
                                    backgroundColor: '#F4DBCF !important',
                                    color: 'inherit',
                                },
                                '&:hover': {
                                    backgroundColor: '#FBF2EE',
                                    color: '#373737',
                                },
                            }}
                        >
                            Crescente
                        </MenuItem>
                    </Select>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontWeight: '200',
                                color: '#AD7A62',
                                fontSize: '20px',
                                userSelect: 'none'
                            }}
                            variant="body1"
                        >
                            |
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '8px',
                            height: '35px',
                            width: '265px',
                            padding: '8px 16px',
                            borderRadius: '40px',
                            bgcolor: '#FF7A3A',
                            alignItems: 'center'
                        }}
                    >
                        <Box 
                            sx={{
                                width: 21,
                                height: 21,
                                display: 'flex',
                                backgroundImage: `url('/analytics.png')`,
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
                            Baixar relatório dos dados
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '12px'
                    }}
                >
                    <SchoolAccessibility />
                    <SchoolCollaborators />
                    <SchoolTeachers />
                    <SchoolInfraestructure />
                    <SchoolInternet />
                    <SchoolVacancies />
                    <SchoolEquipments />
                </Box>
            </Box>
        </Box>
    );
};

export default SchoolCensus;