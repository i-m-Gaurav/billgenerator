import PDFDocument from 'pdfkit';

export const GET = (req) => {
  // Handle GET requests, if needed
  // For example, you can return a message or some instructions
  return new Response('This API route handles POST requests for generating PDFs.');
};

export const POST = async (req) => {
    try {
      const { inputValue } = await req.json();
  
      // Create a new PDF document
      const doc = new PDFDocument();
  
      // Set up the PDF formatting and layout
      doc.fontSize(14);
      doc.text(inputValue);
  
      // Create a buffer to store the PDF data
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        return new Response(pdfData, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=output.pdf',
            'Content-Length': pdfData.length,
          },
        });
      });
      doc.end();
    } catch (error) {
      console.error(error);
      return new Response('Failed to generate PDF', { status: 500 });
    }
  };