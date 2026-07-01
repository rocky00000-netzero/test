import { useState } from 'react'
import {
  NumberInput,
  Select,
  SelectItem,
  Button,
  IconButton,
} from '@carbon/react'
import { Add, TrashCan } from '@carbon/icons-react'
import { LIVESTOCK_LABELS } from '../data/emissionFactors'

const LIVESTOCK_TYPES = Object.keys(LIVESTOCK_LABELS)

function LivestockForm({ rows, onChange }) {
  const handleCountChange = (index, value) => {
    const updated = rows.map((row, i) =>
      i === index ? { ...row, count: value } : row
    )
    onChange(updated)
  }

  const handleTypeChange = (index, value) => {
    const updated = rows.map((row, i) =>
      i === index ? { ...row, type: value } : row
    )
    onChange(updated)
  }

  const handleAdd = () => {
    onChange([...rows, { type: 'cattle', count: 0 }])
  }

  const handleRemove = (index) => {
    onChange(rows.filter((_, i) => i !== index))
  }

  return (
    <div className="livestock-form">
      <p className="cds--label" style={{ marginBottom: '0.5rem' }}>
        家畜の種別と頭数
      </p>
      {rows.map((row, i) => (
        <div
          key={i}
          style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginBottom: '0.75rem' }}
        >
          <Select
            id={`livestock-type-${i}`}
            labelText="種別"
            value={row.type}
            onChange={(e) => handleTypeChange(i, e.target.value)}
            style={{ flex: 1 }}
          >
            {LIVESTOCK_TYPES.map((t) => (
              <SelectItem key={t} value={t} text={LIVESTOCK_LABELS[t]} />
            ))}
          </Select>
          <NumberInput
            id={`livestock-count-${i}`}
            label="頭数"
            min={0}
            value={row.count}
            onChange={(e, { value }) => handleCountChange(i, value)}
            style={{ flex: 1 }}
          />
          <IconButton
            label="削除"
            kind="ghost"
            size="md"
            onClick={() => handleRemove(i)}
            disabled={rows.length === 1}
          >
            <TrashCan />
          </IconButton>
        </div>
      ))}
      <Button
        kind="secondary"
        size="sm"
        renderIcon={Add}
        onClick={handleAdd}
        style={{ marginTop: '0.5rem' }}
      >
        行を追加
      </Button>
    </div>
  )
}

function FertilizerForm({ value, onChange }) {
  return (
    <div style={{ marginTop: '1.5rem' }}>
      <NumberInput
        id="fertilizer-nitrogen"
        label="窒素肥料施用量 (kg N / 年)"
        helperText="合成窒素肥料に含まれる窒素の量"
        min={0}
        value={value}
        onChange={(e, { value: v }) => onChange(v)}
      />
    </div>
  )
}

export default function InputPanel({ onSubmit }) {
  const [livestock, setLivestock] = useState([{ type: 'cattle', count: 0 }])
  const [nitrogen, setNitrogen] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(livestock, nitrogen)
  }

  return (
    <form onSubmit={handleSubmit}>
      <LivestockForm rows={livestock} onChange={setLivestock} />
      <FertilizerForm value={nitrogen} onChange={setNitrogen} />
      <Button
        type="submit"
        kind="primary"
        style={{ marginTop: '2rem', width: '100%' }}
      >
        計算する
      </Button>
    </form>
  )
}
