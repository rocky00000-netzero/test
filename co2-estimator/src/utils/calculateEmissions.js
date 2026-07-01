/**
 * CO₂排出量計算ユーティリティ
 *
 * 全ての排出量は kg CO₂e / 年 で返す
 */

import {
  LIVESTOCK_CH4_FACTORS,
  LIVESTOCK_MANURE_CH4_FACTORS,
  LIVESTOCK_MANURE_N2O_FACTORS,
  FERTILIZER_N2O_FACTOR,
  N2O_N_TO_N2O,
  GWP_CH4,
  GWP_N2O,
} from '../data/emissionFactors'

/**
 * 家畜からの CO₂e 排出量を計算する
 * @param {Array<{type: string, count: number}>} livestock - 家畜リスト
 * @returns {number} kg CO₂e / 年
 */
export function calcLivestockEmissions(livestock) {
  return livestock.reduce((total, { type, count }) => {
    const n = Number(count) || 0
    const ch4Enteric = (LIVESTOCK_CH4_FACTORS[type] ?? 0) * n * GWP_CH4
    const ch4Manure = (LIVESTOCK_MANURE_CH4_FACTORS[type] ?? 0) * n * GWP_CH4
    const n2oManure =
      (LIVESTOCK_MANURE_N2O_FACTORS[type] ?? 0) * n * GWP_N2O
    return total + ch4Enteric + ch4Manure + n2oManure
  }, 0)
}

/**
 * 肥料（窒素）からの CO₂e 排出量を計算する
 * @param {number} nitrogenKg - 窒素施用量 (kg N / 年)
 * @returns {number} kg CO₂e / 年
 */
export function calcFertilizerEmissions(nitrogenKg) {
  const n = Number(nitrogenKg) || 0
  // N₂O-N → N₂O → CO₂e
  const n2o = n * FERTILIZER_N2O_FACTOR * N2O_N_TO_N2O
  return n2o * GWP_N2O
}

/**
 * 合計排出量を計算する
 * @param {Array<{type: string, count: number}>} livestock
 * @param {number} nitrogenKg
 * @returns {{ livestock: number, fertilizer: number, total: number }}
 */
export function calcTotal(livestock, nitrogenKg) {
  const livestockVal = calcLivestockEmissions(livestock)
  const fertilizerVal = calcFertilizerEmissions(nitrogenKg)
  return {
    livestock: Math.round(livestockVal * 10) / 10,
    fertilizer: Math.round(fertilizerVal * 10) / 10,
    total: Math.round((livestockVal + fertilizerVal) * 10) / 10,
  }
}
