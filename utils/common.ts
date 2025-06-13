export const getLast7Days = () =>{
    const daysOfWeek = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const result =[];
    for (let i =6; i >= 0; i--)
    {
        const date = new Date();
        date.setDate(date.getDate()-i);
        result.push({
            day: daysOfWeek[date.getDay()],
            date: date.toISOString().split("T")[0],
            income:0,
            expense:0,
        });
    }
    return result.reverse();
}

export const convertDate = (inputDate: string) => {
  const [year, month, day] = inputDate.split('-');
  return `${day}/${month}/${year}`;
};

export const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatCurrency = (text:string) => {
    const cleaned = text.replace(/[^0-9]/g, ""); // Remove non-numeric
    if (!cleaned) return "";

    // Convert to a number and format with commas
    return parseFloat(cleaned)
      .toLocaleString("en-US", { style: "decimal", minimumFractionDigits: 0 });
  };


 export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  //const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 24 || 0;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  return `${formattedHours}:${formattedMinutes}`;
  };