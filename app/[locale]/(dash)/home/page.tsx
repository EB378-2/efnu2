"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  ListItem,
  ListItemText,
  Chip
} from "@mui/material";
import {
  Add,
  LocationOn,
  Public,
  Timer,
  CalendarToday,
  ArrowForward,
  Announcement,
} from "@mui/icons-material";
import { useTheme } from "@hooks/useTheme";
import { useTranslations } from "next-intl";
import { useGetIdentity } from "@refinedev/core";
import { ProfileName, ProfileAvatar } from "@components/functions/FetchFunctions";
import { useRouter } from "next/navigation";
import { format } from 'date-fns';
import SunriseSunsetCard from "@components/SunriseSunsetCard";

export default function HomePage() {
  const t = useTranslations("Home");
  const theme = useTheme();
  const { data: identityData } = useGetIdentity<{ id: string }>();
  const router = useRouter();
   
  // Current time state
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);



  const events = [
    {
      id: "1",
      name: 'Airport Grill Event',
      date: new Date('2025-06-15T19:00:00'),
      color: '#ff6b6b'
    },
    // ... more events
  ]
  const posts = [
    {
      id: "123ksldf",
      title: "New Security Checkpoint Procedures",
      category: "Security Update",
      categoryColor: "#ff6b6b",
      excerpt: "Starting June 1st, enhanced security measures will be implemented at all checkpoints. Please arrive 30 minutes earlier than usual.",
      date: new Date('2024-03-15T10:00:00'),
      content: "...full content..."
    },
    {
      id: "456jkl",
      title: "Terminal B Renovation Notice",
      category: "Facility Update",
      categoryColor: "#4caf50",
      excerpt: "Phase 2 of Terminal B renovations begins April 1st. Expect temporary closure of gates B5-B8.",
      date: new Date('2024-03-14T14:30:00'),
      content: "...full content..."
    }
  ]

  const handleEventClick = (eventId: String) => {
    // Handle event click logic
  }
  const handlePostClick = (postId: String) => {
    // Handle post click logic
  }

  const localString = currentTime.toLocaleString();
  const localTime = localString.split(',')[1].trim();
  const localDate = localString.split(',')[0].trim();
  
  const utcString = currentTime.toUTCString();
  const utcTime = utcString.split(' ')[4];
  const utcDate = utcString.split(' ').slice(0, 3).join(' ');
  
  const finishTime = new Date(currentTime.getTime() + 0 * 24 * 60 * 60 * 1000).toLocaleString().split(',')[1].trim();;
  const finishDate = new Date(currentTime.getTime() + 0 * 24 * 60 * 60 * 1000).toLocaleString().split(',')[0].trim();
  
  const formattedTime = utcString.split(' ')[4];
  const formattedDate = utcString.split(' ').slice(0, 3).join(' ');
  
  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 },
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(45deg, #121212 30%, #1e1e1e 90%)' 
        : 'linear-gradient(45deg, #f5f7fa 30%, #e4e8f0 90%)',
      minHeight: '100vh'
    }}>
      {/* Main Grid Layout */}
      <Grid container spacing={2}>

        {/* Main Header */}

        <Grid item xs={12}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            
            justifyContent: 'space-between', 
            mb: 2, 
            flexDirection: { xs: 'column', md: 'row' }
          }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {t("title")}
            </Typography>
            <Box sx={{ gap: 3, mt: { xs: 2, md: 0 } }}>
              <SunriseSunsetCard />
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {t("hours")}: 06:00 - 18:00 UTC
              </Typography>
            </Box>
          </Box>
        </Grid>



        <Grid item xs={12}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: { xs: 2, md: 3 },
            mb: { xs: 2, md: 4 },
            p: { xs: 1, md: 2 },
            borderRadius: '16px',
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(45deg, #1a1a1a 30%, #2a2a2a 90%)' 
              : 'linear-gradient(45deg, #f8f9fa 30%, #ffffff 90%)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {/* Local Time Card */}
            <Card sx={{ 
              flex: 1,
              display: { xs: 'none', md: 'block' },
              background: 'transparent',
              boxShadow: 'none',
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: '12px',
                padding: '1px',
                background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ 
                    mr: 1, 
                    color: theme.palette.mode === 'dark' ? '#4facfe' : '#1976d2',
                    fontSize: '1.5rem'
                  }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {t("LocalTime")}
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ 
                  fontWeight: 300,
                  background: theme.palette.mode === 'dark' 
                    ? 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)' 
                    : 'linear-gradient(45deg, #1976d2 0%, #2196f3 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '2px'
                }}>
                  {localTime}
                </Typography>
                <Typography variant="subtitle2" sx={{ 
                  mt: 1,
                  color: theme.palette.mode === 'dark' ? '#88d3ff' : '#4dabf5'
                }}>
                  {localDate}
                </Typography>
              </CardContent>
            </Card>

            {/* UTC Time Card */}
            <Card sx={{ 
              flex: 1,
              background: 'transparent',
              boxShadow: 'none',
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: '12px',
                padding: '1px',
                background: 'linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
              }
            }}>
              <CardContent sx={{ p: { xs: 1, md: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Public sx={{ 
                    mr: 1, 
                    color: theme.palette.mode === 'dark' ? '#43e97b' : '#2e7d32',
                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                  }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {t("UTCTime")}
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ 
                  fontWeight: 300,
                  fontSize: { xs: '1.8rem', md: '3rem' },
                  background: theme.palette.mode === 'dark' 
                    ? 'linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)' 
                    : 'linear-gradient(45deg, #2e7d32 0%, #4caf50 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '2px'
                }}>
                  {utcTime}
                </Typography>
                <Typography variant="subtitle2" sx={{ 
                  mt: 1,
                  display: {xs:'none', md: 'block'},
                  color: theme.palette.mode === 'dark' ? '#8bf0c5' : '#66bb6a'
                }}>
                  {utcDate}
                </Typography>
              </CardContent>
            </Card>

            {/* Finish Time Card */}
            <Card sx={{ 
              flex: 1,
              background: 'transparent',
              boxShadow: 'none',
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: '12px',
                padding: '1px',
                background: 'linear-gradient(45deg, #ff6b6b 0%, #ff8e53 100%)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
              }
            }}>
              <CardContent sx={{ p: { xs: 1, md: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Timer sx={{ 
                    mr: 1, 
                    color: theme.palette.mode === 'dark' ? '#ff6b6b' : '#d32f2f',
                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                  }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {t("FINTime")}
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ 
                  fontWeight: 300,
                  fontSize: { xs: '1.8rem', md: '3rem' },
                  background: theme.palette.mode === 'dark' 
                    ? 'linear-gradient(45deg, #ff6b6b 0%, #ff8e53 100%)' 
                    : 'linear-gradient(45deg, #d32f2f 0%, #f44336 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '2px'
                }}>
                  {finishTime}
                </Typography>
                <Typography variant="subtitle2" sx={{ 
                  mt: 1,
                  display: {xs:'none', md: 'block'},
                  color: theme.palette.mode === 'dark' ? '#ffab91' : '#ef5350'
                }}>
                  {finishDate}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        {/* Profile Coloumn */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            {/* Profile Card */}
            <Card sx={{
              color: 'white',
              borderRadius: '12px',
              boxShadow: '0 0 40px -10px rgba(34, 211, 238, 0.5)'
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <ProfileAvatar 
                    profileId={identityData?.id || ""} 
                  />
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.contrastText }}>
                  {t("WelcomeBack")}, <br/><ProfileName profileId={identityData?.id || ""} />
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 3, opacity: 0.9 }}>
                  {formattedDate}
                </Typography>
                <Stack spacing={1}>
                  <Button variant="outlined" color="secondary" onClick={() => {router.push("/atis")}}>{t("ReportTroubleatEFNU")}</Button>
                  <Button 
                    variant="outlined"
                    color="primary"
                    onClick={() => {router.push("/priornotice/create")}}
                  >
                    <Add/> {t("CreatePriorNotice")}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        
        {/* Right Column */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: '12px',
            boxShadow: '0 0 40px -10px rgba(34, 211, 238, 0.5)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardContent sx={{ flex: 1, p: 0 }}>
              <Box sx={{ 
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: 'center', 
                justifyContent: 'space-between',
                p: 3,
                pb: 1
              }}>
                <Typography variant="h6" sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontWeight: 600,
                  color: theme.palette.mode === 'dark' ? 'text.primary' : 'primary.main'
                }}>
                  <CalendarToday sx={{ 
                    mr: 1.5, 
                    fontSize: '1.4rem',
                    color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.dark' 
                  }} />
                  {t("UpcomingEvents")}
                </Typography>
              </Box>

              {/* Scrollable Events Area */}
              <Box sx={{ 
                height: { xs: 300, md: 400 },
                overflow: 'auto',
                px: 2,
                pb: 2
              }}>
                {events.map((event, index) => (
                  <Card 
                    key={event.id}
                    sx={{ 
                      mb: 2,
                      borderRadius: '8px',
                      borderLeft: `4px solid ${event.color || theme.palette.primary.main}`,
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateX(4px)',
                        boxShadow: theme.shadows[2]
                      }
                    }}
                  >
                    <ListItem 
                      secondaryAction={
                        <Button 
                          variant="contained" 
                          size="small"
                          onClick={() => handleEventClick(event.id)}
                          sx={{
                            minWidth: '90px',
                            borderRadius: '6px',
                            textTransform: 'none',
                            boxShadow: 'none'
                          }}
                        >
                          {t("Details")}
                        </Button>
                      }
                    >
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                            {event.name}
                          </Typography>
                        }
                        secondary={
                          <Typography 
                            variant="body2"
                            sx={{ 
                              color: theme.palette.mode === 'dark' ? 'text.secondary' : 'text.primary',
                              mt: 0.5
                            }}
                          >
                            <Box component="span" sx={{ fontWeight: 500, mr: 1 }}>
                              {format(event.date, 'MMM dd, yyyy')}
                            </Box>
                            • {format(event.date, 'hh:mm a')}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </Card>
                ))}
              </Box>

              {/* Sticky Footer Button */}
              <Box sx={{ 
                p: 2,
                position: 'sticky',
                bottom: 0,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(transparent, rgba(18, 18, 18, 0.9))' 
                  : 'linear-gradient(transparent, rgba(255, 255, 255, 0.9))',
                backdropFilter: 'blur(8px)',
                borderTop: `1px solid ${theme.palette.divider}`
              }}>
                <Button 
                  fullWidth 
                  variant="outlined"
                  endIcon={<ArrowForward />}
                  sx={{
                    py: 1.5,
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 500
                  }}
                >
                  {t("ViewAllEvents")}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: '12px',
            boxShadow: '0 0 40px -10px rgba(34, 211, 238, 0.5)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardContent sx={{ flex: 1, p: 0 }}>
              <Box sx={{ 
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: 'center', 
                justifyContent: 'space-between',
                p: 3,
                pb: 1
              }}>
                <Typography variant="h6" sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontWeight: 600,
                  color: theme.palette.mode === 'dark' ? 'text.primary' : 'primary.main'
                }}>
                  <Announcement sx={{ 
                    mr: 1.5, 
                    fontSize: '1.4rem',
                    color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.dark' 
                  }} />
                  {t("AirportUpdates")}
                </Typography>
              </Box>

              {/* Scrollable Posts Area */}
              <Box sx={{ 
                height: { xs: 300, md: 400 },
                overflow: 'auto',
                px: 2,
                pb: 2
              }}>
                {posts.map((post) => (
                  <Card 
                    key={post.id}
                    sx={{ 
                      mb: 2,
                      borderRadius: '8px',
                      borderLeft: `4px solid ${post.categoryColor || theme.palette.secondary.main}`,
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateX(4px)',
                        boxShadow: theme.shadows[2]
                      }
                    }}
                  >
                    <ListItem 
                      secondaryAction={
                        <Button 
                          variant="outlined" 
                          size="small"
                          onClick={() => handlePostClick(post.id)}
                          sx={{
                            minWidth: '100px',
                            borderRadius: '6px',
                            textTransform: 'none',
                            boxShadow: 'none'
                          }}
                        >
                          {t("readMore")}
                        </Button>
                      }
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Chip 
                              label={post.category}
                              size="small"
                              sx={{ 
                                borderRadius: '4px',
                                backgroundColor: post.categoryColor || theme.palette.secondary.light,
                                color: theme.palette.getContrastText(post.categoryColor || theme.palette.secondary.light)
                              }}
                            />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {post.title}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography 
                              variant="body2"
                              sx={{ 
                                color: theme.palette.mode === 'dark' ? 'text.secondary' : 'text.primary',
                                mt: 1,
                                lineClamp: 2,
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}
                            >
                              {post.excerpt}
                            </Typography>
                            <Typography 
                              variant="caption"
                              sx={{ 
                                display: 'block',
                                mt: 1,
                                color: theme.palette.text.secondary
                              }}
                            >
                              {t("postedOn")} {format(post.date, 'MMM dd, yyyy • hh:mm a')}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  </Card>
                ))}
              </Box>

              {/* Sticky Footer Button */}
              <Box sx={{ 
                p: 2,
                position: 'sticky',
                bottom: 0,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(transparent, rgba(18, 18, 18, 0.9))' 
                  : 'linear-gradient(transparent, rgba(255, 255, 255, 0.9))',
                backdropFilter: 'blur(8px)',
                borderTop: `1px solid ${theme.palette.divider}`
              }}>
                <Button 
                  fullWidth 
                  variant="outlined"
                  endIcon={<ArrowForward />}
                  sx={{
                    py: 1.5,
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 500
                  }}
                >
                  {t("ViewAllUpdates")}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}