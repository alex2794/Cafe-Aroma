import { Link } from 'react-router-dom'
import { ShoppingCart, Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product, compact = false }) {
  const { addItem } = useCart()

  return (
    <article className="group relative flex flex-col">
      <Link to={`/producto/${product.id}`} className="block overflow-hidden rounded-2xl bg-bg aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </Link>
      <div className="pt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-muted">{product.origin}</p>
          <h3 className="mt-1 font-serif text-lg leading-tight">{product.name}</h3>
          <p className="mt-1 text-sm text-muted">{product.roast} · {product.type}</p>
          {!compact && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {product.notes.map((n) => (
                <span key={n} className="text-[10px] px-2 py-0.5 rounded-full bg-bg text-muted">{n}</span>
              ))}
            </div>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="font-medium">€{product.price.toFixed(2)}</p>
          <p className="text-xs text-muted">{product.weight}</p>
        </div>
      </div>
      <button
        onClick={() => addItem(product)}
        className="mt-3 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-ink text-cream text-sm font-medium hover:bg-accent transition-colors"
      >
        <Plus size={16} /> Añadir
      </button>
    </article>
  )
}
// unused import guard
void ShoppingCart
