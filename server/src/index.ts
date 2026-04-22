import 'dotenv/config'
import dns from 'dns'

// Override DNS to use Google DNS (8.8.8.8) since local DNS doesn't resolve *.supabase.co
dns.setDefaultResultOrder('ipv4first')
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1'])

import { createApp } from './app'

const PORT = parseInt(process.env.PORT ?? '8080', 10)

const app = createApp()

app.listen(PORT, () => {
  console.log(`🍕 StoneOven server running on http://localhost:${PORT}`)
  console.log(`   Health: http://localhost:${PORT}/api/health`)
})
