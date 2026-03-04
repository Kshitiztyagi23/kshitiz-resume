'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulseOffset: number
  color: string
  label?: string
}

const LABELS = [
  'AI', 'ML', 'CNN', 'RNN', 'LSTM', 'GPT', 'GAN',
  'Neuron', 'Synapse', 'Cortex', 'Dendrite', 'Axon',
  'fMRI', 'EEG', 'BCI', 'DNN', 'RL', 'NLP',
  'Attention', 'Backprop', 'Gradient', 'Hebbian',
]

const COLORS = [
  'rgba(0,212,255,',    // cyan
  'rgba(139,92,246,',   // purple
  'rgba(0,255,136,',    // green
]

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let nodes: Node[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initNodes()
    }

    const initNodes = () => {
      const count = Math.floor((canvas.width * canvas.height) / 7000)
      nodes = Array.from({ length: Math.min(count, 200) }, (_, i) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() < 0.12 ? 3.5 : Math.random() < 0.3 ? 2.2 : 1.4,
        pulseOffset: Math.random() * Math.PI * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        label: Math.random() < 0.38 ? LABELS[Math.floor(Math.random() * LABELS.length)] : undefined,
      }))
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const time = t * 0.001

      // Update positions
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 200

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28
            // Pulse along connection
            const pulseAlpha = alpha + Math.sin(time * 2 + a.pulseOffset) * alpha * 0.5
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `${a.color}${Math.max(0, Math.min(1, pulseAlpha)).toFixed(3)})`
            ctx.lineWidth = dist < 80 ? 0.8 : 0.4
            ctx.stroke()

            // Travelling signal dot along connection
            const progress = ((time * 0.4 + a.pulseOffset) % 1)
            if (dist < 160 && progress < 0.7) {
              const px = a.x + (b.x - a.x) * progress
              const py = a.y + (b.y - a.y) * progress
              ctx.beginPath()
              ctx.arc(px, py, 1, 0, Math.PI * 2)
              ctx.fillStyle = `${a.color}0.6)`
              ctx.fill()
            }
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = Math.sin(time * 1.8 + node.pulseOffset) * 0.5 + 0.5
        const glowRadius = node.radius + pulse * 3

        // Outer glow
        const grd = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius * 3)
        grd.addColorStop(0, `${node.color}${(0.25 + pulse * 0.15).toFixed(3)})`)
        grd.addColorStop(1, `${node.color}0)`)
        ctx.beginPath()
        ctx.arc(node.x, node.y, glowRadius * 3, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${node.color}${(0.6 + pulse * 0.35).toFixed(3)})`
        ctx.fill()

        // Label
        if (node.label && node.radius > 2) {
          ctx.font = '9px JetBrains Mono, monospace'
          ctx.fillStyle = `${node.color}${(0.35 + pulse * 0.2).toFixed(3)})`
          ctx.fillText(node.label, node.x + node.radius + 4, node.y + 3)
        }
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.75 }}
    />
  )
}
