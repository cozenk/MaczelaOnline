import jsPDF from "jspdf";
import moment from "moment";
import autoTable from "jspdf-autotable";

const PDFreport = async (reportData, startDate, endDate) => {
  const unit = "pt";
  const size = "A4";
  const orientation = "portrait";
  const marginLeft = 10;
  const document = new jsPDF(orientation, unit, size);

  const headers = [
    ["ID", "NAME", "CATEGORY", "DESCRIPTION", "PRICE", "SIZE", "VARIANTS"],
  ];

  const data = reportData.map((report) => [
    report.id,
    report.name,
    report.category,
    report.description,
    report.price,
    report.size,
    report.variants.map((variant) => variant.name),
  ]);

  const content = {
    theme: "grid",
    startY: 130,
    head: headers,
    body: [...data],
    margin: { left: 10, right: 10, top: 5 },
    headStyles: { halign: "center", fillColor: "#000000", valign: "middle" },
    columnStyles: {
      0: { cellWidth: 60, halign: "center", valign: "middle" },
      1: { cellWidth: 75, halign: "center", valign: "middle" },
      2: { cellWidth: 85, halign: "center", valign: "middle" },
      3: { cellWidth: 95, halign: "center", valign: "middle" },
      4: { cellWidth: 95, halign: "center", valign: "middle" },
      5: { cellWidth: 70, halign: "center", valign: "middle" },
      6: { cellWidth: 75, halign: "center", valign: "middle" },
    },
    didDrawPage: () => {
      // Footer
      const pageCount = document.internal.getNumberOfPages();
      document.text(
        "Page " + String(pageCount),
        10,
        document.internal.pageSize.height - 10,
      );
    },
  };
  // Header
  document.setFontSize(10);
  document.text("Products Report", marginLeft, 70);
  document.text("Record of Products: ", marginLeft, 100);

  autoTable(document, content);
  return document.save(
    `Products_Report-${moment(startDate).format("YYYY-MM-DD")}-to-${moment(
      endDate,
    ).format("YYYY-MM-DD")}.pdf`,
  );
};

export default PDFreport;