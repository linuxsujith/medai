export const downloadReportPDF = (report: any) => {
    // In a real implementation, we would use jsPDF or a server-side route
    console.log("Generating PDF for:", report.summary);
    alert("Downloading your Doctor-Ready PDF Report...");

    // Create a blob and download (mock)
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(report, null, 2)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "MEDAI_Health_Report.txt";
    document.body.appendChild(element);
    element.click();
};

export const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi (हिंदी)' },
    { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' }
];
