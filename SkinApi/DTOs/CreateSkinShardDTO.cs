using System.ComponentModel.DataAnnotations;
using SkinApi.Enums;

namespace SkinApi.DTOs;

public record CreateSkinShardDTO
{
    [Required]
    public string Name { get; set; }
    [Required]
    public int? ChampionId { get; set; }
    [Required]
    public RarityEnum? Rarity { get; set; }
    public bool Legacy { get; set; }
    [Required]
    public int? DisenchantPrice { get; set; }
    [Required]
    public int? Price { get; set; }
}