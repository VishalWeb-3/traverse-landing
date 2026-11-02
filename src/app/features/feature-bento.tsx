type FeatureCardData = {
  title: string;
  description: string;
};

function FeatureVisual({ kind }: { kind: number }) {
  if (kind === 0) return <div className="bento-scan" aria-hidden="true">
    <div className="bento-scan-window">
      <div className="bento-window-top"><i /><i /><i /></div>
      <div className="bento-address"><span className="bento-link-mark">↗</span><span>short-link.example / verify</span></div>
      <div className="bento-scan-status"><span /> Checking destination</div>
      <div className="bento-scan-sweep" />
    </div>
    <div className="bento-scan-orbit"><i /><i /><i /></div>
  </div>;

  if (kind === 1) return <div className="bento-globe" aria-hidden="true">
    <svg viewBox="0 0 520 270" fill="none">
      <ellipse cx="260" cy="135" rx="105" ry="105" />
      <ellipse cx="260" cy="135" rx="48" ry="105" />
      <ellipse cx="260" cy="135" rx="105" ry="38" />
      <path d="M160 100c45 24 157 24 201 0M160 170c45-24 157-24 201 0" />
      <path className="bento-globe-route" d="M185 151c19-89 103-91 144-30 23 34-6 71-51 58-34-10-42-51-11-72" />
      <circle className="bento-node" cx="185" cy="151" r="5" />
      <circle className="bento-node" cx="329" cy="121" r="5" />
      <circle className="bento-node" cx="267" cy="107" r="5" />
    </svg>
  </div>;

  if (kind === 2) return <div className="bento-leaks" aria-hidden="true">
    <div className="bento-leak-device"><i /><i /><i /></div>
    <div className="bento-leak-tunnel"><span /><span /><span /></div>
    <div className="bento-leak-gate"><i /><i /><i /></div>
    <svg viewBox="0 0 360 80" fill="none"><path d="M0 40h360" /><path d="M0 40h360" className="bento-leak-pulse" /></svg>
  </div>;

  if (kind === 3) return <div className="bento-controls" aria-hidden="true">
    <div className="bento-control-card bento-control-card--back"><span /><i /><i /><i /></div>
    <div className="bento-control-card bento-control-card--front"><span /><b /><i /><i /></div>
    <div className="bento-control-shield"><svg viewBox="0 0 36 42" fill="none"><path d="M18 2 32 7v11c0 10-5.4 17-14 22C9.4 35 4 28 4 18V7z"/><path d="m12 20 4 4 8-9"/></svg></div>
  </div>;

  return <div className="bento-bandwidth" aria-hidden="true">
    <div className="bento-speed-lines"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
    <svg viewBox="0 0 460 150" fill="none"><path className="bento-speed-trace" d="M4 115c35 0 32-24 62-24s28 38 57 38 31-72 63-72 27 52 59 52 26-75 58-75 29 58 58 58 30-42 95-42" /></svg>
  </div>;
}

export default function FeatureBento({ features }: { features: FeatureCardData[] }) {
  return <div className="feature-bento-grid" aria-label="Traverse VPN feature highlights">
    {features.slice(0, 5).map((feature, index) => <article
      key={feature.title}
      className={`feature-bento-card${index < 2 ? " feature-bento-card--large" : ""}`}
      data-feature-bento-card
    >
      <span className="feature-bento-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <div className={`feature-bento-visual feature-bento-visual--${index + 1}`}>
        <FeatureVisual kind={index} />
      </div>
      <div className="feature-bento-copy">
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    </article>)}
  </div>;
}
