cd front-end
npm run build
cd ..
rm SkinApi/wwwroot/* -r
cp front-end/dist/* SkinApi/wwwroot/