export interface SocialLink {
  id: string
  outlet: string
  platform: 'instagram' | 'facebook' | 'google_map'
  url: string
  label: string
}

export const socialLinks: SocialLink[] = [
  // Stone Oven India (Main)
  { id: 'india-instagram', outlet: 'India', platform: 'instagram', url: 'https://www.instagram.com/stoneovenindia/', label: 'Instagram' },
  { id: 'india-facebook', outlet: 'India', platform: 'facebook', url: 'https://www.facebook.com/StoneOvenIndia/', label: 'Facebook' },

  // Stone Oven Boisar
  { id: 'boisar-instagram', outlet: 'Boisar', platform: 'instagram', url: 'https://www.instagram.com/stoneoven_boisar/', label: 'Instagram' },
  { id: 'boisar-facebook', outlet: 'Boisar', platform: 'facebook', url: 'https://www.facebook.com/stoneovenboisar/', label: 'Facebook' },
  { id: 'boisar-map', outlet: 'Boisar', platform: 'google_map', url: 'https://maps.app.goo.gl/VExXpmDYZBSGBBBh9', label: 'Google Map' },

  // Stone Oven Palghar
  { id: 'palghar-instagram', outlet: 'Palghar', platform: 'instagram', url: 'https://www.instagram.com/stoneovenpalghar/', label: 'Instagram' },
  { id: 'palghar-facebook', outlet: 'Palghar', platform: 'facebook', url: 'https://www.facebook.com/StoneOvenPalghar/', label: 'Facebook' },
  { id: 'palghar-map', outlet: 'Palghar', platform: 'google_map', url: 'https://maps.app.goo.gl/zTwLHfX3wNAJdhR29', label: 'Google Map' },

  // Stone Oven Virar
  { id: 'virar-instagram', outlet: 'Virar', platform: 'instagram', url: 'https://www.instagram.com/stoneovenvirar/', label: 'Instagram' },
  { id: 'virar-facebook', outlet: 'Virar', platform: 'facebook', url: 'https://www.facebook.com/stoneovenvirar/', label: 'Facebook' },
  { id: 'virar-map', outlet: 'Virar', platform: 'google_map', url: 'https://maps.app.goo.gl/6r2wkPVLqkVGY68E9', label: 'Google Map' },

  // Stone Oven Vasai
  { id: 'vasai-instagram', outlet: 'Vasai', platform: 'instagram', url: 'https://www.instagram.com/stoneovenvasai/', label: 'Instagram' },
  { id: 'vasai-facebook', outlet: 'Vasai', platform: 'facebook', url: 'https://www.facebook.com/p/Stone-Oven-Vasai-61573853397341/', label: 'Facebook' },
  { id: 'vasai-map', outlet: 'Vasai', platform: 'google_map', url: 'https://maps.app.goo.gl/7ApqJNWNuG4B5Ne18', label: 'Google Map' },
]

export function getSocialById(id: string): SocialLink | undefined {
  return socialLinks.find((link) => link.id === id)
}

export function getSocialByOutlet(outlet: string): SocialLink[] {
  return socialLinks.filter((link) => link.outlet.toLowerCase() === outlet.toLowerCase())
}

const platformIcons: Record<SocialLink['platform'], string> = {
  instagram: '📸',
  facebook: '👥',
  google_map: '📍',
}

const outlets = ['Boisar', 'Palghar', 'Virar', 'Vasai']

export default function SocialPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-secondary mb-1">Find Us Online</h1>
      <p className="text-sm text-secondary-light mb-6">Follow Stone Oven on social media</p>

      <div className="space-y-6">
        {outlets.map((outlet) => {
          const links = getSocialByOutlet(outlet)
          return (
            <div key={outlet} className="bg-white rounded-xl p-4 shadow-sm">
              <h2 className="font-bold text-secondary mb-3">Stone Oven {outlet}</h2>
              <div className="flex flex-wrap gap-3">
                {links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-neutral-light rounded-lg text-sm font-medium text-secondary hover:text-[#E88C3A] hover:border-[#E88C3A] transition-colors"
                  >
                    <span>{platformIcons[link.platform]}</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
