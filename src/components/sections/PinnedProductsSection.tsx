import { useEffect, useRef, useState } from 'react'

export function PinnedProductsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  const products = [
    { name: 'Masque Baoulé ébène', artisan: 'Kofi Asante', price: '45 000', category: 'Sculpture', badge: 'COUP DE COEUR', accent: '#8B3A0F',
      image: 'https://picsum.photos/seed/asp-masque/800/1000',
      fallback: 'https://placehold.co/800x1000/8B3A0F/FFDCB4/png?text=Masque+Baoul%C3%A9' },
    { name: 'Panier Abissa', artisan: 'Aya Coulibaly', price: '18 000', category: 'Tressage', badge: '', accent: '#2D4A2D',
      image: 'https://picsum.photos/seed/asp-panier/800/1000',
      fallback: 'https://placehold.co/800x1000/2D4A2D/FFDCB4/png?text=Panier+Abissa' },
    { name: 'Vase Sénoufo', artisan: 'Fatou Diallo', price: '28 500', category: 'Poterie', badge: 'NOUVEAU', accent: '#8B3A0F',
      image: 'https://picsum.photos/seed/asp-vase/800/1000',
      fallback: 'https://placehold.co/800x1000/8B3A0F/FFDCB4/png?text=Vase+S%C3%A9noufo' },
    { name: 'Village crépuscule', artisan: 'Abou Koné', price: '65 000', category: 'Peinture', badge: '', accent: '#2D4A2D',
      image: 'https://picsum.photos/seed/asp-village/800/1000',
      fallback: 'https://placehold.co/800x1000/2D4A2D/FFDCB4/png?text=Village' },
    { name: 'Statue Dan', artisan: 'Kofi Asante', price: '72 000', category: 'Sculpture', badge: 'PIECE RARE', accent: '#8B1A1A',
      image: 'https://picsum.photos/seed/asp-statue/800/1000',
      fallback: 'https://placehold.co/800x1000/8B1A1A/FFDCB4/png?text=Statue+Dan' },
  ]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return
    let rafId: number
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const section = sectionRef.current
        const track = trackRef.current
        if (!section || !track) return
        const rect = section.getBoundingClientRect()
        const scrollY = window.scrollY || window.pageYOffset
        const sectionTop = scrollY + rect.top
        const viewportHeight = window.innerHeight
        const sectionHeight = section.offsetHeight - viewportHeight
        const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth + 100)
        if (scrollY < sectionTop) {
          track.style.transform = 'translate3d(0px, 0, 0)'
        } else if (scrollY > sectionTop + sectionHeight) {
          track.style.transform = `translate3d(${-maxTranslate}px, 0, 0)`
        } else {
          const progress = (scrollY - sectionTop) / sectionHeight
          track.style.transform = `translate3d(${-progress * maxTranslate}px, 0, 0)`
        }
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile])

  if (isMobile) {
    return (
      <section className="py-16 px-6">
        <p className="text-[10px] uppercase tracking-widest text-stone-600 mb-1">NOS CRÉATIONS</p>
        <h2 className="text-3xl italic font-serif mb-8">Pièces Phares</h2>
        <div className="flex gap-4 overflow-x-auto -mx-6 px-6 pb-4 snap-x">
          {products.map((p, i) => (
            <div key={i} className="flex-shrink-0 w-64 snap-center rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src={p.image}
                onError={(e) => { (e.target as HTMLImageElement).src = p.fallback }}
                alt={p.name}
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="p-4">
                <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: p.accent }}>{p.category}</p>
                <h3 className="text-base italic font-serif">{p.name}</h3>
                <p className="text-[10px] text-stone-600 mt-1">{p.artisan}</p>
                <p className="text-lg font-serif mt-2" style={{ color: '#99420d' }}>{p.price} FCFA</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative" style={{ height: '400vh', background: '#fcf9f4' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="px-8 mb-8 flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-stone-600 mb-1">NOS CRÉATIONS · COUP DE COEUR</p>
            <h2 className="text-3xl italic font-serif">
              Pièces <span style={{ color: '#99420d' }}>Phares</span>
            </h2>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-stone-600">Faites défiler →</p>
        </div>

        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '24px',
            paddingLeft: '32px',
            paddingRight: '32px',
            width: 'max-content',
            willChange: 'transform',
            transition: 'transform 0.05s linear',
          }}
        >
          {products.map((p, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: '320px',
                marginTop: i % 2 === 0 ? '0' : '40px',
                background: '#ffffff',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(14,13,13,0.12)',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#f0ede9' }}>
                <img
                  src={p.image}
                  onError={(e) => { (e.target as HTMLImageElement).src = p.fallback }}
                  alt={p.name}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.95) sepia(0.1)' }}
                />
                {p.badge && (
                  <div style={{
                    position: 'absolute', top: '16px', left: '16px',
                    background: 'rgba(252,249,244,0.85)', backdropFilter: 'blur(12px)',
                    padding: '6px 12px', borderRadius: '9999px',
                    fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em',
                    color: '#99420d', textTransform: 'uppercase',
                  }}>
                    {p.badge}
                  </div>
                )}
              </div>
              <div style={{ padding: '20px' }}>
                <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em', color: p.accent, marginBottom: '4px' }}>
                  {p.category}
                </p>
                <h3 style={{ fontSize: '18px', fontStyle: 'italic', fontFamily: 'Noto Serif, serif', lineHeight: 1.2 }}>
                  {p.name}
                </h3>
                <p style={{ fontSize: '10px', color: '#56433a', marginTop: '4px' }}>{p.artisan}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                  <span style={{ fontSize: '20px', fontFamily: 'Noto Serif, serif', color: '#99420d' }}>
                    {p.price} FCFA
                  </span>
                  <button style={{
                    width: '40px', height: '40px', borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #99420d, #b95925)',
                    color: 'white', fontSize: '18px', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: 'none', cursor: 'pointer',
                  }}>
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div style={{ flexShrink: 0, width: '64px' }} />
        </div>
      </div>
    </section>
  )
}