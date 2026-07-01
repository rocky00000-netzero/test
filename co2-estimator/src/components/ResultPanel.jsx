import { Tile } from '@carbon/react'
import { SimpleBarChart } from '@carbon/charts-react'
import '@carbon/charts-react/styles.css'

function ResultSummary({ results }) {
  const items = [
    { label: '🐄 家畜からの排出', value: results.livestock },
    { label: '🌿 肥料からの排出', value: results.fertilizer },
    { label: '🌍 合計排出量', value: results.total, highlight: true },
  ]

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
      {items.map(({ label, value, highlight }) => (
        <Tile
          key={label}
          style={{
            flex: '1 1 180px',
            background: highlight ? '#0f62fe' : undefined,
            color: highlight ? '#fff' : undefined,
          }}
        >
          <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>{label}</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {value.toLocaleString('ja-JP')}
          </p>
          <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>kg CO₂e / 年</p>
        </Tile>
      ))}
    </div>
  )
}

function ResultChart({ results }) {
  const data = [
    { group: '家畜', value: results.livestock },
    { group: '肥料', value: results.fertilizer },
  ]

  const options = {
    title: '排出源別 CO₂e 排出量',
    axes: {
      left: {
        mapsTo: 'value',
        title: 'kg CO₂e / 年',
      },
      bottom: {
        mapsTo: 'group',
        scaleType: 'labels',
      },
    },
    height: '300px',
    theme: 'white',
  }

  return <SimpleBarChart data={data} options={options} />
}

export default function ResultPanel({ results }) {
  if (!results) return null

  return (
    <div>
      <h4 style={{ marginBottom: '1rem' }}>📊 推定結果</h4>
      <ResultSummary results={results} />
      <ResultChart results={results} />
    </div>
  )
}
