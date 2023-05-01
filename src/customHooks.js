import { useEffect, useState } from "react";

export const useTime = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 0 && hour < 13) {
      setGreeting("Good morning!");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon!");
    } else {
      setGreeting("Good evening!");
    }
  }, []);

  return greeting;
};

export const useConvertCredit = (balance) => {
  const [credit, setCredit] = useState(balance);

  useEffect(() => {
    if (credit === 0) {
      setCredit(0);
    } else {
      setCredit(credit * 0.04);
    }
  }, [balance]);

  return credit;
};
