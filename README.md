# 🌱 農業CO₂排出量推定ツール

農業・土地利用を対象とした温室効果ガス（CO₂換算）の排出量を推定するWebアプリです。  
IBM [Carbon Design System](https://github.com/carbon-design-system/carbon) を使用したUIで、シンプルな入力操作で排出量を可視化できます。

---

## コンセプト

農業分野は全世界の温室効果ガス排出量の約10〜12%を占めており、家畜の腸内発酵・糞尿管理や窒素肥料からの亜酸化窒素（N₂O）が主要な排出源です。  
このツールは、農家・研究者・政策立案者が**手軽に排出量の目安を把握**できることを目的としています。

---

## 対応排出源

| 排出源 | 説明 | 排出ガス |
|---|---|---|
| 🐄 家畜（腸内発酵） | 牛・豚・鶏の頭数から推定 | CH₄ |
| 🐾 家畜（糞尿管理） | 糞尿管理からのCH₄・N₂O | CH₄, N₂O |
| 🌿 合成窒素肥料 | 窒素施用量からN₂Oを推定 | N₂O |

### 排出係数の出典

- **IPCC 2006 Guidelines for National Greenhouse Gas Inventories, Volume 4: Agriculture, Forestry and Other Land Use**
  - 家畜腸内発酵: Table 10.10
  - 糞尿管理 CH₄: Table 10.14
  - 糞尿管理 N₂O: Table 10.21
  - 肥料 N₂O: Table 11.1 (EF1 = 1%)
- **GWP100 (IPCC AR4)**: CH₄ = 25, N₂O = 298

---

## 動作環境

- Node.js 18 以上
- npm 9 以上

---

## インストール手順

```bash
# リポジトリのクローン
git clone https://github.com/carbon-design-system/carbon.git  # 参考
cd co2-estimator

# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで `http://localhost:5173` を開いてください。

---

## 使い方

1. **家畜の種別と頭数を入力**  
   牛・豚・鶏から種別を選択し、頭数を入力します。  
   「行を追加」ボタンで複数種類の家畜を同時に入力できます。

2. **窒素肥料の施用量を入力**  
   年間の合成窒素肥料に含まれる窒素量（kg N/年）を入力します。

3. **「計算する」をクリック**  
   排出源別のCO₂換算値（kg CO₂e/年）が数値と棒グラフで表示されます。

---

## 技術スタック

| カテゴリ | 使用技術 |
|---|---|
| フロントエンド | React + Vite |
| UIコンポーネント | IBM Carbon Design System (`@carbon/react`) |
| グラフ | Carbon Charts React (`@carbon/charts-react`) |
| 排出係数 | IPCC 2006 GL Vol.4 |

---

## 今後の拡張予定

- [ ] 作物生産（水田メタン・残渣焼却）の追加
- [ ] 農薬・堆肥由来の排出源追加
- [ ] CSVエクスポート機能
- [ ] 複数年データの比較グラフ
- [ ] 多言語対応（英語）
