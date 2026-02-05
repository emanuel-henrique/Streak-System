import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { differenceInDays } from "date-fns";
import { storage } from "./utils/storage";

export default function App() {
  const [date, setDate] = useState();
  const [streak, setStreak] = useState(0);

  function handleClick() {
    const today = new Date();

    const isFirstCheckIn = storage.get("from");

    if (!isFirstCheckIn) {
      setDate({ from: today, to: null });
      storage.set("from", today.getTime());
      storage.set("streakDays", 1);
      return setStreak(1);
    }

    const fromDate = new Date(+storage.get("from"));
    const streakDays = differenceInDays(today, fromDate) + 1;

    setDate((prev) => ({ ...prev, to: today }));
    setStreak(streakDays);
    storage.set("to", today.getTime());
    storage.set("streakDays", streakDays);
  }

  useEffect(() => {
    const fromTimestamp = storage.get("from");
    const toTimestamp = storage.get("to");

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
