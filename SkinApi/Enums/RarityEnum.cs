using System.Text.Json.Serialization;

namespace SkinApi.Enums;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum RarityEnum
{
    Ultimate,
    Mythic,
    Legendary,
    Epic,
    None,
}