import { getSocialByOutlet } from '@/components/social/socialpage'

export interface OutletConfig {
  id: string
  name: string
  location: string
  hasMenu: boolean
  mapLink: string
  instagram: string | null
  facebook: string | null
}

function build(key: string, name: string, location: string, hasMenu: boolean): OutletConfig {
  const links = getSocialByOutlet(key)
  return {
    id: key,
    name,
    location,
    hasMenu,
    mapLink: links.find((l) => l.platform === 'google_map')?.url ?? '',
    instagram: links.find((l) => l.platform === 'instagram')?.url ?? null,
    facebook: links.find((l) => l.platform === 'facebook')?.url ?? null,
  }
}

export const outletConfig: Record<string, OutletConfig> = {
  boisar:  build('Boisar',  'Stone Oven Boisar',  'Boisar, Palghar, Maharashtra',  true),
  palghar: build('Palghar', 'Stone Oven Palghar', 'Palghar, Maharashtra',           false),
  virar:   build('Virar',   'Stone Oven Virar',   'Virar, Palghar, Maharashtra',    false),
  vasai:   build('Vasai',   'Stone Oven Vasai',   'Vasai, Palghar, Maharashtra',    false),
}
