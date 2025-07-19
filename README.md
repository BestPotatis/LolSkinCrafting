# League of Legends skin tracker

Since hextech chest were introduced in League of Legends it has been possible to get skins for free. My goal has been to get a skin for each champion in the game by using the skin shards. However tracking which champions you already have skins for has been a hassle to check. Therefore I made this project for myself to track which champions have skins which help when rerolling skin shards.

# Architecture

The project is split into front-end (React) and SkinApi (ASP.NET Core).

## Front-end

The front-end uses TailwindCSS and Shadcn for components and styling.

## Back-end

The back-end uses Entity Framework Core for handling data and MVC meaning data are represented by models and routes and their methods are presented through controllers.
Uses SQLite for the database.

# Running

On windows

- Run BuildLocalProd.bat
- Run RunLocalProd.bat
- Go to localhost:XXXX found in the console where RunLocalProd.bat is running
