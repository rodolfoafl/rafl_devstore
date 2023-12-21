'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push('/')}
      type="button"
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-transparent border border-zinc-400 font-semibold text-white hover:bg-zinc-800"
    >
      Voltar
    </button>
  )
}
