/* eslint-disable react/prop-types */
import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

// eslint-disable-next-line react/prop-types
const InvoicePreview = ({ invoice }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Invoice", 105, 15, { align: "center" });

    // Add invoice header
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice ID : ${invoice._id}`, 20, 30);
    doc.text(`Customer Name : ${invoice.customerName}`, 20, 40);
    doc.text(`Customer Email : ${invoice.customerEmail}`, 20, 50);

    const invoiceDate = new Date(invoice.createdAt);
    doc.text(`Invoice Date : ${invoiceDate.toLocaleDateString()}`, 20, 60);

    // Add current time
    const currentTime = new Date().toLocaleTimeString();
    doc.text(`Invoice Time : ${currentTime}`, 20, 70);

    doc.text(`Tax : ${ invoice.tax.toFixed(2)}%`, 20, 80);

    doc.text(`Total Amount : $${ invoice.total.toFixed(2)}`, 20, 90);
    
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(20, 95, 190, 95);

    // Add table for product details
    const tableColumnHeaders = [
      "Product Name",
      "Quantity",
      "Price ($)",
      "Total ($)"
    ];
    const tableRows = invoice.products.map((product) => [
      product.name,
      product.quantity,
      product.price.toFixed(2),
      (product.quantity * product.price).toFixed(2),
    ]);
    
    console.log(tableRows);

    doc.autoTable({
      startY: 100, // Start below the invoice details
      head: [tableColumnHeaders],
      body: tableRows,
      styles: { font: "helvetica", fontSize: 10 },
      theme: "grid",
    });
    
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.text(
      "Thank you for your business!",
      105,
      pageHeight - 10,
      { align: "center" }
    );

    // Save the PDF file
    doc.save(`invoice_${invoice._id}.pdf`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-[0px_0px_4px_0px_#00000040] rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Invoice Preview
        </h2>
        <div className="mb-4 space-y-2">
          <p className="text-gray-600">
            <span className="font-semibold">Invoice ID: </span>
            {invoice._id}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Customer Name: </span>
            {invoice.customerName}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Customer Email: </span>
            {invoice.customerEmail}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Invoice Date: </span>
            {new Date(invoice.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Total Amount: </span>${" "}
            {invoice.total}
          </p>
        </div>
        <button
          onClick={generatePDF}
          className="w-full bg-neutral-700 text-white px-4 py-3 rounded-md hover:bg-neutral-800 transition font-semibold text-lg"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default InvoicePreview;
