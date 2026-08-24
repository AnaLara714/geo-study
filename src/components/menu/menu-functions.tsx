'use client'
import { MapMode } from "@/types/map";
import { Button } from "../ui/button";

interface MenuFunctionsProps {
  activeMode: MapMode;
  setActiveMode: (mode: MapMode) => void;
  drawEnable: boolean;
}

export default function MenuFunctions({ activeMode, setActiveMode, drawEnable }: MenuFunctionsProps) {

  const toggleMode = (mode: MapMode) => {
    setActiveMode(activeMode === mode ? 'none' : mode);
  };

  return (
    <div className='absolute top-2 right-20 space-x-2 z-10'>
      <Button
        className='shadow-xl w-30 cursor-pointer'
        type='button'
        variant={activeMode === 'location' ? "default" : "secondary"}
        onClick={() => toggleMode('location')}
      >
        Localização
      </Button>

      <Button
        className='shadow-xl w-30 cursor-pointer'
        type='button'
        variant={activeMode === 'draw' ? "default" : "secondary"}
        onClick={() => toggleMode('draw')}
        disabled={drawEnable}
      >
        Relação
      </Button>

      <Button
        className='shadow-xl w-30 cursor-pointer'
        type='button'
        variant={activeMode === 'zone' ? "default" : "secondary"}
        onClick={() => toggleMode('zone')}
      >
        Zonas
      </Button>
    </div>
  );
}