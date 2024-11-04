import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function CircularProgressWithLabel(props) {
    const { currentQuestion, questionNumber, totalQuestions, label } = props;

    // Set colors based on the question state
    const progressColor = questionNumber <= currentQuestion ? '#EEF7FB' : '#AADDF3'; // Past: #AADDF3, Future: #EEF7FB

    return (
        <Box position="relative" display="inline-flex">
             <CircularProgress 
             variant='determinate'
                size={80} // Adjust size if needed
                value={(questionNumber / totalQuestions) * 100} // Progress value
                sx={{
                    color: progressColor, // Soft background color
                    '& .MuiCircularProgress-circle': {
                        stroke: '#AADDF3', // The stroke color based on current or future question
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
                        fontSize: '20px', // Adjust font size
                        color: '#1C2635', // Set desired label color
                    }}
                >
                    {label}
                </Typography>
            </Box>
        </Box>
    );
}

export default CircularProgressWithLabel;
