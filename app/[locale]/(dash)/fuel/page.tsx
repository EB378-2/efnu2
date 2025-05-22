"use client";

import React, { useState, useEffect } from "react";
import { useGetIdentity, useNotification } from "@refinedev/core";
import { 
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  LinearProgress,
  Chip,
  Stack
} from "@mui/material";
import { 
  Person as UserIcon, 
  LocalGasStation as FuelIcon, 
  AttachMoney as DollarIcon, 
  Description as FileTextIcon 
} from "@mui/icons-material";
import {
  Modal,
  Backdrop,
  Fade,
  TextField,
  Divider,
  IconButton,
  Slide,
  styled
} from "@mui/material";
import { useTheme } from "@hooks/useTheme";
import { useForm, useList } from "@refinedev/core";
import { useTranslations } from "next-intl";
import {
  LocalGasStation,
  EventAvailable,
  Close,
  Email,
  Phone,
  Place,
  Info
} from "@mui/icons-material";
import { SaveButton } from "@refinedev/mui";
import { motion } from "framer-motion";
import { FuelOption, FuelingValues, FuelItem } from '@/types/index';
import { FuelName } from "@/components/functions/FetchFunctions";

// Styled components
const GradientCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.common.white,
  borderRadius: 20,
  boxShadow: theme.shadows[10],
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[16]
  }
}));

