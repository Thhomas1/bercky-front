interface ReportPreviwPageProps {
    params: Promise<{reportId: number}>;
}


export default async function ReportPreviewPage({params}: ReportPreviwPageProps) {
const {reportId} = await params;

    return (
        <div className="div">
            <h1>Report Preview Page</h1>
            <p className="">report id: {reportId}</p>
            
    </div>
    )
}