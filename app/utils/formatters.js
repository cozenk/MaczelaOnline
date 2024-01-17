export function formatDate(date = "") {
  if (!date) return null;

  return new Date(date).toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}

export function formatPrice(
  price,
  options = { withoutTag: false, withoutDecimals: false },
) {
  if (options.withoutTag) {
    if (options.withoutDecimals)
      return new Intl.NumberFormat("en-US").format(price);

    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  } else {
    if (options.withoutDecimals)
      return `₱${new Intl.NumberFormat("en-US").format(price)}`;

    return `₱${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)}`;
  }
}
