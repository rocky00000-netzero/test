# CO₂排出量推定アプリ 実装プラン

## Top-Level Overview

農業・土地利用を対象にしたCO₂排出量推定Webアプリを構築する。
初期スコープは**家畜（種別×頭数）** と **肥料（窒素量）** の2排出源とし、
後から作物生産などを追加できる拡張可能な設計にする。

フロントエンドは **React + IBM Carbon Design System (`@carbon/react`)** を採用し、
ユーザーがフォームに活動量を入力すると、IPCC排出係数を用いてCO₂換算値を計算し、
棒グラフ（Carbon Charts）で結果を表示する。

### スコープ外（今回は対象外）
- バックエンドAPI・サーバーサイド処理
- CSVエクスポート
- 認証・ユーザー管理
- 作物生産・農薬などの排出源（将来拡張）

---

## Sub-Task 1: プロジェクトのセットアップ

**Intent**  
React + Carbon Design Systemの開発環境を構築し、アプリが起動する状態にする。

**Expected Outcomes**
- `npm start` でブラウザにCarbonのデフォルトUIが表示される
- `@carbon/react` と `@carbon/charts-react` がインストール済み

**Todo List**
1. `create-react-app` または Vite でReactプロジェクトを生成する（プロジェクト名: `co2-estimator`）
2. `@carbon/react`, `@carbon/charts-react`, `@carbon/styles` をインストールする
3. `src/index.css` または `src/App.css` にCarbonのグローバルCSSをインポートする
4. `App.jsx` にCarbonの `Theme` プロバイダーを設定し、ダミーテキストを表示して起動確認する
5. `.gitignore` に `node_modules/` が含まれていることを確認する

**Relevant Context**
- Carbon React: https://github.com/carbon-design-system/carbon (`packages/react`)
- Carbon Charts React: `@carbon/charts-react`
- CSSインポート例: `import '@carbon/styles/css/styles.css'`

**Status**: [x] done

---

## Sub-Task 2: 排出係数モジュールの作成

**Intent**  
IPCCの排出係数を定数として定義し、計算ロジックをUIから分離する。
後から排出源を追加する際にここだけ変更すればよい設計にする。

**Expected Outcomes**
- `src/data/emissionFactors.js` に家畜・肥料の排出係数が定義されている
- `src/utils/calculateEmissions.js` に活動量×排出係数の計算関数が実装されている
- 計算関数の単体テストが通る（任意：`calculateEmissions.test.js`）

**Todo List**
1. `src/data/emissionFactors.js` を作成し、家畜種別（牛・豚・鶏）の年間CH₄排出係数（kg CH₄/頭/年）とCO₂換算係数（GWP100: CH₄=25）を定義する
2. 肥料の窒素からのN₂O排出係数（kg N₂O-N / kg N 施用量, GWP100: N₂O=298）を定義する
3. `src/utils/calculateEmissions.js` に以下の関数を実装する:
   - `calcLivestockEmissions(livestock: Array<{type, count}>) → kg CO₂e/年`
   - `calcFertilizerEmissions(nitrogenKg: number) → kg CO₂e/年`
   - `calcTotal(livestock, nitrogenKg) → { livestock, fertilizer, total }`
4. 排出係数の出典（IPCC 2006 Guidelines）をコメントで記載する

**Relevant Context**
- IPCC 2006 GL, Vol.4 Agriculture: 家畜腸内発酵 Table 10.10, 肥料N₂O Table 11.1
- GWP100: CH₄=25, N₂O=298 (IPCC AR4)

**Status**: [x] done

---

## Sub-Task 3: 入力フォームコンポーネントの作成

**Intent**  
Carbon UIコンポーネントを使い、家畜頭数と肥料窒素量を入力できるフォームを作る。

**Expected Outcomes**
- 家畜種別ごとに頭数を入力できる（牛・豚・鶏、行の追加・削除も可能）
- 肥料窒素量（kg/年）を入力できる数値フィールドがある
- 「計算する」ボタンを押すとonSubmitコールバックが呼ばれる

**Todo List**
1. `src/components/LivestockForm.jsx` を作成する
   - Carbonの `NumberInput` で各家畜種別の頭数を入力
   - Carbonの `Select` で家畜種別を選択（牛・豚・鶏）
   - 「行を追加」ボタン（Carbon `Button` の secondary）で入力行を増やせる
2. `src/components/FertilizerForm.jsx` を作成する
   - Carbonの `NumberInput` で窒素量（kg/年）を入力
3. `src/components/InputPanel.jsx` を作成し、LivestockFormとFertilizerFormをまとめる
   - 「計算する」Carbon `Button`（primary）を配置
4. 各コンポーネントのprops型をPropTypesまたはJSDocで明示する

**Relevant Context**
- Carbon NumberInput: `import { NumberInput } from '@carbon/react'`
- Carbon Select: `import { Select, SelectItem } from '@carbon/react'`
- Carbon Button: `import { Button } from '@carbon/react'`

**Status**: [x] done

---

## Sub-Task 4: 結果表示コンポーネントの作成

**Intent**  
計算結果をCO₂換算値の数値サマリーと棒グラフで表示する。

**Expected Outcomes**
- 家畜・肥料・合計のCO₂e値（kg/年）がCarbonのTileコンポーネントで表示される
- 排出源別の棒グラフ（Carbon Charts）が表示される
- 入力値が変わると結果がリアルタイムに更新される

**Todo List**
1. `src/components/ResultSummary.jsx` を作成する
   - Carbonの `Tile` コンポーネントで家畜・肥料・合計の数値を表示
   - 単位は `kg CO₂e / 年` と明示
2. `src/components/ResultChart.jsx` を作成する
   - `@carbon/charts-react` の `SimpleBarChart` を使う
   - データ: `[{ group: '家畜', value: X }, { group: '肥料', value: Y }]`
3. `src/components/ResultPanel.jsx` でResultSummaryとResultChartをまとめる
4. 結果がない状態（初期表示）ではResultPanelを非表示にする

**Relevant Context**
- Carbon Charts React: `import { SimpleBarChart } from '@carbon/charts-react'`
- Carbon Tile: `import { Tile } from '@carbon/react'`

**Status**: [x] done

---

## Sub-Task 5: App.jsxへの統合とREADME更新

**Intent**  
InputPanelとResultPanelを`App.jsx`に組み込み、状態管理で全体を繋ぐ。
またREADME.mdをコンセプトから使い方まで完成させる。

**Expected Outcomes**
- フォーム入力→「計算する」→結果表示の一連フローが動作する
- `npm start` で完全に動作するアプリが確認できる
- `README.md` にコンセプト・スクリーンショット枠・インストール手順・使い方が記載されている

**Todo List**
1. `App.jsx` に `useState` で `results` 状態を持ち、InputPanelのonSubmitで計算して結果をセットする
2. Carbonの `Grid`, `Column` でレイアウトを整える（左: 入力パネル、右: 結果パネル）
3. Carbonの `Header` でアプリタイトル「🌱 農業CO₂排出量推定ツール」を表示する
4. `README.md` を以下の構成で更新する:
   - コンセプト（なぜこのツールを作ったか）
   - 対応排出源一覧（家畜・肥料）と使用する排出係数の出典
   - インストール手順（`npm install`, `npm start`）
   - 使い方（フォーム入力の説明、結果の見方）
   - 今後の拡張予定

**Status**: [x] done
