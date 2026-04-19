import FingerprintJS from '@fingerprintjs/fingerprintjs'

let fpPromise: ReturnType<typeof FingerprintJS.load> | null = null

const initFingerprint = () => {
  if (!fpPromise) {
    fpPromise = FingerprintJS.load()
  }
  return fpPromise
}

export const getDeviceFingerprint = async (): Promise<string> => {
  try {
    const fp = await initFingerprint()
    const result = await fp.get()
    return result.visitorId
  } catch {
    return `fallback-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`
  }
}
