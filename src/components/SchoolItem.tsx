import { Box, Typography } from "@mui/material";

interface SchoolItem {
    description: string;
};

const SchoolItem: React.FC<SchoolItem> = ({ description }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '8px',
                height: '35px',
                padding: '8px 16px',
                borderRadius: '40px',
                bgcolor: '#32ADE6',
                alignItems: 'center'
            }}
        >
            <Box 
                sx={{
                  width: 15,
                  height: 15,
                  display: 'flex',
                  backgroundImage: `url('/checkmark.png')`,
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
                |
            </Typography>
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
                {description}
            </Typography>
        </Box>
    );
};

export default SchoolItem;