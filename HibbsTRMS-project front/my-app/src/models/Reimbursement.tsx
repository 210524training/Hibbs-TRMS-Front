export default interface Reimbursement {
     ObjType: "Reimbursement",
     username:string,
     realName:string,
     ID: string,
     cost: number,
     status: "Pending" | "ApprovedBySupervisor"|'ApprovedByDepartmentHead'|'ApprovedByBenefitsController' | "Rejected" | "Awarded",
     eventType:"University Course" |"Seminar" | "Certification" | "Cert Prep" | "Technical Training" | "Other",
     reimbursePortion: 0.8 | 0.6 | 0.75 | 1 | 0.9 | 0.3,
     expectedAmount:number,
     Date: string,
     description: string|null,
     grade:string,
     gradeFormat:"letter"|"percent"|"pass/fail"|"other",
     passingGrade:string,
     presentationSubmission:File|null,
}

