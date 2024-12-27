import { router } from '@inertiajs/react'
import { useState, useEffect } from 'react'

export function usePageLoading() {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        router.on('start', () => setIsLoading(true))
        router.on('finish', () => setIsLoading(false))

        return () => {
            router.off('start', () => setIsLoading(true))
            router.off('finish', () => setIsLoading(false))
        }
    }, [])

    return isLoading
} 