'use client';

import { useEffect, useState } from 'react';

/**
 * Detecta si la pantalla es de tamaño móvil mediante matchMedia.
 * Devuelve false en el primer render (servidor) y se actualiza en el cliente.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [breakpoint]);

  return isMobile;
}