const HoverButton = styled(Button)(({ theme }) => ({
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[4]
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 14,
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`
    },
  },
}));

const FuelPage = () => {
  const { data: identityData } = useGetIdentity<{ id: string }>();
  const theme = useTheme();
  const [selectedFuel, setSelectedFuel] = useState<string>("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [myRefuelingsModalOpen, setMyRefuelingsModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [tankStatusModalOpen, setTankStatusModalOpen] = useState(false);

  const { data: fuels } = useList<FuelOption>({
    resource: "fuels",
  });

  const { 
    formLoading,
    onFinish,
  } = useForm<FuelingValues>({
    resource: 'fuelings',
    action: "create",
    redirect: false,
    onMutationSuccess: () => {
      setCreateModalOpen(false);
    }
  });

  const { data: myRefuelingsData } = useList<FuelItem>({
    resource: "fuelings",
    filters: [
      {
        field: "uid",
        operator: "eq",
        value: identityData?.id || "",
      },
    ],
    sorters: [
      {
        field: "created_at",
        order: "desc",
      },
    ],
    queryOptions: {
      enabled: !!identityData?.id,
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onFinish({
      aircraft: formData.get("aircraft") as string,
      amount: Number(formData.get("amount")),
      fuel: selectedFuel,
    });
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      {/* Create New Refueling Modal */}
      <Modal open={createModalOpen} onClose={() => setCreateModalOpen(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          maxWidth: "95vw",
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 4,
          p: 3,
        }}>
          <Typography variant="h5" gutterBottom>
            <LocalGasStation /> Record Fuel Addition
          </Typography>

          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Adding to: {fuels?.data?.find(f => f.id === selectedFuel)?.label}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="amount"
                  label="Amount Added (Liters)"
                  type="number"
                  inputProps={{ min: 0.1, step: 0.1 }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="aircraft"
                  label="Aircraft/Vehicle"
                  placeholder="Optional identifier"
                />
              </Grid>
              
            </Grid>

            <Box mt={3}>
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth
              >
                Record Fuel Addition
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* My Refuelings Modal */}
      <Modal
        open={myRefuelingsModalOpen}
        onClose={() => setMyRefuelingsModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={myRefuelingsModalOpen}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            maxWidth: "95vw",
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 4,
            p: 3
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EventAvailable color="primary" />
                Fueling History
              </Typography>
              <IconButton onClick={() => setMyRefuelingsModalOpen(false)}>
                <Close />
              </IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ maxHeight: 400, overflow: 'auto', pr: 1 }}>
              {myRefuelingsData?.data?.map((item: FuelItem) => (
                <Card 
                  key={item.id} 
                  sx={{ 
                    mb: 2, 
                    borderRadius: 3,
                    background: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'rgba(0, 0, 0, 0.03)'
                  }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between">
                      <Box>
                        <Typography variant="body1" fontWeight={600}>
                          {item.aircraft}
                        </Typography>
                        <Chip 
                          label={<FuelName id={item.fuel} />}
                          size="small" 
                          color="primary"
                          sx={{ borderRadius: 2, mt: 0.5 }}
                        />
                      </Box>
                      <Box textAlign="right">
                        <Typography variant="body2" color="text.secondary">
                          {new Date(item.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZoneName: 'short'
                          })}
                        </Typography>
                        <Typography variant="h6" color="primary">
                          {item.amount}L
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Contact Modal */}
      <Modal
        open={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        closeAfterTransition
      >
        <Slide in={contactModalOpen} direction="up">
          <Box sx={{
            position: 'absolute',
            bottom: "10vh", 
            left: 0,
            right: 0,
            bgcolor: 'background.paper',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            p: 3,
            maxWidth: "95vw",
            margin: '0 auto'
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email color="primary" />
                Contact Us
              </Typography>
              <IconButton onClick={() => setContactModalOpen(false)}>
                <Close />
              </IconButton>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 3,
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'
                }}>
                  <Typography variant="body1" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Email fontSize="small" /> fuel@efnu.fi
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Phone fontSize="small" /> +358 123 456 789
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Place fontSize="small" /> 123 Aviation St, Helsinki
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    We're available 24/7 for your fueling needs. Reach out for:
                  </Typography>
                  <ul style={{ paddingLeft: 20, margin: 0 }}>
                    <li><Typography variant="body2">Emergency support</Typography></li>
                    <li><Typography variant="body2">Bulk orders</Typography></li>
                    <li><Typography variant="body2">Service inquiries</Typography></li>
                  </ul>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Slide>
      </Modal>

      {/* Fueling Status Modal */}
      <Modal open={tankStatusModalOpen} onClose={() => setTankStatusModalOpen(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          maxWidth: "95vw",
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 4,
          p: 3,
        }}>
          <Typography variant="h5" gutterBottom>
            <LocalGasStation /> Fuel Tank Estimates
          </Typography>
          
          <Typography variant="body2" color="text.secondary" paragraph>
            Based on recorded fuelings. Actual levels may vary.
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Fuel Type</TableCell>
                  <TableCell align="right">Capacity</TableCell>
                  <TableCell align="right">Estimated</TableCell>
                  <TableCell align="right">% Full</TableCell>
                  <TableCell align="right">Last Added</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fuels?.data?.map((fuel: FuelOption) => {
                  const percent = (fuel?.remaining ?? 0) / (fuel?.capacity ?? 1) * 100;
                  console.log(percent);
                  console.log(fuel.remaining);
                  console.log(fuel.capacity);
                  console.log(fuel);
                  const lastAdded = fuel.lastFueling?.toLocaleDateString() || 'Never';
                  
                  return (
                    <TableRow key={fuel.id}>
                      <TableCell>
                        <Chip 
                          label={fuel.label} 
                          sx={{ backgroundColor: fuel.color, color: 'white' }} 
                        />
                      </TableCell>
                      <TableCell align="right">{fuel.capacity}L</TableCell>
                      <TableCell align="right">
                        ~{fuel?.remaining?.toFixed(1)}L
                      </TableCell>
                      <TableCell align="right">
                        <Box display="flex" alignItems="center" gap={1}>
                          <LinearProgress 
                            variant="determinate" 
                            value={percent} 
                            sx={{ width: 60, height: 8 }}
                          />
                          {percent.toFixed(0)}%
                        </Box>
                      </TableCell>
                      <TableCell align="right">{lastAdded}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={2}>
            <Typography variant="caption" color="text.secondary">
              Note: Estimates assume no fuel consumption between recordings.
            </Typography>
          </Box>
        </Box>
      </Modal>

      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Fuel Management System
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Fueling options */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ 
              borderRadius: '12px',
              boxShadow: '0 0 40px -10px rgba(34, 211, 238, 0.5)',
            }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Report Fuel</Typography>
                  </Box>
                }
                subheader="Fuel Reporting system"
              />
              <CardContent>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {fuels?.data?.map((option: FuelOption) => (
                    <Grid item xs={6} key={option.value}>
                      <motion.div whileHover={{ scale: 1.03 }}>
                        <HoverButton
                          fullWidth
                          variant="outlined"
                          color={option.color as "primary" | "secondary" | "info" | "success" | "warning" | "error"}
                          onClick={() => {
                            setSelectedFuel(option.id);
                            setCreateModalOpen(true);
                          }}
                          sx={{
                            height: 120,
                            maxWidth: "100vw",
                            borderRadius: 3,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            '& .MuiButton-startIcon': {
                              margin: 0,
                              mb: 1
                            }
                          }}
                        >
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {option.label}
                          </Typography>
                          <Typography variant="caption" sx={{ opacity: 0.9 }}>
                            From €{option?.price}/L
                          </Typography>
                        </HoverButton>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Misc */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ 
              borderRadius: '12px',
              boxShadow: '0 0 40px -10px rgba(34, 211, 238, 0.5)',
            }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Fuel Management</Typography>
                    <DollarIcon color="action" />
                  </Box>
                }
                subheader="Your fuelings, etc"
              />
              <CardContent>
                <Stack spacing={2} sx={{ mt: 3 }}>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <HoverButton
                      variant="outlined"
                      color="secondary"
                      onClick={() => setMyRefuelingsModalOpen(true)}
                      startIcon={<EventAvailable sx={{ fontSize: 32 }} />}
                      sx={{
                        height: 80,
                        width: '100%',
                        maxWidth: "100vw",
                        alignSelf: 'center',
                        borderRadius: 3,
                        justifyContent: 'flex-start',
                        px: 3,
                        textTransform: 'none'
                      }}
                    >
                      <Box>
                        <Typography variant="h6" fontWeight={600}>Refueling History</Typography>
                        <Typography variant="caption">View past transactions</Typography>
                      </Box>
                    </HoverButton>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }}>
                    <HoverButton
                      variant="outlined"
                      color="info"
                      onClick={() => setTankStatusModalOpen(true)}
                      startIcon={<Info sx={{ fontSize: 32 }} />}
                      sx={{
                        height: 80,
                        width: '100%',
                        maxWidth: "100vw",
                        alignSelf: 'center',
                        borderRadius: 3,
                        justifyContent: 'flex-start',
                        px: 3,
                        textTransform: 'none'
                      }}
                    >
                      <Box>
                        <Typography variant="h6" fontWeight={600}>Fuel Availability</Typography>
                        <Typography variant="caption">Current tank estimates</Typography>
                      </Box>
                    </HoverButton>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }}>
                    <HoverButton
                      variant="outlined"
                      color="success"
                      onClick={() => setContactModalOpen(true)}
                      startIcon={<Email sx={{ fontSize: 32 }} />}
                      sx={{
                        height: 80,
                        width: '100%',
                        maxWidth: "100vw",
                        alignSelf: 'center',
                        borderRadius: 3,
                        justifyContent: 'flex-start',
                        px: 3,
                        textTransform: 'none'
                      }}
                    >
                      <Box>
                        <Typography variant="h6" fontWeight={600}>Support Center</Typography>
                        <Typography variant="caption">24/7 assistance</Typography>
                      </Box>
                    </HoverButton>
                  </motion.div>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FuelPage;