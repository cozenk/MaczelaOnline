import jsPDF from "jspdf";
import moment from "moment";
import autoTable from "jspdf-autotable";
import { formatPrice } from "@utils/formatters";

const PDFreport = async (reportData, startDate, endDate) => {
  const unit = "pt";
  const size = "A4";
  const orientation = "portrait";
  const marginLeft = 10;
  const document = new jsPDF(orientation, unit, size);
  const dateToday = new Date();
  const generatedDate = "Generated Date: " + dateToday;
  const print = new User();
  const printedby = "Printed by: " + print;
  

  const headers = [
    ["ORDER ID", "DATE", "CUSTOMER", "ITEMS", "TOTAL PRICE", "TOTAL ITEMS"],
  ];

  const data = reportData.map((order) => [
    order.id,
    moment(order.placed_date).format("MMM D YYYY - h:mm A"),
    `${order.customer.full_name} ${
      order.customer.mobile_number
        ? `(${order.customer.mobile_number})`
        : order.customer.email
    }`,
    order.items.map(
      (item) =>
        `- ${item.name} (x${item.quantity}) - Php${item.price}\nTotal: Php${
          item.quantity * item.price
        }
    `,
    ),
    `Php${order.total_price}`,
    order.total_items,
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
      3: { cellWidth: 180, halign: "left", valign: "middle" },
      4: { cellWidth: 95, halign: "center", valign: "middle" },
      5: { cellWidth: 70, halign: "center", valign: "middle" },
      6: { cellWidth: 60, halign: "center", valign: "middle" },
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
  document.text("Sales Report", marginLeft, 70);
  document.text(generatedDate, marginLeft, 100);
  document.text(printedby, marginLeft, 130);
  
  autoTable(document, content);
  return document.save(
    `Sales_Report-${moment(startDate).format("YYYY-MM-DD")}-to-${moment(
      endDate,
    ).format("YYYY-MM-DD")}.pdf`,
  );
};

export default PDFreport;
