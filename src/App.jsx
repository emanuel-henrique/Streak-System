import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";

export default function App() {
  const [date, setDate] = useState();

  function handleClick() {
    const today = new Date();

    if (!localStorage.getItem("@streakCalendar:from")) {
      localStorage.setItem("@streakCalendar:from", today.getTime());
      return setDate({ from: today, to: null });
    }

    setDate((prev) => ({ ...prev, to: today }));

    localStorage.setItem("@streakCalendar:to", today.getTime());
  }

  useEffect(() => {
    const fromTimestamp = localStorage.getItem("@streakCalendar:from");
    const toTimestamp = localStorage.getItem("@streakCalendar:to");

    if (fromTimestamp) {
      const fromDate = new Date(+fromTimestamp);
      const toDate = toTimestamp ? new Date(+toTimestamp) : null;

      setDate({
        from: fromDate,
        to: toDate,
      });
    }
  }, []);

  return (
    <div className="h-dvh flex flex-col items-center pt-20">
      <h1 className="text-3xl mb-5">Streak System</h1>

      <Calendar
        mode="range"
        locale={ptBR}
        className="[--cell-size:4rem]"
        selected={date}
        onSelect={setDate}
      />
      <Button
        className="mt-5 cursor-pointer text-xl p-6"
        variant="outline"
        onClick={handleClick}
      >
        Check-In
      </Button>
    </div>
  );
}
