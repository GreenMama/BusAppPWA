import * as React from 'react';
import '../App.css';
import { Box, Card, CardContent, Typography, Avatar, IconButton } from '@mui/material';
// import { ThumbUp, ThumbUpOutlined, WavingHandOutlined } from '@mui/icons-material';


// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import SkipNextIcon from '@mui/icons-material/SkipNext';


interface VideoCardProps {
    ID?: string;
    title?: string;
    image?: string;
    subtitle?: string;
    summary?: string;
    isVisible?: boolean;
    URL?: string;
    onClick?: (URL: string) => void;
    onEditClick?: (ID: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ ID, title, image, subtitle, isVisible = true, URL, onClick }) => {
    return (
        <>
            {isVisible && <Card
                key={ID}
                onClick={() => { URL && onClick?.(URL) }}
                sx={{
                    display: 'flex',
                    //justifyContent: 'space-between',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
                    //backgroundColor: 'rgba(255, 255, 255, 0.5)',
                }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} p={2}>
                    <Avatar
                        src={image}
                        sx={{
                            width: { xs: 80, sm: 100, md: 142 },
                            height: { xs: 80, sm: 56, md: 80 },
                            borderRadius: '10%'
                        }}>
                        {title}

                    </Avatar>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h6">
                            {title}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            {subtitle}
                        </Typography>
                    </CardContent>
                </Box>
                <Box p={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                    <IconButton >
                        {/* {isThumbsUp && <ThumbUp sx={{
                            height: 38, width: 38,
                            //marginLeft: 'auto',
                        }} />}
                        {!isThumbsUp && <ThumbUpOutlined sx={{
                            height: 38, width: 38,
                            //marginLeft: 'auto',
                        }} />}
                        {isWaivingHand && <WavingHandOutlined sx={{
                            height: 38, width: 38,
                            //marginLeft: 'auto',
                        }} />} */}
                    </IconButton>

                </Box>
            </Card>}
        </>
    );
}

export default VideoCard;