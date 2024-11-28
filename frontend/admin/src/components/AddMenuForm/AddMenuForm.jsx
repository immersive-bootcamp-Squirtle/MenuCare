import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Collapse,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import AllergyListCardForRegister from "../AllergyListCardForRegister/AllergyListCardForRegister";
import axios from "axios";
import UploadImage from "../UploadImage/UploadImage";
import CategoryButton from "../CategoryButton/CategoryButton";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const AddMenuForm = () => {
  const navigate = useNavigate();
  // const { restaurant_id } = useParams();
  const [menuName, setMenuName] = useState("");
  const [price, setPrice] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [image, setImage] = useState(null);

  const handleToggleAllergy = (allergyId) => {
    setSelectedAllergies(
      (prev) =>
        prev.includes(allergyId)
          ? prev.filter((id) => id !== allergyId) // 選択を解除
          : [...prev, allergyId] // 選択を追加
    );
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId); // カテゴリを選択
  };

  //アップロードされたファイルをプレビューする
  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setImage(URL.createObjectURL(file)); // ファイルのプレビュー用URLを発行
  //   }
  // };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // ファイルを保持
    }
  };


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const testCategories = [
          { category_id: 1, category_name: "フード" },
          { category_id: 2, category_name: "ドリンク" },
        ];
        setCategories(testCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("restaurant_id", 1); // 仮のID
    formData.append("menu_name", menuName);
    formData.append("price", parseInt(price));
    formData.append("status", "active");
    formData.append("category_id", selectedCategory);
    formData.append("image", image); // ファイルを追加
    // formData.append("allergies", JSON.stringify(selectedAllergies));
    selectedAllergies.forEach((allergy) => {
      formData.append("allergies[]", allergy); // 配列を個別に追加
    });
    
    try {
      // const reqBody = {
      //   restaurant_id: 1,
      //   menu_name: menuName,
      //   price: parseInt(price),
      //   image_url: "/public/egg.png", // テスト用固定値
      //   status: "active",
      //   allergies: selectedAllergies,
      // };

      // S3への画像アップロード
      //// アップロード用の署名付きURL&Pathを取得
      const {preSignedUrlForS3Upload, path} = {
        preSignedUrlForS3Upload: "ttps://menucare-menu-images.s3.us-east-1.amazonaws.com/images/test01?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIATHVQK6LVNCWPS6PR%2F20241128%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241128T122312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDm%2BJbg8niEuc1WFkzhkPrxXRfGMgNEs7w5WWUwvvIN4AIhAIKEgbYCCtpjNLkaIV25BKEIaq0hBJcRGQwzrTNRL064KroFCF0QABoMMjIyNjM0MzczODY2Igz0IjXUlvSmOOTXR0UqlwXrgVuPwOZa956j4tpi2e1RpqlLcEdZGL3ZIcTNRvwob5y1iaXtztZysLmdN2aKKix71WckRmp9EQAUe5zvz7xAT3TH1pJQiYBin4BVxr78%2B7Ows%2F9DFc4VAj7RzVV8fI6O%2BnWc1906UwNmaKDHWY2KYfoA0TT82CnrCoy%2FgdRtWzcE6R2K33wHXTvV%2BMhJMyzcmG9ulchl5RhD6bVFifsiw8XEMyoOX5TI0OlY3oojoCZi1CIinmRgevlw1Na%2FAJ2JsKqYYN6I6OyhzynbK33ztXFezr7X8Pw4QT%2Bq4W%2FeNB5EQ7Jkq7KOjI0SVH4407w6lDkvMQYtRP7%2BXwAZ%2Bz37Njc7%2B57cNIBJehfCLq7LXzVP%2FpZE7ZBV%2BekXfWRZmPKmvRLRU5scaV4xl%2FV87VdamKRybcozgVVzZ9c3YigF667G6dt%2F81u9V5n%2FAzFqL3ImV7hoaGD3JvXqZt28apC%2BT9k37f9%2F2zwgh2u59vcgF8s1DRNo%2FdOgx0dQP%2BeaGmHV6uq1RQz0f%2FWwNM7egkPhoxCF5CPDUUCifn3jvtUzxBQpSXgI0CpHD3Ez5tlqaOYoUOC8zjU5FNTIqk4ILQwzJv8BBJLsxnHDwt76HpalhxLtfKVvZxYpjxH7Yyq9vvJP5hGhfvInq%2Bb%2Bgh3lnlIDDobpXYGOhexEqirhlIj3u%2B%2F85QTqqwJR06%2BLsP51nTOteGuKcDi5ZwtlyN75maH2KsEoliUsCNpbUahYqTqEjOw7hazRHt7ezn3sEmUJzoOptgZD9QKdiT5N8NdEWtTtdA791dvBZAAChEfY5BNxkzEYyZR9RgPL4jwVz6Aw8fbIS3FHJAXc3d3kdXDHPZBci%2FcWaqsvPwxy%2FQO%2F3nhSwZfyDXYUt3IwkLmhugY6sAHl6VXOVImoF62VfVj4zHZwfyG6LSxn3GqIQNb3aGw047gr9LPyq5pyJHUJBh3nYQx92TPp4CffkgDZnXP7oqv96QRzuxv9pNLAag%2FwdKqcWeWWgJ%2Fa9KcQzTIn46ZPFqWkvkp3PxxXMts7EX2QFO7tc8XohTmzAqKNJHnIwJBP4XWSOJg5NEWj6vfQHsF06A50t1zONtX1AMKs963S5YSdfrSU%2FCDkIqQdTo2f8r8EWg%3D%3D&X-Amz-Signature=5b105d06ddae666d63d4ee6275e62bdc17c7cdd7954bc753976756d032b39be4&X-Amz-SignedHeaders=host&x-id=PutObject",
        path: "image/test01"
      };
      //// アップロード
      const result = await axios.put(preSignedUrlForS3Upload, image, {
        headers: {
            'Content-Type': image.type
        }
      })

      console.log(result)

      // local実行時はこちら
      // const res = await axios.post(`${baseUrl}/restaurants/1/menus`, reqBody);
      // const res = await axios.post(`${baseUrl}/restaurants/1/menus`, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      
      // lambda実行時はこちら
      const res = await axios.post(`https://api.menu-care.com/api/restaurants/1/menus`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: sessionStorage.getItem("idToken"),
        }
      });

      console.log("Response:", res.data);
      alert("メニューが登録されました");
      navigate("/admin/home");
    } catch (err) {
      if (!err.response) {
        navigate("/login")
      }
      console.error("Error submitting menu:", err);
      alert("エラーが発生しました。");
    }
  };

  // console.log("selectedAllergies:", selectedAllergies);
  useEffect(() => {
    const fetchAllergies = async () => {
      try {
        // local上での実行の際はこちら
        // const res = await axios.get(`${baseUrl}/allergies`);
        // console.log("alg:", res.data);
        // setAllergies(res.data);

        // lambda上での実行の際はこちら
        const res = await axios.get(`https://api.menu-care.com/api/allergies`, {
          headers: {
            Authorization: sessionStorage.getItem("idToken"),
          }
        });
        setAllergies(res.data);

        // backendを繋げていない環境ではこちら
        // const testAllergies = [
        //   { allergy_id: 1, allergy_name: "卵" },
        //   { allergy_id: 2, allergy_name: "小麦" },
        //   { allergy_id: 3, allergy_name: "乳（牛乳）" },
        //   { allergy_id: 4, allergy_name: "えび" },
        //   { allergy_id: 5, allergy_name: "かに" },
        //   { allergy_id: 6, allergy_name: "くるみ" },
        //   { allergy_id: 7, allergy_name: "そば" },
        //   { allergy_id: 8, allergy_name: "落花生（ピーナッツ）" },
        //   { allergy_id: 9, allergy_name: "アーモンド" },
        //   { allergy_id: 10, allergy_name: "あわび" },
        //   { allergy_id: 11, allergy_name: "いか" },
        //   { allergy_id: 12, allergy_name: "いくら" },
        //   { allergy_id: 13, allergy_name: "オレンジ" },
        //   { allergy_id: 14, allergy_name: "カシューナッツ" },
        //   { allergy_id: 15, allergy_name: "キウイ" },
        //   { allergy_id: 16, allergy_name: "牛肉" },
        //   { allergy_id: 17, allergy_name: "ごま" },
        //   { allergy_id: 18, allergy_name: "さけ" },
        //   { allergy_id: 19, allergy_name: "さば" },
        //   { allergy_id: 20, allergy_name: "大豆" },
        //   { allergy_id: 21, allergy_name: "鶏肉" },
        //   { allergy_id: 22, allergy_name: "バナナ" },
        //   { allergy_id: 23, allergy_name: "豚肉" },
        //   { allergy_id: 24, allergy_name: "マカダミアナッツ" },
        //   { allergy_id: 25, allergy_name: "もも" },
        //   { allergy_id: 26, allergy_name: "やまいも" },
        //   { allergy_id: 27, allergy_name: "りんご" },
        //   { allergy_id: 28, allergy_name: "ゼラチン" },
        // ];
        // setAllergies(testAllergies);
      } catch (err) {
        if (!err.response) {
          navigate("/login")
        }
        console.error("Error fetching allergies:", err);
      }
    };
    fetchAllergies();
  }, []);

  return (
    <>
      <Box>
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "905px",
            height: "541px",
            margin: "0 auto",
            padding: 2,
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // 影
            overflow: "hidden",
            backgroundColor: "#F2EDE5",
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 2,
            }}
          >
            {/* 画像 */}
            <UploadImage image={image} handleImageUpload={handleImageUpload} />
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6">商品名</Typography>
              <TextField
                fullWidth
                placeholder="生ハムのサラダ"
                variant="outlined"
                onChange={(e) => setMenuName(e.target.value)}
                sx={{
                  marginBottom: 1,
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none", // 枠線削除
                    },
                  },
                }}
              />
              <Typography variant="h6">価格</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="h6">¥</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="500"
                  onChange={(e) => setPrice(e.target.value)}
                  sx={{
                    marginBottom: 0,
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none", // 枠線削除
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingLeft: 2,
            }}
          >
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                カテゴリ
              </Typography>
              <CategoryButton
                categories={categories}
                handleCategorySelect={handleCategorySelect}
                selectedCategory={selectedCategory}
              />
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                アレルギー情報
              </Typography>
              <AllergyListCardForRegister
                allergies={allergies}
                selectedAllergies={selectedAllergies}
                onClick={handleToggleAllergy}
              />
            </Box>
          </Box>
        </Card>
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              borderRadius: "16px",
              backgroundColor: "#F2A24A",
            }}
          >
            メニューを登録
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddMenuForm;
