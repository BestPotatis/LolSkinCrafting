using SkinApi.Enums;

namespace SkinApi.DTOs;

public record SkinShardDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Champion { get; set; }
    public RarityEnum Rarity { get; set; }
    public bool Legacy { get; set; }
    public int DisenchantPrice { get; set; }
    public int Price { get; set; }
    public bool HasSkin { get; set; }
    public RarityEnum? BestSkinRarity { get; set; }
}