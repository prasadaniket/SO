export interface OutletConfig {
  id: string
  name: string
  location: string
  hasMenu: boolean
}

export const outletConfig: Record<string, OutletConfig> = {
  boisar:  { id: 'boisar',  name: 'Stone Oven Boisar',  location: 'Boisar, Palghar, Maharashtra', hasMenu: true  },
  palghar: { id: 'palghar', name: 'Stone Oven Palghar', location: 'Palghar, Maharashtra',          hasMenu: false },
  virar:   { id: 'virar',   name: 'Stone Oven Virar',   location: 'Virar, Palghar, Maharashtra',   hasMenu: false },
  vasai:   { id: 'vasai',   name: 'Stone Oven Vasai',   location: 'Vasai, Palghar, Maharashtra',   hasMenu: false },
}
