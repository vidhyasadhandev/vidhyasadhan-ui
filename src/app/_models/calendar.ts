export interface Calendar{
title?: string;
summary: string;
color?: string;
location: string;
description: string;
timeZone: string;
start: Date;
end: Date;
recurrence: any;
attendees: any;
organizer: string;
videoLink?: string;
}


export interface CalendarResponse{
    items: CalendarItems[];
}


export interface CalendarItems{
    organizer: any;
    attendees: any;
    hangoutLink: string;
}
