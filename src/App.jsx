import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { differenceInDays } from "date-fns";

export default function App() {
  const [date, setDate] = useState();
  const [streak, setStreak] = useState(0);

  function handleClick() {
    const today = new Date();

    if (!localStorage.getItem("@streakCalendar:from")) {
      setDate({ from: today, to: null });
      localStorage.setItem("@streakCalendar:from", today.getTime());
      localStorage.setItem("@streakCalendar:streakDays", 1);
      return setStreak(1);
    }

    const fromDate = new Date(+localStorage.getItem("@streakCalendar:from"));
    const streakDays = differenceInDays(today, fromDate) + 1;

    setDate((prev) => ({ ...prev, to: today }));
    setStreak(streakDays);
    localStorage.setItem("@streakCalendar:to", today.getTime());
    localStorage.setItem("@streakCalendar:streakDays", streakDays);
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

      const streakDays = toDate ? differenceInDays(toDate, fromDate) + 1 : 1;
      setStreak(streakDays);
    }
  }, []);

  return (
    <div className="h-dvh flex flex-col items-center pt-20">
      <h1 className="text-3xl mb-5">Streak System</h1>
      <p className="text-xl mb-3 font-semibold">
        🔥 {streak} {streak === 1 ? "dia" : "dias"}
      </p>
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
