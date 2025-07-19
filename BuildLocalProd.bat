cd front-end
npm run build
cd ..
rm SkinApi/wwwroot/* -r
xcopy .\front-end\dist\ .\SkinApi\wwwroot\ /E