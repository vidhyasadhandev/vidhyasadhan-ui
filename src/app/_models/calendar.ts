export interface Calendar{
summary: string;
location: string;
description: string;
timeZone: string;
start: Date;
end: Date;
recurrence: any;
attendees: any;
organizer: string;
}


export interface CalendarResponse{
    items: CalendarItems[];
}


export interface CalendarItems{
    organizer: any;
    attendees: any;
    hangoutLink: string;
}
