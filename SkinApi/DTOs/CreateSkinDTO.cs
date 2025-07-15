using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using SkinApi.Enums;

namespace SkinApi.DTOs;

public record CreateSkinDTO
{
    [Required]
    public string Name { get; set; }
    public bool Legacy { get; set; }
    [Required]
    public RarityEnum? Rarity { get; set; }

    [Required, Range(1, 200)]
    public int? ChampionId { get; set; }
}