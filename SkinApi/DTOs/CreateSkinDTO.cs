using System.Text.Json.Serialization;
using SkinApi.Enums;

namespace SkinApi.DTOs;

public record struct CreateSkinDTO(
    string Name,
    RarityEnum Rarity,
     int ChampionId);