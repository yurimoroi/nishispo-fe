import { getAdminArticleStatus } from "@/components/admin/articles";
import { id } from "date-fns/locale";

export const genderValues = [
  {
    id: 0,
    label: "未回答", // Unanswered
  },
  {
    id: 1,
    label: "女性", // Female
  },
  {
    id: 2,
    label: "男性", // Male
  },
];
export const genderValuesLabelMap = ["未回答", "女性", "男性"]; // used for checkboxes etc

export const prefectureValues = [
  { id: "1", label: "北海道", labelAlt: "Hokkaido" },
  { id: "2", label: "青森県", labelAlt: "Aomori Prefecture" },
  { id: "3", label: "岩手県", labelAlt: "Iwate Prefecture" },
  { id: "4", label: "宮城県", labelAlt: "Miyagi Prefecture" },
  { id: "5", label: "秋田県", labelAlt: "Akita Prefecture" },
  { id: "6", label: "山形県", labelAlt: "Yamagata Prefecture" },
  { id: "7", label: "福島県", labelAlt: "Fukushima Prefecture" },
  { id: "8", label: "茨城県", labelAlt: "Ibaraki Prefecture" },
  { id: "9", label: "栃木県", labelAlt: "Tochigi Prefecture" },
  { id: "10", label: "群馬県", labelAlt: "Gunma Prefecture" },
  { id: "11", label: "埼玉県", labelAlt: "Saitama Prefecture" },
  { id: "12", label: "千葉県", labelAlt: "Chiba Prefecture" },
  { id: "13", label: "東京都", labelAlt: "Tokyo" },
  { id: "14", label: "神奈川県", labelAlt: "Kanagawa Prefecture" },
  { id: "15", label: "新潟県", labelAlt: "Niigata Prefecture" },
  { id: "16", label: "富山県", labelAlt: "Toyama Prefecture" },
  { id: "17", label: "石川県", labelAlt: "Ishikawa Prefecture" },
  { id: "18", label: "福井県", labelAlt: "Fukui Prefecture" },
  { id: "19", label: "山梨県", labelAlt: "Yamanashi Prefecture" },
  { id: "20", label: "長野県", labelAlt: "Nagano Prefecture" },
  { id: "21", label: "岐阜県", labelAlt: "Gifu Prefecture" },
  { id: "22", label: "静岡県", labelAlt: "Shizuoka Prefecture" },
  { id: "23", label: "愛知県", labelAlt: "Aichi Prefecture" },
  { id: "24", label: "三重県", labelAlt: "Mie Prefecture" },
  { id: "25", label: "滋賀県", labelAlt: "Shiga Prefecture" },
  { id: "26", label: "京都府", labelAlt: "Kyoto Prefecture" },
  { id: "27", label: "大阪府", labelAlt: "Osaka Prefecture" },
  { id: "28", label: "兵庫県", labelAlt: "Hyogo Prefecture" },
  { id: "29", label: "奈良県", labelAlt: "Nara Prefecture" },
  { id: "30", label: "和歌山県", labelAlt: "Wakayama Prefecture" },
  { id: "31", label: "鳥取県", labelAlt: "Tottori Prefecture" },
  { id: "32", label: "島根県", labelAlt: "Shimane Prefecture" },
  { id: "33", label: "岡山県", labelAlt: "Okayama Prefecture" },
  { id: "34", label: "広島県", labelAlt: "Hiroshima Prefecture" },
  { id: "35", label: "山口県", labelAlt: "Yamaguchi Prefecture" },
  { id: "36", label: "徳島県", labelAlt: "Tokushima Prefecture" },
  { id: "37", label: "香川県", labelAlt: "Kagawa Prefecture" },
  { id: "38", label: "愛媛県", labelAlt: "Ehime Prefecture" },
  { id: "39", label: "高知県", labelAlt: "Kochi Prefecture" },
  { id: "40", label: "福岡県", labelAlt: "Fukuoka Prefecture" },
  { id: "41", label: "佐賀県", labelAlt: "Saga Prefecture" },
  { id: "42", label: "長崎県", labelAlt: "Nagasaki Prefecture" },
  { id: "43", label: "熊本県", labelAlt: "Kumamoto Prefecture" },
  { id: "44", label: "大分県", labelAlt: "Oita Prefecture" },
  { id: "45", label: "宮崎県", labelAlt: "Miyazaki Prefecture" },
  { id: "46", label: "鹿児島県", labelAlt: "Kagoshima Prefecture" },
  { id: "47", label: "沖縄県", labelAlt: "Okinawa Prefecture" },
];

