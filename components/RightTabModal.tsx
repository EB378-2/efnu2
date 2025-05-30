"use client";

import React, { useState } from 'react';
import { 
  Box, Button, Modal, Typography, List, ListItem, ListItemText, 
  ListItemIcon, Chip, CircularProgress, Alert
} from '@mui/material';
import { useList } from '@refinedev/core';
import { Warning, Error, Info, Schedule } from '@mui/icons-material';
import { useTheme } from '@hooks/useTheme';
import { formatDistanceToNow } from 'date-fns';

const AlertTabModal = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  

  // Fetch active alerts using Refine's useList hook
  const { data, isLoading, isError } = useList({
    resource: 'alerts',
    filters: [
      {
        field: 'is_active',
        operator: 'eq',
        value: 'true'
      }
    ],
    sorters: [{ field: 'severity', order: 'asc' }],
    pagination: { pageSize: 20 }
  });

  const alerts = data?.data || [];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Get icon based on alert type
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'emergency': return <Error color="error" />;
      case 'warning': return <Warning color="warning" />;
      case 'ongoing': return <Schedule color="info" />;
      default: return <Info color="info" />;
    }
  };

  // Get color based on severity
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      default: return 'success';
    }
  };

  return (
    <>
      {/* Fixed trigger tab - Thin design */}
      <Box
        sx={{
          position: 'fixed',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2000,
        }}
      > 
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            minWidth: 0,
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
            py: 1.2,
            px: 0.5,
            width: 30,
            boxShadow: 3,
            backgroundColor: theme.palette.error.main,
            '&:hover': {
              backgroundColor: theme.palette.error.dark,
              transform: 'translateX(-4px)',
            },
            transition: 'all 0.3s ease',
            display: alerts.length === 0 ? 'none' : 'block',
          }}
        >
          <Typography 
            variant="caption" 
            sx={{ 
              writingMode: 'vertical-rl', 
              transform: 'rotate(180deg)',
              fontSize: '0.7rem',
              letterSpacing: '0.5px',
              fontWeight: 700
            }}
          >
            ALERTS
          </Typography>
        </Button>
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: 500,
            maxWidth: '90vw',
            maxHeight: '80vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            outline: 'none',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              p: 2,
              backgroundColor: theme.palette.error.main,
              color: theme.palette.error.contrastText,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Active Alerts
            </Typography>
          </Box>

          {isLoading ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <CircularProgress />
              <Typography variant="body2" sx={{ mt: 2 }}>
                Loading alerts...
              </Typography>
            </Box>
          ) : isError ? (
            <Alert severity="error" sx={{ m: 2 }}>
              Failed to load alerts
            </Alert>
          ) : alerts.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1">
                No active alerts at this time
              </Typography>
            </Box>
          ) : (
            <List sx={{ overflow: 'auto', flex: 1 }}>
              {alerts.map((alert) => (
                <ListItem 
                  key={alert.id}
                  sx={{ 
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    py: 1.5,
                    '&:hover': { 
                      backgroundColor: 'rgba(0, 0, 0, 0.03)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {getAlertIcon(alert.alert_type)}
                  </ListItemIcon>
                  
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 1 }}>
                          {alert.title}
                        </Typography>
                        <Chip 
                          label={alert.severity}
                          size="small"
                          color={getSeverityColor(alert.severity)}
                          sx={{ height: 20, fontSize: '0.65rem' }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                          {alert.description}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                          {alert.end_time ? (
                            <>
                              <Box component="span" sx={{ fontWeight: 600 }}>
                                Ends: 
                              </Box>
                              {' '}
                              {formatDistanceToNow(new Date(alert.end_time), { addSuffix: true })}
                            </>
                          ) : (
                            <Box component="span" sx={{ color: theme.palette.info.main, fontWeight: 600 }}>
                              Ongoing
                            </Box>
                          )}
                        </Typography>
                      </Box>
                    }
                    primaryTypographyProps={{ component: 'div' }}
                    secondaryTypographyProps={{ component: 'div' }}
                  />
                </ListItem>
              ))}
            </List>
          )}
          
          <Box sx={{ p: 1.5, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Button 
              onClick={handleClose}
              variant="outlined"
              size="small"
              fullWidth
              sx={{ 
                borderRadius: 1.5,
                textTransform: 'none',
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AlertTabModal;