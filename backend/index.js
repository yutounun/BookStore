import express from "express";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: "https://644e6d64ba939e50b8a960b6--relaxed-horse-0f6752.netlify.app/", // 許可したいオリジンを指定
  credentials: true, // レスポンスヘッダーにAccess-Control-Allow-Credentialsを追加。ユーザー認証等を行う場合は、これがないとブラウザがレスポンスを捨ててしまうそう。
  optionsSuccessStatus: 200, // レスポンスのHTTPステータスコードを「200(成功)」に設定
};

app.cors(corsOptions);
