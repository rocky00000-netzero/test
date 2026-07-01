import { useState } from 'react'
import {
  Theme,
  Grid,
  Column,
  Header,
  HeaderName,
  Content,
} from '@carbon/react'
import InputPanel from './components/InputPanel'
import ResultPanel from './components/ResultPanel'
import { calcTotal } from './utils/calculateEmissions'
import './App.css'

export default function App() {
  const [results, setResults] = useState(null)

  const handleSubmit = (livestock, nitrogen) => {
    const result = calcTotal(livestock, nitrogen)
    setResults(result)
  }

  return (
    <Theme theme="white">
      <Header aria-label="農業CO₂排出量推定ツール">
        <HeaderName href="/" prefix="">
          🌱 農業CO₂排出量推定ツール
        </HeaderName>
      </Header>

      <Content style={{ paddingTop: '3rem' }}>
        <Grid>
          <Column sm={4} md={4} lg={6}>
            <h2 style={{ marginBottom: '1.5rem' }}>活動量を入力</h2>
            <InputPanel onSubmit={handleSubmit} />
          </Column>
          <Column sm={4} md={4} lg={10}>
            {results ? (
              <ResultPanel results={results} />
            ) : (
              <div style={{ paddingTop: '4rem', color: '#6f6f6f', textAlign: 'center' }}>
                <p>左のフォームに活動量を入力して</p>
                <p>「計算する」を押してください</p>
              </div>
            )}
          </Column>
        </Grid>
      </Content>
    </Theme>
  )
}
