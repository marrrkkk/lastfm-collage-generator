'use client'

import { useEffect, useRef } from 'react'
import { CollageData } from '@/types/lastfm'

interface CollageProps {
  data: CollageData[]
  size: string
  showTitle: boolean
  showPlaycount: boolean
}

export default function Collage({ data, size, showTitle, showPlaycount }: CollageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (canvasRef.current) {
        const [rows, cols] = size.split('x').map(Number)
        const baseImageSize = 300
        const canvasWidth = cols * baseImageSize
        const canvasHeight = rows * baseImageSize

        const canvas = canvasRef.current
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        const ctx = canvas.getContext('2d')

        if (!ctx) return

        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'

        const drawImage = (item: CollageData, index: number) => {
          const x = (index % cols) * baseImageSize
          const y = Math.floor(index / cols) * baseImageSize

          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.src = item.image[item.image.length - 1]['#text'] || `/placeholder.svg?height=${baseImageSize}&width=${baseImageSize}`
          img.onload = () => {
            ctx.drawImage(img, x, y, baseImageSize, baseImageSize)

            if (showTitle || showPlaycount) {
              ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
              ctx.fillRect(x, y + baseImageSize - 60, baseImageSize, 60)

              ctx.fillStyle = 'white'
              ctx.textBaseline = 'middle'
              ctx.textAlign = 'left'

              ctx.imageSmoothingEnabled = true
              ctx.imageSmoothingQuality = 'high'

              if (showTitle) {
                const title = `${item.name} - ${item.artist.name}`
                const maxWidth = baseImageSize - 10

                ctx.font = '600 16px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                
                const titleWidth = ctx.measureText(title).width
                
                if (titleWidth > maxWidth) {
                  let truncatedTitle = title
                  while (ctx.measureText(truncatedTitle + '...').width > maxWidth && truncatedTitle.length > 0) {
                    truncatedTitle = truncatedTitle.slice(0, -1)
                  }
                  truncatedTitle += '...'
                  ctx.fillText(truncatedTitle, x + 5, y + baseImageSize - 40, maxWidth)
                } else {
                  ctx.fillText(title, x + 5, y + baseImageSize - 40, maxWidth)
                }
              }

              if (showPlaycount) {
                ctx.font = '14px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                ctx.fillText(`Plays: ${item.playcount}`, x + 5, y + baseImageSize - 20, baseImageSize - 10)
              }
            }
          }
        }

        data.forEach(drawImage)
      }
    })
  }, [data, size, showTitle, showPlaycount])

  return (
    <div className="collage-container">
      <canvas ref={canvasRef} className="collage-canvas" />
    </div>
  )
}

