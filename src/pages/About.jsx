export default function About() {
  return (
    <section className="max-w-3xl mx-auto px-5 md:px-8 py-20">
      <p className="text-xs uppercase tracking-[0.25em] text-muted">Nosotros</p>
      <h1 className="mt-4 font-serif text-5xl">Café honesto, tostado con calma.</h1>
      <div className="mt-8 space-y-6 text-muted leading-relaxed">
        <p>
          Café Aroma nace de una idea simple: el buen café no necesita ruido. Trabajamos directo con
          productores de Etiopía, Colombia, Kenia y Centroamérica, pagando por encima del mercado
          justo y seleccionando solo lotes con puntuación SCA superior a 84.
        </p>
        <p>
          Tostamos en pequeños lotes cada semana en nuestro obrador en Madrid. Nuestro objetivo es
          que cada bolsa llegue a tu casa con menos de 14 días desde el tueste. Sin prisas, sin
          atajos.
        </p>
        <p>
          Minimalista en el método, generoso en sabor. Esa es nuestra promesa.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-6 text-center">
        {[
          { n: '12+', l: 'Orígenes' },
          { n: '48h', l: 'Envío' },
          { n: '84+', l: 'Puntos SCA' },
        ].map((s) => (
          <div key={s.l} className="border-t border-line pt-4">
            <p className="font-serif text-4xl">{s.n}</p>
            <p className="text-xs text-muted mt-1">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
