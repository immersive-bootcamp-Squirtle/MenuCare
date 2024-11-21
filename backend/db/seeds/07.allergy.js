/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('allergy').del()
  await knex('allergy').insert([
    {
      allergy_id: 1, 
      allergy_name: '卵' 
    },
    {
      allergy_id: 2, 
      allergy_name: '小麦' 
    },
    {
      allergy_id: 3, 
      allergy_name: '乳（牛乳）' 
    },
    {
      allergy_id: 4, 
      allergy_name: 'えび' 
    },
    {
      allergy_id: 5, 
      allergy_name: 'かに' 
    },
    {
      allergy_id: 6, 
      allergy_name: 'くるみ' 
    },
    {
      allergy_id: 7, 
      allergy_name: 'そば' 
    },
    {
      allergy_id: 8, 
      allergy_name: '落花生（ピーナッツ）' 
    },
    {
      allergy_id: 9, 
      allergy_name: 'アーモンド' 
    },
    {
      allergy_id: 10, 
      allergy_name: 'あわび' 
    },
    {
      allergy_id: 11, 
      allergy_name: 'いか' 
    },
    {
      allergy_id: 12, 
      allergy_name: 'いくら' 
    },
    {
      allergy_id: 13, 
      allergy_name: 'オレンジ' 
    },
    {
      allergy_id: 14, 
      allergy_name: 'カシューナッツ' 
    },
    {
      allergy_id: 15, 
      allergy_name: 'キウイ' 
    },
    {
      allergy_id: 16, 
      allergy_name: '牛肉' 
    },
    {
      allergy_id: 17, 
      allergy_name: 'ごま' 
    },
    {
      allergy_id: 18, 
      allergy_name: 'さけ' 
    },
    {
      allergy_id: 19, 
      allergy_name: 'さば' 
    },
    {
      allergy_id: 20, 
      allergy_name: '大豆' 
    },
    {
      allergy_id: 21, 
      allergy_name: '鶏肉' 
    },
    {
      allergy_id: 22, 
      allergy_name: 'バナナ' 
    },
    {
      allergy_id: 23, 
      allergy_name: '豚肉' 
    },
    {
      allergy_id: 24, 
      allergy_name: 'マカダミアナッツ' 
    },
    {
      allergy_id: 25, 
      allergy_name: 'もも' 
    },
    {
      allergy_id: 26, 
      allergy_name: 'やまいも' 
    },
    {
      allergy_id: 27, 
      allergy_name: 'りんご' 
    },
    {
      allergy_id: 28, 
      allergy_name: 'ゼラチン' 
    },
  ]);
};
