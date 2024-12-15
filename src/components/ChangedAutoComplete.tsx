import { Autocomplete, TextField } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';

interface ChangedAutoCompleteProps {
    width: string;
};

const ChangedAutoComplete: React.FC<ChangedAutoCompleteProps> = ({ width }) => {
    return (
        <Autocomplete
            options={['Campinas', 'Jundiai', 'São Carlos']}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Pesquise"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '50px',
                            borderColor: '#AD7A62',
                            height: '36px',
                            fontFamily: `'Rubik', sans-serif`,
                            fontSize: '16px',
                            color: '#373737',
                            '& fieldset': {
                                borderColor: '#AD7A62',
                            },
                            '&:hover fieldset': {
                                borderColor: '#AD7A62',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#AD7A62',
                            },
                        },
                        '& .MuiInputBase-input': {
                            height: '36px',
                            padding: '0 14px',
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: `'Rubik', sans-serif`,
                            fontSize: '16px',
                            color: '#373737',
                        },
                        '& .MuiInputBase-input::placeholder': {
                            color: '#F4DBCF',
                            opacity: 1,
                            fontFamily: `'Rubik', sans-serif`,
                            fontSize: '16px',
                        },
                    }}
                />
            )}
            popupIcon={
                <ArrowDropDownIcon
                    sx={{
                        fontSize: '22px',
                        color: '#AD7A62',
                    }}
                />
            }
            clearIcon={
                <CloseIcon
                    sx={{
                        fontSize: '20px',
                        color: '#AD7A62',
                    }}
                />
            }
            componentsProps={{
                popupIndicator: {
                    sx: {
                        '&:hover': {
                            backgroundColor: '#FBF2EE',
                        },
                        transition: 'background-color 0.3s',
                        borderRadius: '50%',
                        padding: '4px',
                    },
                },
                clearIndicator: {
                    sx: {
                        '&:hover': {
                            backgroundColor: '#FBF2EE',
                        },
                        transition: 'background-color 0.3s',
                        borderRadius: '50%',
                        padding: '4px',
                        visibility: 'visible',
                        opacity: 1,
                    },
                },
            }}
            sx={{
                width: width,
                '& .MuiAutocomplete-option': {
                    backgroundColor: '#FFFFFF',
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
                },
                '& .MuiAutocomplete-clearIndicator': {
                    visibility: 'visible',
                    opacity: 1,
                },
            }}
            renderOption={(props, option, { selected }) => (
                <li
                    {...props}
                    style={{
                        backgroundColor: selected ? '#F4DBCF' : '#FFFFFF',
                        color: '#373737',
                        fontFamily: `'Rubik', sans-serif`,
                        fontSize: '16px',
                    }}
                >
                    {option}
                </li>
            )}
        />
    );
};

export default ChangedAutoComplete;
