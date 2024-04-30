import jsPDF from 'jspdf';

export const POST = async (req) => {
  try {
    const { inputValue } = await req.json();

    // Create a new PDF document
    const doc = new jsPDF();

    // Set up the PDF formatting and layout
    doc.setFontSize(14);
    const lines = doc.splitTextToSize(inputValue, doc.internal.pageSize.getWidth() - 20);
    doc.text(15, 20, lines);

    // Get the PDF data as a Uint8Array
    const pdfData = new Uint8Array(await doc.output('arraybuffer'));

    return new Response(pdfData, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=output.pdf',
        'Content-Length': pdfData.length,
      },
    });
  } catch (error) {
    console.error(error);
    return new Response('Failed to generate PDF', { status: 500 });
  }
};