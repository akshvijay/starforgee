// Shared mutable state read by the 3D scene every frame (no React re-renders).
export const scrollState = { p: 0, mx: 0, my: 0 }

export function bindInput() {
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight
    scrollState.p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0
  }
  const onMove = e => {
    scrollState.mx = (e.clientX / innerWidth - 0.5) * 2
    scrollState.my = -(e.clientY / innerHeight - 0.5) * 2
  }
  onScroll()
  addEventListener('scroll', onScroll, { passive: true })
  addEventListener('resize', onScroll)
  addEventListener('pointermove', onMove)
  return () => {
    removeEventListener('scroll', onScroll)
    removeEventListener('resize', onScroll)
    removeEventListener('pointermove', onMove)
  }
}
