import { open } from '@tauri-apps/api/dialog'
import { readTextFile } from '@tauri-apps/api/fs'
import { Command } from '@tauri-apps/api/shell'
import * as CryptoJs from 'crypto-js'

export const encryptWithAES = (text: string): string => {
  return CryptoJs.AES.encrypt(text, import.meta.env.VITE_PASSPHRASE).toString()
}

export const decryptWithAES = (ciphertext: string): string => {
  const bytes = CryptoJs.AES.decrypt(ciphertext, import.meta.env.VITE_PASSPHRASE)
  const originalText = bytes.toString(CryptoJs.enc.Utf8)
  return originalText
}

export function enumKeys (obj: any): string[] {
  return Object.keys(obj).filter(k => !Number.isNaN(Number(k)))
}

export function classNames (...classes: any): any {
  return classes.filter(Boolean).join(' ')
}

export async function openReadTextFile (): Promise<string | undefined> {
  const selected = await open({
    multiple: false,
    filters: [
      {
        name: 'Text',
        extensions: ['txt']
      }
    ]
  })
  if (Array.isArray(selected)) {
    // Selected multiple files
  } else if (selected === null) {
    // Cancelled the selection
  } else {
    return await readTextFile(selected)
  }
}

export async function getUUID (): Promise<string[]> {
  const command = new Command('system_profiler', 'SPHardwareDataType')
  const res = await command.execute()
  const array = [...res.stdout.matchAll(/Hardware UUID: (.+)/g)]
  return array.map((m) => m[1])
}

export function shuffleArray (array: any[]): any[] {
  let currentIndex = array.length
  let randomIndex
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }
  return array
}
