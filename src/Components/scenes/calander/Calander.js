import React from 'react'
import { formatDate } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";

import DashApp from '../global/DashApp';
import Header from '../../Header';
import { Box, ListItem, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
const Calander = () => {
  // theme config
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [currentEvents, setCurrentEvents] = useState([])
  // handle calander date click
  const handleDateClick = (selected) => {
    // will prompt the user to enter the title of the event to be done
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  // handle event click
  const handleEventClick = (selected) => {
    // will prompt the user to confirm for the event to be removed
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };


  return (
    <DashApp>
      <Box m='20px'>
        <Header title={'Your Schedule'} subtitle={'Welcome To Your Schedule'} />

        <Box
          display={'flex'}
          justifyContent={'space-between'}
        >
          {/* CALANDAR SIDEBAR */}
          <Box flex="1 1 20%"
            backgroundColor={colors.primary[400]}
            p="15px"
            borderRadius="4px"
          >
            <Typography variant='h5'> EVENTS</Typography>
            {/* display the events to be displayed */}
            {
              currentEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))
            }
          </Box>


          {/* CALENDAR */}
          <Box flex="1 1 100%" ml="15px">
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              // only for under standing remove this comment later
              // will handle dateclick
              select={handleDateClick}
              // will handle will handle event clickt
              eventClick={handleEventClick}
              eventsSet={(events) => {
                // add new events
                setCurrentEvents(events)
              }}
              initialEvents={[
                {
                  id: "12315",
                  title: "All-day event",
                  date: new Date().toISOString().split('T')[0],
                },
                {
                  id: "5123",
                  title: "Timed event",
                  date: new Date().toISOString().split('T')[0],
                },
              ]}
            />
          </Box>
        </Box>
      </Box>
    </DashApp>
  )
}

export default Calander