import { useNavigate, useParams } from 'react-router-dom';
import { Box } from "@mui/material";
import SchoolHeader from "./SchoolHeader";
import SchoolReview from './SchoolReview';
import SchoolCensus from './SchoolCensus';

const SchoolPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    if (Number(id) < 0) navigate('/');

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <SchoolHeader />
            <SchoolReview />
            <SchoolCensus />
        </Box>
    );
};

export default SchoolPage;