import { useState } from 'react'

type Role = 'admin' | 'doctor' | 'donor'

const ROLES: Record<Role, { label: string; x: number; actions: string[]; call: string }> = {
  admin: {
    label: 'Admin',
    x: 110,
    call: 'transferDonations()',
    actions: [
      'Registers patients on the contract',
      'Uploads medical certificates to IPFS; only the hash goes on-chain',
      'Moves donations into withdrawable insurance funds',
    ],
  },
  doctor: {
    label: 'Doctor',
    x: 320,
    call: 'withdrawInsurance()',
    actions: ['Reviews and signs a patient’s condition', 'Becomes the doctor responsible for that patient', 'Withdraws insurance funds, for their own patients only'],
  },
  donor: {
    label: 'Donor',
    x: 530,
    call: 'donateAmount()',
    actions: ['Donates directly to a patient from any Ethereum account', 'Each donation is timestamped in the patient’s on-chain history'],
  },
}

/** Interactive architecture of the healthcare fund system: pick a role, see what the contract lets it do. */
export default function ChainDiagram() {
  const [role, setRole] = useState<Role>('donor')
  const r = ROLES[role]
  const path = `M${r.x} 62 V118 M${r.x} 142 L320 196 M320 244 L190 300`
  const motion = `M${r.x} 62 V130 L320 196 V244 L190 300`

  return (
    <div className="chain">
      <div className="chain__roles" role="group" aria-label="Show permissions for a role">
        {(Object.keys(ROLES) as Role[]).map((k) => (
          <button key={k} type="button" aria-pressed={role === k} onClick={() => setRole(k)}>
            {ROLES[k].label}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 640 380" className="chain__svg" role="img" aria-label={`System architecture. ${r.label} requests go through the Django and Web3.py layer to the HealthCareStore smart contract, which records them on the Ethereum ledger. Certificates are stored on IPFS.`}>
        {/* static structure */}
        <g className="chain__dim">
          {(Object.keys(ROLES) as Role[]).map((k) => (
            <path key={k} d={`M${ROLES[k].x} 62 V118`} />
          ))}
          <path d="M320 142 V196 M320 244 L190 300 M480 142 V300" strokeDasharray="3 4" />
        </g>
        <path className="chain__active" d={path} />
        {role === 'admin' && <path className="chain__active" d="M480 142 V300" />}

        {(Object.keys(ROLES) as Role[]).map((k) => (
          <g key={k} className={`chain__node ${role === k ? 'is-on' : ''}`}>
            <rect x={ROLES[k].x - 52} y={28} width={104} height={34} />
            <text x={ROLES[k].x} y={50}>
              {ROLES[k].label}
            </text>
          </g>
        ))}

        <g className="chain__node chain__node--layer">
          <rect x={40} y={118} width={560} height={24} />
          <text x={320} y={134}>
            Django application · Web3.py
          </text>
        </g>
        <g className="chain__node chain__node--contract">
          <rect x={210} y={196} width={220} height={48} />
          <text x={320} y={217}>
            HealthCareStore.sol
          </text>
          <text x={320} y={234} className="chain__call">
            {r.call}
          </text>
        </g>
        <g className="chain__ledger">
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={80 + i * 58} y={300} width={44} height={30} className={i === 3 ? 'is-new' : ''} />
              {i < 3 && <path d={`M${124 + i * 58} 315 h14`} />}
            </g>
          ))}
          <text x={190} y={356}>
            Ethereum ledger (Ganache)
          </text>
        </g>
        <g className={`chain__node ${role === 'admin' ? 'is-on' : ''}`}>
          <rect x={420} y={300} width={120} height={30} />
          <text x={480} y={320}>
            IPFS
          </text>
        </g>
        <circle r="4" className="chain__pulse" key={role}>
          <animateMotion dur="2.4s" repeatCount="indefinite" path={motion} />
        </circle>
      </svg>

      <div className="chain__detail" aria-live="polite">
        <p className="chain__who">{r.label} can</p>
        <ul>
          {r.actions.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
