import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products, roastLevels, types } from '../data/products'

export default function Shop() {
  const [searchParams] = useSearchParams()
  const [roast, setRoast] = useState(searchParams.get('roast') || 'Todos')
  const [type, setType] = useState('Todos')

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (roast !== 'Todos' && p.roast !== roast) return false
      if (type !== 'Todos' && p.type !== type) return false
      return true
    })
  }, [roast, type])

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-muted">Tienda</p>
        <h1 className="mt-3 font-serif text-5xl">Todos los cafés</h1>
        <p className="mt-3 text-muted max-w-xl">
          {filtered.length} cafés disponibles. Filtra por tueste o formato para encontrar el tuyo.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted mb-2">Tueste</p>
          <div className="flex flex-wrap gap-2">
            {roastLevels.map((r) => (
              <button
                key={r}
                onClick={() => setRoast(r)}
                className={`px-4 py-1.5 rounded-full text-sm border transition ${
                  roast === r
                    ? 'bg-ink text-cream border-ink'
                    : 'border-line text-ink/70 hover:border-ink'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted mb-2">Formato</p>
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-1.5 rounded-full text-sm border transition ${
                  type === t
                    ? 'bg-ink text-cream border-ink'
                    : 'border-line text-ink/70 hover:border-ink'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted py-20">No hay cafés con estos filtros.</p>
      )}
    </section>
  )
}
