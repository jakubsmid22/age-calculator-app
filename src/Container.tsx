import { useState } from "react";
import iconArrow from "./assets/images/icon-arrow.svg";

interface Errors {
  day: string | null;
  month: string | null;
  year: string | null;
}

const Container = () => {
  const [result, setResult] = useState({
    years: "--",
    months: "--",
    days: "--",
  });

  const [errors, setErrors] = useState<Errors>({
    day: null,
    month: null,
    year: null,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({
      day: null,
      month: null,
      year: null,
    });

    const date = new Date();
    const data = new FormData(e.target as HTMLFormElement);
    const day = Number(data.get("day"));
    const month = Number(data.get("month"));
    const year = Number(data.get("year"));
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getUTCDate();

    let newErrors: Errors = {
      day: null,
      month: null,
      year: null,
    };

    if (!day) {
      newErrors.day = "This field is required";
    } else if (day < 1 || day > 31) {
      newErrors.day = "Must be a valid day";
    }

    if (!month) {
      newErrors.month = "This field is required";
    } else if (month < 1 || month > 12) {
      newErrors.month = "Must be a valid month";
    }

    if (!year) {
      newErrors.year = "This field is required";
    } else if (
      year > currentYear ||
      (year === currentYear &&
        (month > currentMonth || (month === currentMonth && day > currentDay)))
    ) {
      newErrors.year = "Must be in the past";
    }

    if (newErrors.day || newErrors.month || newErrors.year) {
      setErrors(newErrors);
      return;
    }

    let years = currentYear - year;
    let months = currentMonth - month;
    let days = currentDay - day;

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const prevMonth = new Date(currentYear, currentMonth - 1, 0);
      days += prevMonth.getDate();
      months--;
    }

    setResult({
      years: years.toString(),
      months: months.toString(),
      days: days.toString(),
    });
  };

  return (
    <div className="max-w-[850px] space-y-20 rounded-3xl rounded-br-[120px] bg-white px-7 py-10 md:space-y-10 md:p-14">
      <form onSubmit={submit} className="space-y-20 md:space-y-10">
        <div className="flex w-full gap-5 md:gap-8">
          <div className={`input ${errors.day && "error"}`}>
            <label htmlFor="day">DAY</label>
            <input type="number" placeholder="DD" name="day" id="day" />
            <p>{errors.day}</p>
          </div>

          <div className={`input ${errors.month && "error"}`}>
            <label htmlFor="month">MONTH</label>
            <input type="number" placeholder="MM" name="month" id="month" />
            <p>{errors.month}</p>
          </div>

          <div className={`input ${errors.year && "error"}`}>
            <label htmlFor="year">YEAR</label>
            <input type="number" placeholder="YYYY" name="year" id="year" />
            <p>{errors.year}</p>
          </div>
        </div>

        <div className="relative">
          <hr className="text-smokey-grey/35 w-full" />

          <button
            type="submit"
            className="bg-purple absolute top-[50%] -translate-y-[50%] cursor-pointer rounded-full p-5 max-sm:left-[50%] max-sm:-translate-x-[50%] md:right-0 md:p-7"
          >
            <img src={iconArrow} alt="icon-arrow" className="w-8 md:w-12" />
          </button>
        </div>
      </form>

      <div className="space-y-5 text-6xl font-extrabold italic md:text-8xl">
        <p>
          <span className="text-purple">{result.years}</span> years
        </p>
        <p>
          <span className="text-purple">{result.months}</span> months
        </p>
        <p>
          <span className="text-purple">{result.days}</span> days
        </p>
      </div>
    </div>
  );
};

export default Container;