export const displayOrderValues = Array.from({ length: 1000 }, (_, index) => ({
  id: index,
  label: String(index),
}));

export const articleRequestTypeValues = [
  {
    id: "1",
    label: "編集依頼 ",
  },
  {
    id: "2",
    label: "削除依頼",
  },
];

export const trainingNumberValues = Array.from({ length: 100 }, (_, index) => ({
  id: index,
  label: String(index),
}));

export const trainingTypeValues = [
  {
    id: 0,
    label: "ブログ",
  },
  {
    id: 1,
    label: "動画",
  },
];

// Values were extracted from here: https://anko.education/webapi/jma
export const weatherPrefectureCodes = [
  // 北海道
  {
    id: "011000",
    label: "宗谷地方",
  },
  {
    id: "012000",
    label: "上川・留萌地方",
  },
  {
    id: "016000",
    label: "石狩・空知・後志地方",
  },
  {
    id: "013000",
    label: "網走・北見・紋別地方",
  },
  {
    id: "014100",
    label: "釧路・根室地方",
  },
  {
    id: "015000",
    label: "胆振・日高地方",
  },
  {
    id: "017000",
    label: "渡島・檜山地方",
  },
  // 東北
  {
    id: "020000",
    label: "青森県",
  },
  {
    id: "050000",
    label: "秋田県",
  },
  {
    id: "030000",
    label: "岩手県",
  },
  {
    id: "040000",
    label: "宮城県",
  },
  {
    id: "060000",
    label: "山形県",
  },
  {
    id: "070000",
    label: "福島県",
  },
  // 関東甲信
  {
    id: "080000",
    label: "茨城県",
  },
  {
    id: "090000",
    label: "栃木県",
  },
  {
    id: "100000",
    label: "群馬県",
  },
  {
    id: "110000",
    label: "埼玉県",
  },
  {
    id: "130000",
    label: "東京都",
  },
  {
    id: "120000",
    label: "千葉県",
  },
  {
    id: "140000",
    label: "神奈川県",
  },
  {
    id: "200000",
    label: "長野県",
  },
  {
    id: "190000",
    label: "山梨県",
  },
  // 東海
  {
    id: "220000",
    label: "静岡県",
  },
  {
    id: "230000",
    label: "愛知県",
  },
  {
    id: "210000",
    label: "岐阜県",
  },
  {
    id: "240000",
    label: "三重県",
  },
  // 北陸
  {
    id: "150000",
    label: "新潟県",
  },
  {
    id: "160000",
    label: "富山県",
  },
  {
    id: "170000",
    label: "石川県",
  },
  {
    id: "180000",
    label: "福井県",
  },
  // 近畿
  {
    id: "250000",
    label: "滋賀県",
  },
  {
    id: "260000",
    label: "京都府",
  },
  {
    id: "270000",
    label: "大阪府",
  },
  {
    id: "280000",
    label: "兵庫県",
  },
  {
    id: "290000",
    label: "奈良県",
  },
  {
    id: "300000",
    label: "和歌山県",
  },
  // 中国
  {
    id: "330000",
    label: "岡山県",
  },
  {
    id: "340000",
    label: "広島県",
  },
  {
    id: "320000",
    label: "島根県",
  },
  {
    id: "310000",
    label: "鳥取県",
  },
  // 四国
  {
    id: "360000",
    label: "徳島県",
  },
  {
    id: "370000",
    label: "香川県",
  },
  {
    id: "380000",
    label: "愛媛県",
  },
  {
    id: "390000",
    label: "高知県",
  },
  // 九州
  {
    id: "350000",
    label: "山口県",
  },
  {
    id: "400000",
    label: "福岡県",
  },
  {
    id: "440000",
    label: "大分県",
  },
  {
    id: "420000",
    label: "長崎県",
  },
  {
    id: "410000",
    label: "佐賀県",
  },
  {
    id: "430000",
    label: "熊本県",
  },
  {
    id: "450000",
    label: "宮崎県",
  },
  {
    id: "460100",
    label: "鹿児島県",
  },
  // 沖縄
  {
    id: "471000",
    label: "沖縄本島地方",
  },
  {
    id: "472000",
    label: "大東島地方",
  },
  {
    id: "473000",
    label: "宮古島地方",
  },
  {
    id: "474000",
    label: "八重山地方",
  },
];

export const adminUsersApprovalStatusValues = [
  {
    id: "notApplied ",
    label: "適用されていない",
  },
  {
    id: "trainingInProgress ",
    label: "トレーニング中",
  },
  {
    id: "trainingCompleted ",
    label: "研修終了",
  },
  {
    id: "approved",
    label: "承認された",
  },
];
