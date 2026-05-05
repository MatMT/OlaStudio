"use client";

import { useState } from "react";

export function useNavbar() {
  const [logoClicks, setLogoClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (logoClicks < 5) {
      const next = logoClicks + 1;
      setLogoClicks(next);
      if (next === 5) {
        setShowEasterEgg(true);
        e.preventDefault();
      }
    }
  };

  return { showEasterEgg, setShowEasterEgg, handleLogoClick };
}
