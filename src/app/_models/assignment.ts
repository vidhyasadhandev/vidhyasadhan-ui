export interface Assignment {
    assignmentId?: number;
    title: string;
    topic: string;
    subject: string;
    grade: string;
    points: string;
    startDate: Date;
    dueDate: Date;
    instructions: string;
    assignmentFile: string;
    questionSetId: number;
    courseId: string;
    instructorId: string;
    studentAssignments?: StudentAssignment[];
}

export interface StudentAssignment{
    assignmentId?: number;
    userId?: string;
    assignment?: Assignment;
    account?: Account;
}
