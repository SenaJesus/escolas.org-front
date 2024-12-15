import { Autocomplete, TextField } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

interface ChangedAutoCompleteProps<T> {
    width: string;
    options: T[];
    value?: T | null;
    onChange?: (event: React.SyntheticEvent, newValue: T | null) => void;
    onInputChange?: (event: React.SyntheticEvent, newInputValue: string) => void;
    getOptionLabel?: (option: T) => string;
    freeSolo?: boolean;
    loading?: boolean;
    disabled?: boolean;
    placeholder?: string;
}

function ChangedAutoComplete<T>(props: ChangedAutoCompleteProps<T>) {
    const { width, options, value, onChange, onInputChange, getOptionLabel, freeSolo, loading, disabled, placeholder } = props;

    const localGetOptionLabel = (option: T | string): string => {
        if (typeof option === 'string') {
            return option;
        }
        return getOptionLabel ? getOptionLabel(option as T) : '';
    };

    return (
        <Autocomplete
            freeSolo={freeSolo}
            options={options as (T | string)[]}
            value={value as T | string | null}
            onChange={onChange as any}
            onInputChange={onInputChange as any}
            getOptionLabel={localGetOptionLabel}
            loading={loading}
            disabled={disabled}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={placeholder || 'Pesquise'}
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
        />
    );
};

export default ChangedAutoComplete;
