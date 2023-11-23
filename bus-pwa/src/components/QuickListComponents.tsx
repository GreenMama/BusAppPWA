import React, { ReactNode } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';


type QuickListProps = {
    children?: ReactNode;
    [key: string]: any;
};

export const QuickList: React.FC<QuickListProps> = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <List
                sx={{
                    // width: '100%',
                    // maxWidth: {
                    //     xs: 400,  // max-width for screens smaller than sm (portrait phones, less than 600px)
                    //     sm: 480,  // max-width for screens sm and larger  (portrait tablets and large phones, 600px and up)
                    //     md: 600,  // max-width for screens md and larger (landscape tablets, 768px and up)
                    //     lg: 800,  // max-width for screens lg and larger (laptops/desktops, 1024px and up)
                    //     xl: 1000, // max-width for screens xl and larger (large laptops and desktops, 1200px and up)
                    // },
                    // //bgcolor: 'rgba(0, 255, 255, 0.20)'

                    width: { xs: 400, sm: 480, md: 600, lg: 800, xl: 1000 },

                    borderRadius: '10%'
                }}>
                {children}
            </List>
        </Box>
    );
};

type QuickListItemProps = {
    id: string;
    icon?: ReactNode;
    title?: string;
    subtitle?: string;
    // value?: { [key: string]: any };
    showEdit?: boolean;
    showDelete?: boolean;
    onClick?: (value: { [key: string]: any } | undefined) => void;
    onEdit?: (value: { [key: string]: any } | undefined) => void;
    onDelete?: (value: { [key: string]: any } | undefined) => void;
};

export const QuickListItem: React.FC<QuickListItemProps> = (props) => {
    const { id, icon, title, subtitle, showEdit, showDelete, onClick, onEdit, onDelete } = props;

    return (
        <>
            <ListItemButton
                key={id}
                role={undefined}
                dense
                sx={{
                    //'&:hover': { backgroundColor: 'transparent' }
                    display: 'flex',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
                    borderRadius: 2,
                    bgcolor: 'rgba(0, 0, 0, 0.02)',
                    //marginTop: '0px',
                }}
            >
                <ListItem
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        // '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
                        // borderRadius: 2,
                        // bgcolor: 'rgba(0, 0, 0, 0.02)'
                    }}
                    key={id}
                    onClick={onClick}
                // secondaryAction={
                //     <Box>
                //         {showEdit && <IconButton edge="end" aria-label="edit" onClick={onEdit}>
                //             <Edit />
                //         </IconButton>}
                //         {showDelete && <IconButton sx={{ marginLeft: 2 }} edge="end" aria-label="delete" onClick={onDelete}>
                //             <Delete />
                //         </IconButton>}
                //     </Box>
                // }
                >
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={title} secondary={subtitle} />

                </ListItem>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    {showEdit && <IconButton edge="end" aria-label="edit" onClick={onEdit}>
                        <Edit />
                    </IconButton>}
                    {showDelete && <IconButton sx={{ marginLeft: 2 }} edge="end" aria-label="delete" onClick={onDelete}>
                        <Delete />
                    </IconButton>}
                </Box>

            </ListItemButton>
            <Divider sx={{ marginBottom: '3px' }} />
        </>
    );
};



