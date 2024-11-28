/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('allergy').del()
  await knex('allergy').insert([
    {
      allergy_name: '卵' 
    },
    {
      allergy_name: '小麦' 
    },
    {
      allergy_name: '乳（牛乳）' 
    },
    {
      allergy_name: 'えび' 
    },
    {
      allergy_name: 'かに' 
    },
    {
      allergy_name: 'くるみ' 
    },
    {
      allergy_name: 'そば' 
    },
    {
      allergy_name: '落花生（ピーナッツ）' 
    },
    {
      allergy_name: 'アーモンド' 
    },
    {
      allergy_name: 'あわび' 
    },
    {
      allergy_name: 'いか' 
    },
    {
      allergy_name: 'いくら' 
    },
    {
      allergy_name: 'オレンジ' 
    },
    {
      allergy_name: 'カシューナッツ' 
    },
    {
      allergy_name: 'キウイ' 
    },
    {
      allergy_name: '牛肉' 
    },
    {
      allergy_name: 'ごま' 
    },
    {
      allergy_name: 'さけ' 
    },
    {
      allergy_name: 'さば' 
    },
    {
      allergy_name: '大豆' 
    },
    {
      allergy_name: '鶏肉' 
    },
    {
      allergy_name: 'バナナ' 
    },
    {
      allergy_name: '豚肉' 
    },
    {
      allergy_name: 'マカダミアナッツ' 
    },
    {
      allergy_name: 'もも' 
    },
    {
      allergy_name: 'やまいも' 
    },
    {
      allergy_name: 'りんご' 
    },
    {
      allergy_name: 'ゼラチン' 
    },
  ]);
};
