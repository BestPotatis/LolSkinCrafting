using SkinApi.Models;

namespace SkinApi.DTOs;

public record struct ChampionWithSkinDTO(int Id, string Name, int NumberOfSkins, Skin? BestSkin);