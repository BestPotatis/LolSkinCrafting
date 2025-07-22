using System.ComponentModel.DataAnnotations;

namespace SkinApi.DTOs;

public record DeleteMultipleSkinShardsDTO
{
    [Required]
    public List<int> Ids { get; set; } = [];
}