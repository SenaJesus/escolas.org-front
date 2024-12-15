import { Box, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface PaginatorProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Paginator: React.FC<PaginatorProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handleNextPage = () => {
        if (currentPage + 1 === totalPages || totalPages === 0) return;
        onPageChange(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage - 1 < 0 || totalPages === 0) return;
        onPageChange(currentPage - 1);
    };

    const handleChangePage = (circleIndex: number) => {
        if (totalPages === 0) return;
        if (circleIndex === (currentPage % 4)) return;
        if (circleIndex > (currentPage % 4)) return onPageChange(currentPage + circleIndex - (currentPage % 4));
        return onPageChange(currentPage - (currentPage % 4) + circleIndex);
    };

    const renderCircles = () => {
        if (totalPages === 0) {
            return (
                <Box
                    sx={{
                        height: '20px',
                        width: '20px',
                        borderRadius: '50%',
                        bgcolor: '#F4DBCF',
                        cursor: 'default'
                    }}
                />
            );
        } else {
            return [...Array(
                (totalPages - (totalPages % 4)) <= currentPage && currentPage < totalPages ? totalPages % 4 : 4
            )].map((_, index) => (
                <Box
                    sx={{
                        height: '20px',
                        width: '20px',
                        borderRadius: '50%',
                        bgcolor: currentPage % 4 === index ? '#D57D54' : '#F4DBCF',
                        cursor: currentPage % 4 === index ? 'default' : 'pointer'
                    }}
                    onClick={() => handleChangePage(index)}
                />
            ));
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '5px 10px',
                gap: '5px'
            }}
        >
            <Box
                sx={{
                    width: '170px',
                    height: '35px',
                    bgcolor: '#FBF2EE',
                    borderRadius: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '5px'
                }}
            >
                <KeyboardArrowLeftIcon
                    sx={{
                        color: (currentPage === 0 || totalPages === 0) ? '#F4DBCF' : '#D57D54',
                        cursor: (currentPage === 0 || totalPages === 0) ? 'default' : 'pointer'
                    }}
                    onClick={handlePreviousPage}
                />
                <Box
                    sx={{
                        display: 'flex',
                        gap: '5px',
                        padding: (totalPages - (totalPages % 4)) <= currentPage && currentPage < totalPages ? `0 ${12.5 * (4 - totalPages % 4)}px` : '0 0'
                    }}
                >
                    {renderCircles()}
                </Box>
                <KeyboardArrowRightIcon
                    sx={{
                        color: (currentPage === totalPages - 1 || totalPages === 0) ? '#F4DBCF' : '#D57D54',
                        cursor: (currentPage === totalPages - 1 || totalPages === 0) ? 'default' : 'pointer'
                    }}
                    onClick={handleNextPage}
                />
            </Box>
            <Typography
                sx={{
                    fontFamily: `'Rubik', sans-serif`,
                    fontWeight: '500',
                    color: '#373737',
                    fontSize: '14px',
                    userSelect: 'none',
                    textAlign: 'center'
                }}
                variant="h2"
            >
                Página {totalPages === 0 ? 0 : currentPage + 1}/{totalPages === 0 ? 0 : totalPages}
            </Typography>
        </Box>
    );
};

export default Paginator;