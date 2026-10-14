import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Minus, Plus } from 'lucide-react'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

export default function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find((p) => p.id === id)
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-5 py-24 text-center">
        <p className="text-muted">Producto no encontrado.</p>
        <Link to="/tienda" className="text-accent underline mt-3 inline-block">Volver a la tienda</Link>
      </div>
    )
  }

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-20">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink mb-8">
        <ArrowLeft size={16} /> Volver
      </button>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="rounded-[2rem] overflow-hidden bg-bg aspect-[4/5]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted">{product.origin}</p>
          <h1 className="mt-3 font-serif text-5xl">{product.name}</h1>
          <p className="mt-4 text-muted leading-relaxed">
            Un café de especialidad con notas de {product.notes.join(', ').toLowerCase()}.
            Ideal para tomar solo o con leche. Tueste {product.roast.toLowerCase()}.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {product.notes.map((n) => (
              <span key={n} className="text-xs px-3 py-1 rounded-full bg-bg text-muted">{n}</span>
            ))}
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div className="border-t border-line pt-3">
              <dt className="text-muted">Tueste</dt>
              <dd className="font-medium mt-0.5">{product.roast}</dd>
            </div>
            <div className="border-t border-line pt-3">
              <dt className="text-muted">Formato</dt>
              <dd className="font-medium mt-0.5">{product.type}</dd>
            </div>
            <div className="border-t border-line pt-3">
              <dt className="text-muted">Peso</dt>
              <dd className="font-medium mt-0.5">{product.weight}</dd>
            </div>
            <div className="border-t border-line pt-3">
              <dt className="text-muted">Origen</dt>
              <dd className="font-medium mt-0.5">{product.origin}</dd>
            </div>
          </dl>

          <div className="mt-10 flex items-center gap-6">
            <p className="font-serif text-4xl">€{product.price.toFixed(2)}</p>
            <div className="flex items-center gap-3 border border-line rounded-full px-3 py-2">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-1 hover:text-accent"><Minus size={16} /></button>
              <span className="w-6 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-1 hover:text-accent"><Plus size={16} /></button>
            </div>
          </div>

          <button
            onClick={() => addItem(product, qty)}
            className="mt-6 w-full md:w-auto px-10 py-4 rounded-full bg-accent text-cream font-medium hover:opacity-90 transition"
          >
            Añadir al carrito — €{(product.price * qty).toFixed(2)}
          </button>
        </div>
      </div>
    </section>
  )
}
