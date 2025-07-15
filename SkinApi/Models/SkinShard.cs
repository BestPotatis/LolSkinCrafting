using System.Text.Json.Serialization;
using SkinApi.Enums;

namespace SkinApi.Models;

public class SkinShard
{
    public int Id { get; set; }
    public string Name { get; set; }
    public RarityEnum Rarity { get; set; }
    public bool Legacy { get; set; }
    public int DisenchantPrice { get; set; }
    public int Price { get; set; }
    public int ChampionId { get; set; }
    [JsonIgnore]
    public Champion Champion { get; set; }
}