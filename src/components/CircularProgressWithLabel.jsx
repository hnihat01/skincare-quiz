import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function CircularProgressWithLabel(props) {
    const { currentQuestion, questionNumber, totalQuestions, label } = props;

    const progressColor = questionNumber <= currentQuestion ? '#EEF7FB' : '#AADDF3'; 

    return (
        <Box position="relative" display="inline-flex">
             <CircularProgress 
             variant='determinate'
                size={80}
                value={(questionNumber / totalQuestions) * 100} 
                sx={{
                    color: progressColor, 
                    '& .MuiCircularProgress-circle': {
                        stroke: '#AADDF3', 
                    },
                }}
            />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography 
                    variant="caption" 
                    component="div" 
                    color="text.secondary"
                    style={{
                        fontFamily: 'Proxima Nova',
                        fontSize: '20px', 
                        color: '#1C2635', 
                    }}
                >
                    {label}
                </Typography>
            </Box>
        </Box>
    );
}

export default CircularProgressWithLabel;
