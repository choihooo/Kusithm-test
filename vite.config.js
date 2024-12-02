import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 개발 서버 포트 설정
    historyApiFallback: true, // 모든 경로를 index.html로 리디렉션
    host: true,
  },
});
