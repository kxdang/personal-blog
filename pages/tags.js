import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Tags() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/blog')
  }, [router])

  return null
}
