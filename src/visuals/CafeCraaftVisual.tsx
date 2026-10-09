export default function CafeCraaftVisual() {
  return (
    <div className="cc-visual">
      <div className="browser">
        <div className="browser__bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>cafe-craaft.vercel.app</span>
        </div>
        <img src="/images/cafecraaft.webp" srcSet="/images/cafecraaft-800.webp 800w, /images/cafecraaft.webp 1440w" sizes="(max-width: 899px) 90vw, 50vw" width={1440} height={900} loading="lazy" decoding="async" alt="Screenshot of the Café Craaft home page: “Beautiful websites, built for businesses that serve great food”" />
      </div>
      <div className="phone">
        <img src="/images/cafecraaft-mobile.webp" width={390} height={844} loading="lazy" decoding="async" alt="The same Café Craaft page on a phone" />
      </div>
    </div>
  )
}
