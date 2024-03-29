import jsPDF from "jspdf";
import moment from "moment";
import autoTable from "jspdf-autotable";
import { getCurrentUser } from "@utils/users";

const PDFreport = async (reportData, startDate, endDate) => {
  const unit = "pt";
  const size = "A4";
  const orientation = "portrait";
  const marginLeft = 10;
  const document = new jsPDF(orientation, unit, size);
  const dateToday = new Date();
  const generatedDate = "Generated Date: " + dateToday;
  
  const headers = [
    [
      "ORDER ID",
      "STATUS",
      "PAYMENT STATUS",
      "CUSTOMER",
      "DELIVERY ADDRESS",
      "PLACED AT",
      "TOTAL PRICE",
      "TOTAL ITEMS",
    ],
  ];

  const data = reportData.map((report) => [
    report.id,
    report.status,
    report.is_completed ? "Paid" : "Unpaid",
    report.customer.full_name,
    report.delivery_address,
    moment(report.placed_date).format("MMM D YYYY - h:mm A"),
    report.total_price,
    report.total_items,
  ]);

  const content = {
    theme: "grid",
    startY: 130,
    head: headers,
    body: [...data],
    margin: { left: 10, right: 10, top: 10 },
    headStyles: { halign: "center", fillColor: "#000000", valign: "middle" },
    columnStyles: {
      0: { cellWidth: 60, halign: "center", valign: "middle" },
      1: { cellWidth: 75, halign: "center", valign: "middle" },
      2: { cellWidth: 85, halign: "center", valign: "middle" },
      3: { cellWidth: 70, halign: "center", valign: "middle" },
      4: { cellWidth: 95, halign: "center", valign: "middle" },
      5: { cellWidth: 70, halign: "center", valign: "middle" },
      6: { cellWidth: 60, halign: "center", valign: "middle" },
      7: { cellWidth: 65, halign: "center", valign: "middle" },
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
  document.text("Maczela Pizza Order Report", marginLeft, 70);
  document.text(generatedDate, marginLeft, 100);
  document.text("Generated by: Josh Domingo", marginLeft, 130);
  
  autoTable(document, content);
  return document.save(
    `Order_Report-${moment(startDate).format("YYYY-MM-DD")}-to-${moment(
      endDate,
    ).format("YYYY-MM-DD")}.pdf`,
  );
};

export default PDFreport;
