namespace SkinApi.Models;

public class Champion
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public List<Skin> Skins { get; set; } = [];
}