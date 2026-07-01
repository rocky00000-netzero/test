/**
 * 排出係数定義
 * 出典: IPCC 2006 Guidelines for National Greenhouse Gas Inventories, Vol.4 Agriculture
 *
 * GWP100 (IPCC AR4):
 *   CH₄ = 25
 *   N₂O = 298
 */

// ─────────────────────────────────────────────
// 家畜の腸内発酵による CH₄ 排出係数
// 単位: kg CH₄ / 頭 / 年
// 出典: Table 10.10 (デフォルト値, アジア地域)
// ─────────────────────────────────────────────
export const LIVESTOCK_CH4_FACTORS = {
  cattle: 47,   // 乳牛・肉牛（平均）
  pig: 1.5,     // 豚
  chicken: 0,   // 鶏（腸内発酵ほぼゼロ）
}

// 家畜の糞尿管理による CH₄ 排出係数
// 単位: kg CH₄ / 頭 / 年
// 出典: Table 10.14
export const LIVESTOCK_MANURE_CH4_FACTORS = {
  cattle: 1.0,
  pig: 3.0,
  chicken: 0.02,
}

// 家畜の糞尿管理による N₂O 排出係数
// 単位: kg N₂O / 頭 / 年
// 出典: Table 10.21
export const LIVESTOCK_MANURE_N2O_FACTORS = {
  cattle: 0.97,
  pig: 0.53,
  chicken: 0.02,
}

// ─────────────────────────────────────────────
// 肥料（合成窒素肥料）からの N₂O 排出係数
// 単位: kg N₂O-N / kg N 施用量
// 出典: Table 11.1 (EF1 = 0.01, i.e. 1%)
// ─────────────────────────────────────────────
export const FERTILIZER_N2O_FACTOR = 0.01 // kg N₂O-N / kg N

// N₂O-N → N₂O への換算係数 (44/28)
export const N2O_N_TO_N2O = 44 / 28

// ─────────────────────────────────────────────
// GWP100 (IPCC AR4)
// ─────────────────────────────────────────────
export const GWP_CH4 = 25
export const GWP_N2O = 298

// 家畜の種別ラベル（UI用）
export const LIVESTOCK_LABELS = {
  cattle: '牛',
  pig: '豚',
  chicken: '鶏',
}
