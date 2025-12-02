const monthAbbr: Record<string, string> = {
  มกราคม: "ม.ค.",
  กุมภาพันธ์: "ก.พ.",
  มีนาคม: "มี.ค.",
  เมษายน: "เม.ย.",
  พฤษภาคม: "พ.ค.",
  มิถุนายน: "มิ.ย.",
  กรกฎาคม: "ก.ค.",
  สิงหาคม: "ส.ค.",
  กันยายน: "ก.ย.",
  ตุลาคม: "ต.ค.",
  พฤศจิกายน: "พ.ย.",
  ธันวาคม: "ธ.ค.",
};

export function formatDate(dateString: string): string {
  try {
    const dateStrings = dateString.split(",").map((d) => d.trim());
    const dates: Date[] = [];
    const monthYearMap = new Map<
      string,
      { month: string; monthAbbr: string; year: string }
    >();

    for (const ds of dateStrings) {
      const date = new Date(ds);
      if (!isNaN(date.getTime())) {
        dates.push(date);
        const month = date.toLocaleDateString("th-TH", { month: "long" });
        const year = date.toLocaleDateString("th-TH", { year: "numeric" });
        const key = `${month}-${year}`;
        if (!monthYearMap.has(key)) {
          monthYearMap.set(key, {
            month,
            monthAbbr: monthAbbr[month] || month,
            year,
          });
        }
      }
    }

    if (dates.length === 0) {
      return "";
    }

    if (dates.length === 1) {
      const date = dates[0];
      return date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    if (monthYearMap.size === 1) {
      const [monthYear] = monthYearMap.values();
      const sortedDays = dates.map((d) => d.getDate()).sort((a, b) => a - b);

      if (sortedDays.length === 2) {
        return `${sortedDays[0]} และ ${sortedDays[1]} ${monthYear.monthAbbr}`;
      }

      const lastDay = sortedDays.pop();
      const otherDays = sortedDays.join(", ");
      return `${otherDays} และ ${lastDay} ${monthYear.monthAbbr}`;
    }

    return dates
      .map((date) =>
        date.toLocaleDateString("th-TH", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      )
      .join(", ");
  } catch {
    return "";
  }
}

export function formatDateShort(dateString: string): string {
  try {
    if (dateString.includes("256")) {
      const slashMatch = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      if (slashMatch) {
        const day = parseInt(slashMatch[1]);
        const month = parseInt(slashMatch[2]);
        const year = slashMatch[3];

        const thaiMonths = [
          "มกราคม",
          "กุมภาพันธ์",
          "มีนาคม",
          "เมษายน",
          "พฤษภาคม",
          "มิถุนายน",
          "กรกฎาคม",
          "สิงหาคม",
          "กันยายน",
          "ตุลาคม",
          "พฤศจิกายน",
          "ธันวาคม",
        ];

        return `${day} ${thaiMonths[month - 1]} ${year}`;
      }
      return dateString;
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }

    const day = date.getDate();
    const month = date.toLocaleDateString("th-TH", { month: "long" });
    const year = date.getFullYear() + 543;

    return `${day} ${month} ${year}`;
  } catch {
    return "";
  }
}
